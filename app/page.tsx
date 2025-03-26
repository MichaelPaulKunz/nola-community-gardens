import Image from "next/image";
import Events from "./components/Events/Events"
import ResourceMap from "./components/ResourceMap";

export interface GardenEvent {
  weekDay: string;
  dates: string[];
  start: string;
  end: string;
  eventName: string;
  location: string;
  address: string;
  timeStamps: number[];
  startHour: number;
  startMinute: number;
}

export interface UnformattedEvent {
  id: number;
  eventName: string;
  address: string;
  location: string;
  start: number;
  end: string;
  recurring: string;
}

export interface Day {
  year: number;
  month: number;
  day: number;
  fullDate: string;
  dayOfWeek: string;
  events: GardenEvent[];
}

const { GET_EVENTS_URL } = process.env;
const getEvents = GET_EVENTS_URL;

const fetchEvents = async (from: number, until: number, offset: number) => {
  'use server';
  const res = await fetch(`${getEvents}?from=${from}&until=${until}&offset=${offset}`, {cache: 'no-store'}); 
  return res.json();
}
// const events: GardenEvent[] = await fetchEvents(from, until, offset);

export default function Home() {

  return (
    <div className="center-body">
      <div className="img-container">
        <Image
                className="center-content"
                src="/banner-main.png"
                alt="Nola Community Gardens"
                height={312 * 0.74}
                width={820 * 0.74}
                priority={true}
                style={{marginTop: '5px'}}
        />
      </div>
      <Events fetchEvents={fetchEvents} />
      <div className="" style={{textAlign: 'center'}}>
        <ResourceMap />
      </div>
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>      
    </div>
  );
}
