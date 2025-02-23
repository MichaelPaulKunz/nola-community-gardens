'use client'

// rafce
import React from 'react'
import { useState, useEffect } from 'react';
import DayTile from './DayTile';
import DayHeading from './DayHeading';

const daysOfWeek: string[] = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

interface Square {
  id: number;
  weekDay: string;
  dateDay: number;
  isActiveDay: boolean;
}

const today = new Date();

const Calendar = () => {
  interface MyState {
    squares: Square[];
    monthDate: Date;
  }

  const [state, setState] = useState<MyState>({
    squares: [],
    monthDate: today,
  });

  useEffect(() => {
    setState({squares: buildCalendar(today), monthDate: today})
  }, []);

  const nextMonth = () => {
    const nextMonth: number = state.monthDate.getMonth() + 1;
    const firstDayOfNextMonth = new Date(state.monthDate.getFullYear(), nextMonth, 1);
    setState({squares: buildCalendar(firstDayOfNextMonth), monthDate: firstDayOfNextMonth});
  }

  const lastMonth = () => {
    const lastMonth: number = state.monthDate.getMonth() - 1;
    const firstDayOfNextMonth = new Date(state.monthDate.getFullYear(), lastMonth, 1);
    setState({squares: buildCalendar(firstDayOfNextMonth), monthDate: firstDayOfNextMonth});
  }

  const buildCalendar = (date: Date) => {
    // get year, month, first day, last day
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDay = firstDayOfMonth.getDay();
    const lastDay = month < 12 ? new Date(year, month + 1, 0).getDate() : new Date(year + 1, 0, 0).getDate();
    // build calendar squares
    const daySquares: Square[] = [];
    let reachedFirstDay: boolean = false;
    let dateDay: number = 0;
    let i;
    for (i = 0; dateDay < lastDay; i++) {
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
    while (i % 7) {
      daySquares.push(
        { id: i,
          weekDay: i < 7 ? daysOfWeek[i] : daysOfWeek[i % 7],
          dateDay: -1,
          isActiveDay: false
        }
      );
      i++;
    }
  
    return daySquares;
  }

  return (
    <div className="calendar-container">
      <div className='calendar-top-row'>
        <button className='month-last-button' onClick={lastMonth}>⬅️</button>
        <button className='month-next-button' onClick={nextMonth}>➡️</button>
        <h1 className="banner-month-year">{state.monthDate.toString().split(' ')[1]} {state.monthDate.toString().split(' ')[3]}</h1>
      </div>
      <div className="days-row">
        {daysOfWeek.map((day)=> <DayHeading key={day} day={day}  />)}
      </div>
      <div className="calendar">
        {state.squares.map((square)=> <DayTile key={square.id} weekDay={square.weekDay} dateDay={square.dateDay} isActiveDay={square.isActiveDay} />)}
      </div>
    </div>
  )
}

export default Calendar