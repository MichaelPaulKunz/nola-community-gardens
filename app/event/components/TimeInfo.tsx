'use client';

import React from 'react'
import { EventInfo } from '../page';
import styles from '../eventStyles.module.css';
interface MyProps {
  eventInfo: EventInfo;
}

const TimeInfo = (props:MyProps) => {

  

const { eventInfo } = props;
const originalEvent = new Date(eventInfo.originalStart);
const startHour = originalEvent.getHours();
const startMinute = originalEvent.getMinutes();
const startTime = parseTime(`${startHour}:${startMinute}`);

const endTime = isNaN(+eventInfo.originalEnd) ? 
  eventInfo.originalEnd : 
  parseTime(`${new Date(+eventInfo.originalEnd).getHours()}:${new Date(eventInfo.originalEnd).getMinutes()}`);

const currentEventDate = new Date(eventInfo.eventStart);
const currentEvent = currentEventDate.toString();
const timeZone = currentEvent.split('(')[1].slice(0, -1);


const addToCalendar = () => {
  const name = `${eventInfo.eventName} @ ${eventInfo.location}`;
  const description = '';
  const location = eventInfo.address;
  const start_datetime = currentEventDate.toISOString();
  let end_datetime;
  if (isNaN(+eventInfo.originalEnd)) {
    end_datetime = new Date(eventInfo.eventStart + (120 * 60000)).toISOString();
  } else {
    const endDate = new Date(eventInfo.originalEnd);
    const end = new Date(currentEventDate.getFullYear(), currentEventDate.getMonth(), currentEventDate.getDate(), endDate.getHours(), endDate.getMinutes() )
    end_datetime = end.toISOString();
  }

  const formatDate = (dateString: string) => new Date(dateString)
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");
  
  const dates = `${formatDate(start_datetime)}/${formatDate(end_datetime)}`;
  
  const url = `https://www.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(name)}` +
    `&dates=${dates}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;
  
  window.open(url, "_blank");
};
  


  return (
    <div className={styles.timeContainer}>
      <div className={styles.eventDay}>{currentEvent.split(' ').slice(0, 4).join(' ')}</div>
      <div className={styles.timeAndCalContainer}>
        <div className={styles.timeDisplay}>
          <div>{startTime} - {endTime}</div>
          <div>{timeZone}</div>
        </div>
        <div onClick={addToCalendar} className={styles.calendarIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><g color="white" data-name="26-calendar"><path d="M35 48H3a3 3 0 0 1-3-3V20h2v25a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V32h2v13a3 3 0 0 1-3 3zM20 18H1a1 1 0 0 1-1-1v-4a3 3 0 0 1 3-3h17v2H3a1 1 0 0 0-1 1v3h18z"/><path d="M8 8h2v6H8zM18 8h2v6h-2zM11 26H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2H6zM20 26h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4v2h-3v2h3zM11 35H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2H6zM22 35h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2h-4zM33 35h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2h-4zM11 44H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2H6zM22 44h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2h-4zM33 44h-6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1zm-5-2h4v-2h-4zM37 30a.987.987 0 0 1-.383-.076A1 1 0 0 1 36 29v-3H25a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3h-3.586l-3.707 3.707A1 1 0 0 1 37 30zM25 2a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h12a1 1 0 0 1 1 1v1.586l2.293-2.293A1 1 0 0 1 41 24h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/><path d="M37 19h-4a1 1 0 0 1-1-1v-2h-2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2a1 1 0 0 1-1 1zm-3-2h2v-2a1 1 0 0 1 1-1h2v-2h-2a1 1 0 0 1-1-1V9h-2v2a1 1 0 0 1-1 1h-2v2h2a1 1 0 0 1 1 1z"/></g></svg>
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

export default TimeInfo;

