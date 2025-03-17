
'use client';

import React from 'react'
import Tabs from "./Tabs";
import Calendar from "./CalendarMonth/Calendar";
import List from "./List";
// import Popcorn from "../Popcorn";
import { useState } from 'react';
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
        <Calendar fetchEvents={props.fetchEvents}/>
        :
        <List fetchEvents={props.fetchEvents}/>
      }
      {/* <div className="pop-container">
        <Popcorn />
      </div> */}
    </div>
  )
}

export default Events;