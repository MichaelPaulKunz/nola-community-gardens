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
  console.log('fullDate: ', props.fullDate);
  const today = new Date ();
  const todayFullDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  console.log('todayFullDate: ', todayFullDate);
  const backGround = props.fullDate === todayFullDate ? 'limegreen' : 'white';
  const squareHeight = window.innerWidth >= 650 ? '85px' : `${window.innerWidth / 7}px`
  return (
    <div className='day-square' style={{backgroundColor: props.isActiveDay ? backGround : 'grey', height: squareHeight}}>
      {props.isActiveDay ?
        <div>
          <div className='square-date'>{props.dateDay}</div>
          {
            props.eventLoaded ?
            <button onClick={() => props.openModal(props.dayEvents, props.fullDate)} style={{color: 'white'}} className='events-button fade-in'>
              <div style={{marginBottom: '-0.4rem', height: '50%'}}>{props.dayEvents.length}</div>
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