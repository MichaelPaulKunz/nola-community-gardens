'use client'

// rafce
import React from 'react'
import { useState, useEffect } from 'react';
import DayTile from './DayTile';
import DayHeading from './DayHeading';
import EventsModal from '../Modals/EventsModal';
import { GardenEvent } from '../Events';
import { Day, UnformattedEvent } from '../../../page';
import  { CircleArrowLeft }  from 'lucide-react';
import  { CircleArrowRight }  from 'lucide-react';


const daysOfWeek: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
interface Square {
  id: number;
  weekDay: string;
  dateDay: number;
  isActiveDay: boolean;
  fullDate: string;
  dayEvents: GardenEvent[];
}

let globalEvents: UnformattedEvent[];
interface Props {
  fetchEvents: (from: number, until: number, offset: number) => Promise<UnformattedEvent[]>;
  formatEvents: (events: UnformattedEvent[], days: Day[]) => GardenEvent[];
  buildDays: (from: number, until: number) => Day[]; 
}

const today = new Date();
const offset = today.getTimezoneOffset();
// get year, month, from until
const year: number = today.getFullYear();
const month: number = today.getMonth();
const firstDayMonth = new Date(year, month, 1);
const firstDayNextMonth = new Date(year, month + 1, 1)
const from = firstDayMonth.getTime();
const until = firstDayNextMonth.getTime() - 1;

const Calendar = (props: Props) => {
  interface MyState {
    squares: Square[];
    monthDate: Date;
    events: GardenEvent[];
    isModalOpen: boolean;
    dayEvents: GardenEvent[];
    fade: string;
    selectedDate: string;
    eventsLoaded: boolean;
  }

  const [state, setState] = useState<MyState>({
    squares: [],
    monthDate: today,
    events: [],
    isModalOpen: false,
    dayEvents: [],
    fade: 'fade-in',
    selectedDate: '',
    eventsLoaded: false
  });

  useEffect(() => {
    const days = buildCalendar(today);
    console.log('calendar days: ', days);
    setState(prevState => ({ ...prevState, squares: days, monthDate: today, fade: 'fade-in' }));
    const { fetchEvents, buildDays, formatEvents } = props;
    if (!globalEvents) {
      fetchEvents(from, until, offset).then(events => {
        // console.log('events: ', events);
        globalEvents = events;
        const builtDays = buildDays(+from, +until);
        console.log('builtDays: ', builtDays);
        const formattedEvents = formatEvents(events, builtDays);
        setState(prevState => ({...prevState, squares: addEvents(days, formattedEvents), events: formattedEvents}));
        setState(prevState => ({...prevState, eventsLoaded: true}));
      })
    } else {
      const builtDays = buildDays(+from, +until);
      const formattedEvents = formatEvents(globalEvents, builtDays);
      setState(prevState => ({...prevState, squares: addEvents(days, formattedEvents), events: formattedEvents}));
      setState(prevState => ({...prevState, eventsLoaded: true}));
    }
    return () => {
      setState(prevState => ({...prevState, fade: 'fade-out'}));
    }
  }, [props])

  const nextMonth = async () => {
    setState(prevState => ({...prevState, fade:'fade-out', eventsLoaded: false}));
    await new Promise(r => setTimeout(r, 200));
    const nextMonth: number = state.monthDate.getMonth() + 1;
    const firstDayOfNextMonth = new Date(state.monthDate.getFullYear(), nextMonth, 1);
    const lastDayOfNextMonth = new Date(state.monthDate.getFullYear(), nextMonth + 1, 1);
    const days = buildCalendar(firstDayOfNextMonth);
    const daylightSavings = lastDayOfNextMonth.getTimezoneOffset() - firstDayOfNextMonth.getTimezoneOffset(); 
    // console.log('daylightSavings: ', daylightSavings);
    const subtractFromNextMonth = daylightSavings === 0 ? 1 : 1 + (daylightSavings * 60000);
    setState(prevState => ({...prevState, squares: days, monthDate: firstDayOfNextMonth, dayEvents: [], fade: 'fade-in'  }));
    const events = await props.fetchEvents(firstDayOfNextMonth.getTime(), lastDayOfNextMonth.getTime() - subtractFromNextMonth, firstDayOfNextMonth.getTimezoneOffset());
    // console.log('first Day: ', firstDayOfNextMonth);
    // console.log('last day: ', lastDayOfNextMonth);
    const builtDays = props.buildDays(firstDayOfNextMonth.getTime(), lastDayOfNextMonth.getTime() - 1)
    const formattedEvents = props.formatEvents(events, builtDays);
    setState(prevState => ({...prevState, squares: addEvents(days, formattedEvents), eventsLoaded: true}));
  }

  const lastMonth = async () => {
    setState(prevState => ({...prevState, fade:'fade-out', eventsLoaded: false}));
    await new Promise(r => setTimeout(r, 350));
    const lastMonth: number = state.monthDate.getMonth() - 1;
    const firstDayOfLastMonth = new Date(state.monthDate.getFullYear(), lastMonth, 1);
    const lastDayOfLastMonth = new Date(state.monthDate.getFullYear(), state.monthDate.getMonth(), 1);
    const days = buildCalendar(firstDayOfLastMonth);
    const daylightSavings = lastDayOfLastMonth.getTimezoneOffset() - firstDayOfLastMonth.getTimezoneOffset(); 
    const subtractFromLastMonth = daylightSavings === 0 ? 1 : 1 + (daylightSavings * 60000);
    setState( prevState => ({ ...prevState, squares: days, monthDate: firstDayOfLastMonth, events: [], fade: 'fade-in' }));
    const events = await props.fetchEvents(firstDayOfLastMonth.getTime(), lastDayOfLastMonth.getTime() - subtractFromLastMonth, firstDayOfLastMonth.getTimezoneOffset());
    const builtDays = props.buildDays(firstDayOfLastMonth.getTime(), lastDayOfLastMonth.getTime() - 1);
    const formattedEvents = props.formatEvents(events, builtDays);
    setState(prevState => ({...prevState, squares: addEvents(days, formattedEvents), eventsLoaded: true }));
  }

  const openModal = (events: GardenEvent[], selectedDate: string) => {
    setState(prevState => ({...prevState, isModalOpen: true, dayEvents: events, selectedDate: selectedDate}));
  }

  const closeModal = () => {
    setState(prevState => ({...prevState, isModalOpen: false, dayEvents: [], selectedDate: ''}));
  }

  return (
    <div className='calendar-container'>
      <EventsModal dayString={today.toString()} isOpen={state.isModalOpen} closeModal={closeModal} dayEvents={state.dayEvents} selectedDate={state.selectedDate} />
      <div className={`calendar-border ${state.fade} center-content`}>
        <div className='calendar-top-row'>
          <button className='month-last-button' onClick={lastMonth} disabled={!state.eventsLoaded}>
            <CircleArrowLeft color="white" size={48} strokeWidth={3}/>
          </button>
          <button className='month-next-button' onClick={nextMonth} disabled={!state.eventsLoaded}>
          <CircleArrowRight color="white" size={48} strokeWidth={3}/>
          </button>
          <h1 className="banner-month-year">{state.monthDate.toString().split(' ')[1]} {state.monthDate.toString().split(' ')[3]}</h1>
        </div>
        <div className="days-row">
          {daysOfWeek ? daysOfWeek.map((day)=> <DayHeading key={day} day={day}  />) : null}
        </div>
        <div className="calendar">
          {state.squares.map((square)=> <DayTile key={square.id} dayEvents={square.dayEvents} fullDate={square.fullDate} weekDay={square.weekDay} dateDay={square.dateDay} isActiveDay={square.isActiveDay} openModal={openModal} eventLoaded={state.eventsLoaded}/>)}
        </div>
      </div>
    </div>
  )
}

/**
 * Static functions to build date and add Events Not needed inside Functional Component. 
 * They do not directly interact with State.
 **/

const buildCalendar = (date: Date) => {
  // get year, month, first day, last day
  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDay = firstDayOfMonth.getDay();
  const lastDay = month < 12 ? new Date(year, month + 1, 0).getDate() : new Date(year + 1, 0, 0).getDate();
  // build calendar squares
  const daySquares: Square[] = [];
  let reachedFirstDay: boolean = false;
  let dateDay: number = 0;
  let i;
  for (i = 0; dateDay < lastDay; i++) {
    if (i === firstDay) {
      reachedFirstDay = true;
    }
    if (reachedFirstDay && dateDay < lastDay) {
      dateDay++;
      daySquares.push(
        { id: i,
          weekDay: i < 7 ? daysOfWeek[i] : daysOfWeek[i % 7],
          dateDay: dateDay,
          isActiveDay: true,
          fullDate: `${year}-${month}-${dateDay}`,
          dayEvents: [],
        }
      );
    } else {
      daySquares.push(
        { id: i,
          weekDay: i < 7 ? daysOfWeek[i] : daysOfWeek[i % 7],
          dateDay: -1,
          isActiveDay: false,
          fullDate: '',
          dayEvents: []
        }
      );
    }
  }
  while (i % 7) {
    daySquares.push(
      { id: i,
        weekDay: i < 7 ? daysOfWeek[i] : daysOfWeek[i % 7],
        dateDay: -1,
        isActiveDay: false,
        fullDate: '',
        dayEvents: []
      }
    );
    i++;
  }
  return daySquares;
}
/**
 * Add array of events to each calendar day
 */
const addEvents = (days: Square[], events: GardenEvent[]) => {
  days.forEach(day => {
    day.dayEvents = events.filter(event => event.dates?.includes(day.fullDate))
  })
  return days;
}

export default Calendar
