import React from 'react'
import { GardenEvent } from './Events'

interface Props {
  event: GardenEvent;
}

const EventListing = (props: Props) => {
  const { event } = props;
  const { address, location, eventName, start, end } = event;
  const startString = parseTime(start);
  let endString;
  if (end) {
    endString = end.includes(':') ? parseTime(end) : end;
  } else {
    endString = '??'
  }

  return (
    <div className="centerContent" style={{border: '1px solid black', marginBottom: '1rem'}}>
      <div style={{margin: '1rem'}}>
        <h1 style={{fontWeight: 'bold', color: 'black'}}>
          {eventName} @ {location}
        </h1>
        <div>
          { address }
        </div>
        <div>
          {startString} - {endString}
        </div>  
      </div>
    </div>
  )
}

function parseTime(time: string) {
  const startArray = time.split(':');
  const startHour: string = +startArray[0] > 12 ? (+startArray[0] - 12).toString() : startArray[0];
  const startMinute: string = startArray[1].length > 1 ? startArray[1] : `0${startArray[1]}`;
  const startAmPm: string = +startArray[0] >= 12 ? 'pm' : 'am'; 
  return`${startHour}:${startMinute}${startAmPm}`;
}

export default EventListing