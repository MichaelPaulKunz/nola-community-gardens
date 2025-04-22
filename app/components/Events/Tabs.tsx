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
    calendarShadow: string;
    listShadow: string;
  }

  const [state, setState] = useState<MyState> ({
    view: 'calendar',
    calendarShadow: 'tab-pressed',
    listShadow: ''
  })

  const selectCal = () => {
    if (state.view !== 'calendar') {
      props.changeView();
    }
    setState({view: 'calendar', calendarShadow: 'tab-pressed', listShadow: ''});
  }

  const selectList = () => {
    if (state.view !== 'list') {
      props.changeView();
    }
    setState({view: 'list', calendarShadow: 'tab-unpressed', listShadow: 'tab-pressed'});
  }

  return (
    <div className="center-content tab-bar">
      <ul className="text-lg font-medium text-center text-gray-900 shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400 main-content">
          <li className="w-full">
              <button onClick={selectCal} style={{float: 'left'}} className={`${state.calendarShadow} tab-left inline-block border-r dark:text-white" aria-current="page"`}>Calendar</button>
          </li>
          <li className="w-full">
              <button onClick={selectList} style={{float: 'right'}} className={`${state.listShadow} tab inline-block border-r dark:hover:text-white`}>List</button>
          </li>
      </ul>
    </div>
  )
}

export default Tabs