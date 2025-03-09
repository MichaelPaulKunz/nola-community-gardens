import React from 'react'

const Tabs = () => {

  return (
    <div className="center-content tab-bar">
      <div className="sm:hidden">
        <select id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Calendar</option>
            <option>List</option>
        </select>
      </div>
      <ul className="hidden text-lg font-medium text-center text-gray-900 shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
              <button style={{float: 'left'}} className="tab inline-block w-full border-r border-gray-200 dark:border-gray-700  hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white" aria-current="page">Calendar</button>
          </li>
          <li className="w-full">
              <button style={{float: 'right'}} className="tab inline-block w-full border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">List</button>
          </li>
      </ul>
    </div>
  )
}

export default Tabs