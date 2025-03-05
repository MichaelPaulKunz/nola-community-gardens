import React from 'react'
import Calendar from "./CalendarMonth/Calendar";




const today = new Date();
const { GET_EVENTS_URL } = process.env;
const getEvents = GET_EVENTS_URL;
const offset = today.getTimezoneOffset();
// get year, month, from until
const year: number = today.getFullYear();
const month: number = today.getMonth();
const firstDayMonth = new Date(year, month, 1);
const firstDayNextMonth = new Date(year, month + 1, 1)
const from = firstDayMonth.getTime();
const until = firstDayNextMonth.getTime() - 1;

export interface GardenEvent {
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
}

const Events = async () => {

  // get events for the month; 
  // const res = await fetch(`${getEvents}?from=${from}&until=${until}&offset=${offset}`, {cache: 'no-store'}); 
  // const events = await res.json();
  // let events: object;

  const fetchEvents = async (from: number, until: number, offset: number) => {
    'use server';
    const res = await fetch(`${getEvents}?from=${from}&until=${until}&offset=${offset}`, {cache: 'no-store'}); 
    return res.json();
  }

  const events: GardenEvent[] = await fetchEvents(from, until, offset);

  return (
    <div>
      <Calendar events={events} fetchEvents={fetchEvents}/>
    </div>
  )
}

export default Events;