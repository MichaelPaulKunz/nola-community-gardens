import React from 'react';
import Image from "next/image";
import TimeInfo from './components/TimeInfo';
import PlaceInfo from './components/PlaceInfo';

export interface EventInfo {
  eventName: string;
  location: string;
  recurring: string;
  address: string;
  eventStart: number;
  originalStart: number;
  originalEnd: string | number;
}

const Event = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = (await searchParams);
  const { i, t, o } = params;
  const  { GET_FULL_EVENT_URL }  = process.env;

  const getFullEvent = async () => {
    const res = await fetch(`${GET_FULL_EVENT_URL}?index=${i}&time=${t}&offset=${o}`, 
      { cache: 'no-store' }
    );
    return res.json();
  }

  const eventInfo = await getFullEvent();

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
      {eventInfo.isValidEvent ? 
        <div className="img-container" style={{}}>
          <div style={{float: 'right', width: '50%', marginRight: '2.5rem'}}>
            <div className="center-content event-info" style={{float: 'left', color: 'white'}}>
              <h1 style={{fontWeight: 'bold', fontSize: '2rem', margin: '0px 0px 0px 5px'}}>{eventInfo.eventName}</h1>
              <TimeInfo eventInfo={eventInfo} />
              <PlaceInfo eventInfo={eventInfo}/>
              <div style={{color: 'white', float: 'right'}}>
              <p>
                Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian
              </p>
            </div>
            </div>
          </div>
          <div className="flyer-container center-content" style={{}}>
            <Image
                        className="flyer"
                        src="/flyer-default.jpg"
                        alt={eventInfo.eventName}
                        height={798}
                        width={504}
                        priority={true}
                        style={{border: '5px solid white'}}
            />
            <div style={{color: 'white', float: 'right', width: '100%', textAlign: 'left', marginRight: '20px', paddingLeft: '20px'}}>
              <p>
              pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum. 
              </p>
            </div>
          </div>
        </div>
        :
        <div>
          <p>event not found</p>
        </div>
      }
    </div>
  )
}

export default Event;