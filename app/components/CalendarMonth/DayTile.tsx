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
          <div className="square-date">{props.dateDay}</div>
          {/* <div>{props.weekDay}</div>   */}
        </div> 
      :
      <div></div>
      }
    </div>
  )
}

export default DayTile