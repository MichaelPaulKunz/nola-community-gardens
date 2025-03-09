// rafce

import React from 'react'
import { GardenEvent } from '../Events';
// import Popcorn from '../../Popcorn';

interface Props {
  weekDay: string;
  dateDay: number;
  isActiveDay: boolean;
  fullDate: string;
  dayEvents: GardenEvent[];
  openModal: (e: GardenEvent[], selectedDate: string) => void;
  eventLoaded: boolean
}

const DayTile = (props: Props) => {

  return (
    <div className='day-square' style={{backgroundColor: props.isActiveDay ? 'white' : 'grey' }}>
      {props.isActiveDay ?
        <div>
          <div className='square-date'>{props.dateDay}</div>
          {
            props.eventLoaded ?
            <button onClick={() => props.openModal(props.dayEvents, props.fullDate)} className='events-button fade-in'>
              <div style={{marginBottom: '-0.4rem'}}>{props.dayEvents.length}</div>
              {
                props.dayEvents.length === 1 ? 
                <div>Event</div>
                :
                <div>Events</div>
              }
            </button>
            :
            <div></div>
          }
        </div> 
      :
      <div></div>
      }
    </div>
  )
}

export default DayTile