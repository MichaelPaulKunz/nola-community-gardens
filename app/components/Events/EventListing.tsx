import React from 'react'
import { GardenEvent } from './Events'
import { useState } from 'react';
import Link from 'next/link';
import Spinner from '../../components/Spinner'

interface Props {
  event: GardenEvent;
  dayString: string;
  selectedDate: string;
}


const EventListing = (props: Props) => {
  interface MyState {
    showDirectionsToolTip: boolean;
    showCopyToolTip: boolean;
    showCopiedFlag: boolean;
    borderColor: string;
    eventBackground: string;
    isLoading: boolean;
  }
  console.log('window: ', window.innerWidth)

  const [state, setState] = useState<MyState>({
    showDirectionsToolTip: false,
    showCopyToolTip: false,
    showCopiedFlag: false,
    borderColor: 'black',
    eventBackground: 'white',
    isLoading: false
  });

  const { event } = props;
  const { address, location, eventName, start, end, id } = event;
  const startString = parseTime(start);
  let endString, dash;
  if (end) {
    endString = end.includes(':') ? parseTime(end) : end;
    dash = '-'
  } else {
    endString = ''
    dash = ''
  }

  const displayAddress: string = window.innerWidth >= 650 ? address : address.split(',')[0];
  const dateArray = props.selectedDate.split('-');
  const timeZoneDate = new Date(+dateArray[0], +dateArray[1], +dateArray[2]);
  const timeZone = window.innerWidth >= 650 ? '(' + timeZoneDate.toString().split('(')[1] : '';

  const selectMap = () => {
    if // apple maps
    ((navigator.platform.indexOf("iPhone") != -1) || 
     (navigator.platform.indexOf("iPod") != -1) || 
     (navigator.platform.indexOf("iPad") != -1))
        window.open(`maps://maps.google.com/maps??api=1&q=${encodeURIComponent(address)}`);

    else // google
      window.open(`https://maps.google.com/maps??api=1&q=${encodeURIComponent(address)}`);
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setState(prevState => ({...prevState, showCopyToolTip: false, showCopiedFlag: true, borderColor: 'lightgreen'}));
    setTimeout(() => {
      setState(prevState => ({...prevState, showCopyToolTip: false, showCopiedFlag: true, borderColor: 'black'}));
    }, 200)
  }

  const showDirectionsTip = () => {
    setState(prevState => ({...prevState, showDirectionsToolTip: true}));
  }

  const hideDirectionsTip = () => {
    setState(prevState => ({...prevState, showDirectionsToolTip: false}));
  }

  const showCopyTip = () => {
    setState(prevState => ({...prevState, showCopyToolTip: true}));
  }

  const hideCopyTip = () => {
    setState(prevState => ({...prevState, showCopyToolTip: false, showCopiedFlag: false}));
  }

  const highlightEvent = () => {
    setState(prevState => ({...prevState, eventBackground: '#dfdfdf'}))
  }

  const unlightEvent = () => {
    setState(prevState => ({...prevState, eventBackground: 'white'}))
  }

  const loadEvent = () => {
    setState(prevState => ({...prevState, isLoading: true}))
  }
  
  // console.log('event: ', event);
  // console.log('dayString: ', props.dayString);

  const getTimeStamp = () => {
    const { event } = props;
    const { timeStamps, dates, ogTimeStamp } = event;
    const correspondingDate = dates.filter(date => date.split('-')[2] === props.selectedDate.split('-')[2])[0];
    const stamp = timeStamps[dates.indexOf(correspondingDate)];
    const offset = new Date(ogTimeStamp).getTimezoneOffset() - new Date(stamp).getTimezoneOffset();
    return { stamp, offset };
  }
  // console.log('time: ', getTimeStamp());

  return (
    <div className="event-listing" style={{borderColor: state.borderColor}}>
      {state.isLoading ? 
        <div className="spinner">
          <Spinner />
        </div>
      :
        null
      }
      <div className="list-icons-right">
        <span className="map-pin">
          <svg onMouseOver={showDirectionsTip} onMouseOut={hideDirectionsTip} style={{float: 'left', cursor: 'pointer'}} onClick={selectMap} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          {
            state.showDirectionsToolTip
            ?
              <div data-tooltip="tooltip"
                style={{marginTop: '50px'}}
                className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"> 
                  Directions
              </div>
            :
              null
          }
        </span>
        
        <span className="copy-icon">
        {
            state.showCopiedFlag
            ?
              <div data-tooltip="tooltip"
                style={{marginTop: '-20px', backgroundColor: "limegreen", color: "black"}}
                className=" slow-fade-out absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"> 
                  Copied
              </div>
            :
              null
          }
          <svg onMouseOver={showCopyTip} onMouseOut={hideCopyTip}onClick={copyAddress} style={{float: 'right', marginRight: '1%', cursor: 'pointer'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
          </svg>
          {
            state.showCopyToolTip
            ?
              <div data-tooltip="tooltip"
                style={{marginTop: '50px'}}
                className="absolute z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-3 font-sans text-sm font-normal text-white focus:outline-none"> 
                  Copy Address
              </div>
            :
              null
          }
        </span>
      </div>
      <Link href={{
        pathname: "/event",
        query: {
          i: id,
          t: getTimeStamp().stamp,
          o: getTimeStamp().offset
        }
      }}>
        <div onClick={loadEvent} onMouseOver={highlightEvent} onMouseOut={unlightEvent} className="event-info" style={{backgroundColor: state.eventBackground}}>
          {window.innerWidth >= 650 ? 
          <h1 className="place">
            {eventName} @ {location}
          </h1> :
          <div className="place">
            <h1 className="event-name">
              {eventName}
            </h1>
            <h1 className="location">
              {location}
            </h1>
          </div>
          }

          <div className="address">
            { displayAddress }
          </div>
          <div className="time"> 
            {startString} {dash} {endString} {timeZone}
          </div>  
        </div>
      </Link>
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