
'use client';

import React from 'react'
import Tabs from "./Tabs";
import Calendar from "./CalendarMonth/Calendar";
import List from "./List";
import { useState, useEffect } from 'react';


const today = new Date();
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

interface Props {
  fetchEvents: (from: number, until: number, offset: number) => Promise<GardenEvent[]>;
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

  useEffect(() => {
    const { fetchEvents } = props;
    let events: GardenEvent[];
    async function getEvents() {
      events = await fetchEvents(from, until, offset);
    }
    getEvents().then(() => {
      setState(prevState => ({ ...prevState, events: events}))
    });
  }, [props])

  const changeView = () => {
    if (state.view === 'calendar') {
      setState(prevState => ({...prevState, view: 'list'}))
    } else {
      setState(prevState=> ({...prevState, view: 'calendar'}));
    }
  }

  return (
    <div>
      <Tabs view={state.view} changeView={changeView} />
      {
        state.view === 'calendar' 
        ?
        <Calendar events={state.events} fetchEvents={props.fetchEvents}/>
        :
        <List />
      }
    </div>
  )
}

export default Events;