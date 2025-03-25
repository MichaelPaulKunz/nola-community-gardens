'use client';

import React from 'react'
import { EventInfo } from '../page';
import styles from '../eventStyles.module.css';
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
    <div className={styles.placeContainer}>
      <div className={styles.location}>{location}</div>
      <div className={styles.address} onClick={selectMap}>{address}</div>
    </div>
  )
}

export default PlaceInfo