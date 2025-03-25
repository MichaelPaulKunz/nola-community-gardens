'use client';

import React from 'react'
import { EventInfo } from '../page';
interface MyProps {
  eventInfo: EventInfo;
}

const PlaceInfo = (props: MyProps) => {

  const { eventInfo } = props;
  const { location, address } = eventInfo;

  const selectMap = () => {
    if // apple maps
    ((navigator.platform.indexOf("iPhone") != -1) || 
     (navigator.platform.indexOf("iPod") != -1) || 
     (navigator.platform.indexOf("iPad") != -1))
        window.open(`maps://maps.google.com/maps??api=1&q=${encodeURIComponent(address)}`);

    else // google
      window.open(`https://maps.google.com/maps??api=1&q=${encodeURIComponent(address)}`);
  }

  return (
    <div style={{margin: '10px 0', border: '4px solid white', width: '56.5%', fontWeight: 'bold'}}>
      <div style={{marginLeft: '10px', fontSize: '1.1rem'}}>{location}</div>
      <div style={{marginLeft: '10px', fontSize: '1rem', cursor: 'pointer'}} onClick={selectMap}>{address}</div>
    </div>
  )
}

export default PlaceInfo