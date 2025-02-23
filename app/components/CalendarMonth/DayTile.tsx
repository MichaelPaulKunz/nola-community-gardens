// rafce

import React from 'react'

interface Props {
  weekDay: string;
  dateDay: number;
  isActiveDay: boolean;
}

const DayTile = (props: Props) => {
  return (
    <div className='day-square' style={{backgroundColor: props.isActiveDay ? 'white' : 'grey' }}>
      {props.isActiveDay ?
        <div>
          <div className='square-date'>{props.dateDay}</div>
          <button className='events-button'>
            <div>300</div>
            <div>Events</div>
          </button>
        </div> 
      :
      <div></div>
      }
    </div>
  )
}

export default DayTile