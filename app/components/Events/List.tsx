import React from 'react'
import {useState, useEffect } from 'react';
import { GardenEvent } from './Events'
import EventListing from './EventListing';
import { Day, UnformattedEvent } from '../../page';

const daysOfWeek: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const monthsOfYear: string[] =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let globalEvents: UnformattedEvent[];

interface DayObject {
  fullDate: string;
  dayOfWeek: string;
  day: number;
  month: number;
  year: number;
  events: GardenEvent[];
}
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

const List = (props: Props) => {
  interface MyState {
    currentMonthYear: Date;
    events: GardenEvent[];
    days: DayObject[];
    fade: string;
  }

  const [state, setState] = useState<MyState> ({
    currentMonthYear: today,
    events: [],
    days: [],
    fade: 'fade-in'
  })

  useEffect(()=>{
    console.log('monthByDays: ', monthByDays(today));
    if (globalEvents) {
      const days = monthByDays(today);
      const builtDays = props.buildDays(from, until);
      const formattedEvents = props.formatEvents(globalEvents, builtDays);
      const daysWithEvents = addEvents(days, formattedEvents);
      setState(prevState => ({...prevState, events: formattedEvents, days: daysWithEvents, fade: 'fade-in'
      }));
      console.log(globalEvents);
    } else {
      props.fetchEvents(from, until, offset).then((data) => {
        globalEvents = data;
        const days = monthByDays(today);
        const builtDays = props.buildDays(from, until);
        const formattedEvents = props.formatEvents(globalEvents, builtDays);
        const daysWithEvents = addEvents(days, formattedEvents);
        setState(prevState => ({...prevState, events: formattedEvents, days: daysWithEvents, fade: 'fade-in'}));
        console.log(globalEvents);
      })
    }
    return () => {
      setState(prevState => ({...prevState, fade: 'fade-out'}));
    }
  }, [props]);



  return (
    <div className={`center-content ${state.fade}`}>
        <div className='calendar-container'>
          <div className='calendar-border center-content'>
            <h1 className="banner-month-year">{today.toString().split(' ')[1]} {today.toString().split(' ')[3]}</h1>
            {/* {state.events.map((event, index) => <div key={index}>{event.dates}</div>)} */}
            {
              state.days.map((day, index) => (
                
                  day.events.length ?
                  <div key={`parent_${index}`} className="mt-2">
                    <div className='list-days' key={`day-${index}`}>
                      {`${day.dayOfWeek} ${monthsOfYear[month]} ${day.day} ${day.year}`}
                    </div>
                    {day.events.map((event, eventIndex) =>
                      <div className="text-sm text-gray-500 list-event" key={`event-parent-${index}-${eventIndex}`}>
                        <EventListing selectedDate={`${day.year}-${day.month}-${day.day}`} dayString={today.toString()} key={`event-${index}-${eventIndex}`} event={event}/>
                      </div> 
                    )}
                  </div> 
                    :
                    null
                  
              )
              
              
              )
            }
          </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
  )
}

function monthByDays(date: Date) {
  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const firstDay = date.getDate()
  let weekDay = date.getDay();
  const lastDay = month < 12 ? new Date(year, month + 1, 0).getDate() : new Date(year + 1, 0, 0).getDate();
  const dayMapping: DayObject[] = [];
  for (let i = firstDay; i <= lastDay; i++) {
    const dayObj: DayObject = {
      fullDate: `${year}-${month}-${i}`,
      dayOfWeek: weekDay < 7 ? daysOfWeek[weekDay] : daysOfWeek[weekDay % 7],
      day: i,
      month: month,
      year: year,
      events: []
    };
    dayMapping.push(dayObj);
    weekDay++;
  }
  return dayMapping;
}

/**
 * Add array of events to each calendar day
 */
const addEvents = (days: DayObject[], events: GardenEvent[]) => {
  days.forEach(day => {
    day.events = events.filter(event => event.dates?.includes(day.fullDate))
  })
  return days;
}

export default List

