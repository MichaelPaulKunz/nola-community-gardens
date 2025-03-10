'use client'

import React from 'react'
import { useState } from 'react';

interface MyProps {
  view: string;
  changeView: () => void;
}

const Tabs = (props: MyProps) => {
  interface MyState {
    view: string;
    calendarBg: string;
    listBg: string;
    calendarShadow: string;
    listShadow: string;
  }

  const [state, setState] = useState<MyState> ({
    view: 'calendar',
    calendarBg: '#3e3d3d',
    listBg: 'grey',
    calendarShadow: 'tab-pressed',
    listShadow: ''
  })

  // const changeView = () => {
  //   if (props.view === 'calendar') {
  //     props.view = 'list';
  //   } else {
  //     props.view = 'calendar';
  //   }
  // }

  const selectCal = () => {
    if (state.view !== 'calendar') {
      props.changeView();
    }
    setState({view: 'calendar', calendarBg: '#3e3d3d', listBg: 'grey', calendarShadow: 'tab-pressed', listShadow: ''});
  }

  const selectList = () => {
    if (state.view !== 'list') {
      props.changeView();
    }
    setState({view: 'list', calendarBg: 'grey', listBg: '#3e3d3d', calendarShadow: '', listShadow: 'tab-pressed'});
  }

  return (
    <div className="center-content tab-bar">
      <ul className="hidden text-lg font-medium text-center text-gray-900 shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
              <button onClick={selectCal} style={{float: 'left', backgroundColor: state.calendarBg}} className={` ${state.calendarShadow} tab inline-block w-full border-r border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white" aria-current="page"`}>Calendar</button>
          </li>
          <li className="w-full">
              <button onClick={selectList} style={{float: 'right', backgroundColor: state.listBg}} className={`${state.listShadow} tab inline-block w-full border-r border-gray-200 dark:border-gray-700 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700`}>List</button>
          </li>
      </ul>
    </div>
  )
}

export default Tabs