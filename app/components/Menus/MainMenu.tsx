import React from 'react';
import Link from 'next/link';

interface myProps {
  currentPage: string;
}

const MainMenu = (props:myProps) => {
  const pages: { [key: string]: string } = {
    events: 'link-bottom',
    gardens: 'link-bottom',
    map: 'link-bottom',
    createEvent: 'link-bottom'
  }

  for (const key in pages) {
    if (key === props.currentPage) {
      pages[key] = 'link-bottom-pushed-in';
    }
  }

  return (
    <div className="main-menu">
       <Link href={{
        pathname: "/",
      }}>
        <span className={pages.events}>Events</span>
      </Link>
      <Link href={{
        pathname: "/gardens"
      }}>
        <span className={pages.gardens}>Gardens</span>
      </Link>
      <Link href={{
        pathname: "/map"
      }}>
        <span className={pages.map}>Map</span>
      </Link>  
      <Link href={{
        pathname: "/create-event"
      }}>
      <span className={pages.createEvent}>New Event</span>
      </Link>
    </div>
  )
}

export default MainMenu