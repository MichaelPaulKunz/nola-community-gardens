// rafce
import React from 'react'
import DayTile from './DayTile';
import DayHeading from './DayHeading';


interface Square {
  id: number;
  weekDay: string;
  dateDay: number;
  isActiveDay: boolean;
}

const daysOfWeek: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const today = new Date();
const year: number = today.getFullYear();
const month: number = today.getMonth();
const firstDayOfMonth = new Date(year, month, 1);
const firstDay = firstDayOfMonth.getDay();
const lastDay = month < 12 ? new Date(year, month + 1, 0).getDate() : new Date(year + 1, 0, 0).getDate();

const daySquares: Square[] = [];
let reachedFirstDay: boolean = false;
let dateDay: number = 0;
for (let i = 0; i < 35; i++) {
  if (i === firstDay) {
    reachedFirstDay = true;
  }
  if (reachedFirstDay && dateDay < lastDay) {
    dateDay++;
    daySquares.push(
      { id: i,
        weekDay: i < 7 ? daysOfWeek[i] : daysOfWeek[i % 7],
        dateDay: dateDay,
        isActiveDay: true
      }
    );
  } else {
    daySquares.push(
      { id: i,
        weekDay: i < 7 ? daysOfWeek[i] : daysOfWeek[i % 7],
        dateDay: -1,
        isActiveDay: false
      }
    );
  }
}

const Calendar = () => {
  return (
    <div className="calendar-container">
      {/* <h1 className="banner-month-year">{firstDayOfMonth.toString()}</h1> */}
      <h1 className="banner-month-year">{today.toString().split(' ')[1]} {today.toString().split(' ')[3]}</h1>
      <div className="days-row">
        {daysOfWeek.map((day)=> <DayHeading key={day} day={day}  />)}
      </div>
      <div className="calendar">
        {daySquares.map((square)=> <DayTile key={square.id} weekDay={square.weekDay} dateDay={square.dateDay} isActiveDay={square.isActiveDay} />)}
      </div>
    </div>
  )
}

export default Calendar