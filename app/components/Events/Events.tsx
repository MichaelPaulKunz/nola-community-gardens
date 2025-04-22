
'use client';

import React from 'react'
import Tabs from "./Tabs";
import Calendar from "./CalendarMonth/Calendar";
import List from "./List";
// import Popcorn from "../Popcorn";
import { useState } from 'react';
import { UnformattedEvent, Day } from '../../page';
export interface GardenEvent {
  id: number;
  weekDay: string;
  dates: string[];
  start: string;
  end: string;
  eventName: string;
  location: string;
  address: string;
  timeStamps: number[];
  startHour: number;
  startMinute: number;
  ogTimeStamp: number;
}

const daysOfWeek: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

interface Props {
  fetchEvents: (from: number, until: number, offset: number) => Promise<UnformattedEvent[]>;
}

const Events = (props: Props) => {
  interface MyState {
    events: GardenEvent[];
    view: string;
  }

  const [state, setState] = useState<MyState>({
    events: [],
    view: 'calendar'
  });

  const changeView = () => {
    if (state.view === 'calendar') {
      setState(prevState => ({...prevState, view: 'list'}))
    } else {
      setState(prevState=> ({...prevState, view: 'calendar'}));
    }
  }

  const buildDays = (from: number, until: number) => {
    const fromDate = new Date(+from);
    const untilDate = new Date(+until);
    const days: Day[] = [];
    const firstDayOfWeek = fromDate.getDay();
    let day = fromDate.getDate();
    while (day <= untilDate.getDate()) {
      let dayOfWeek = firstDayOfWeek + (day - 1);
      dayOfWeek = dayOfWeek > 6 ? dayOfWeek % 7 : dayOfWeek;
      days.push({year: fromDate.getFullYear(), month: fromDate.getMonth(), day: day, fullDate:`${fromDate.getFullYear()}-${fromDate.getMonth()}-${day}`, dayOfWeek: daysOfWeek[dayOfWeek], events: []});
      day = day + 1;
    }
    return days;
  } 

  const formatEvents = (events: UnformattedEvent[], days: Day[]) => {
    console.log('events: ', events);
    const oneOff = events.filter(event => !event.recurring);
    const weekly = events.filter(event => event.recurring === 'week');
    const monthly = events.filter(event => event.recurring === 'month');

    const singleEvents = oneOff.map(event => {
      const ogTimeStamp = event.start;
      const id = event.id;
      const eventDate = new Date(event.start);
      const timeStamps = [eventDate.getTime()]; // make array to align with format of recurring
      const weekDay = daysOfWeek[eventDate.getDay()];
      const dates = [`${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`]; // make array to align with format of recurring
      const start = `${eventDate.getHours()}:${eventDate.getMinutes()}`;
      const startHour = eventDate.getHours();
      const startMinute = eventDate.getMinutes();
      let end;
      if (isNaN(+event.end)) {
        end = event.end
      } else {
        const endDate = new Date(+event.end);
        end = `${endDate.getHours()}:${endDate.getMinutes().toString()}`;
      }
      const { eventName, location, address } = event;
      return { id, weekDay, dates, start, end, eventName, location, address, timeStamps, startHour, startMinute, ogTimeStamp };
    })

    const weeklyEvents = weekly.map(event => {
      const ogTimeStamp = event.start;
      const id = event.id;
      const eventDate = new Date(event.start);
      const weekDay = daysOfWeek[eventDate.getDay()];
      const { eventName, location, address } = event;
      const startHour = eventDate.getHours();
      const startMinute = eventDate.getMinutes();
      const start = `${eventDate.getHours()}:${eventDate.getMinutes()}`;
      let end;
      if (isNaN(+event.end)) {
        end = event.end
      } else {
        const endDate = new Date(+event.end);
        end = `${endDate.getHours()}:${endDate.getMinutes().toString()}`;
      }
      const dates: string[] = [];
      const timeStamps: number[] = [];
      days.forEach(day => {
        if (day.dayOfWeek === weekDay) {
          const timeStamp = new Date(day.year, day.month, day.day, startHour, startMinute).getTime();
          // honor true start date
          if (timeStamp >= eventDate.getTime()) {
            dates.push(day.fullDate);
            timeStamps.push(timeStamp);
          }
        }
      })
      return { id, weekDay, dates, start, end, eventName, location, address, timeStamps, startHour, startMinute, ogTimeStamp };
    })

    const monthlyEvents = monthly.map(event => {
      // stop
      const id = event.id;
      const ogTimeStamp = event.start;
      const eventDate = new Date(event.start);
      const weekDay = daysOfWeek[eventDate.getDay()];
      const { eventName, location, address } = event;
      const startHour = eventDate.getHours();
      const startMinute = eventDate.getMinutes();
      const start = `${eventDate.getHours()}:${eventDate.getMinutes()}`;
      let end;
      if (isNaN(+event.end)) {
        end = event.end
      } else {
        const endDate = new Date(+event.end);
        end = `${endDate.getHours()}:${endDate.getMinutes().toString()}`;
      }
      const dates = [];
      const timeStamps = [];
      // get n weekday of month
      const whichWeekDay = Math.ceil(eventDate.getDate() / 7);
      // console.log(`this is the ${whichWeekDay} ${weekDay} of the month`);
      // let firstWeekDay;
      // console.log('days: ', days);
      const onlySpecificWeekDay = days.filter(day => day.dayOfWeek === weekDay);
      // console.log('onlySpecificWeekday: ', onlySpecificWeekDay);
      const eventDay = onlySpecificWeekDay[whichWeekDay - 1];
      const timeStamp = new Date(eventDay.year, eventDay.month, eventDay.day, startHour, startMinute).getTime();
      if (timeStamp >= eventDate.getTime()) {
        dates.push(eventDay.fullDate);
        timeStamps.push(new Date(eventDay.year, eventDay.month, eventDay.day, startHour, startMinute).getTime());
      }
      return { id, weekDay, dates, start, end, eventName, location, address, timeStamps, startHour, startMinute, ogTimeStamp};
    })

    return singleEvents.concat(weeklyEvents).concat(monthlyEvents);
  }


  return (
    <div className="fade-in">
      {/* <div className="make-boxy">
        <div className="three-dee-top-line"></div>
      </div> */}
      <Tabs view={state.view} changeView={changeView} />
      {
        state.view === 'calendar' 
        ?
        <Calendar fetchEvents={props.fetchEvents} formatEvents={formatEvents} buildDays={buildDays} />
        :
        <List fetchEvents={props.fetchEvents} formatEvents={formatEvents} buildDays={buildDays} />
      }
      {/* <div className="pop-container">
        <Popcorn />
      </div> */}
    </div>
  )
}

export default Events;