import React from 'react';
import Image from "next/image";

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
              <p style={{fontWeight: 'bold', fontSize: '2.1rem'}}>{eventInfo.eventName}</p>
              <div style={{marginLeft: '10px', cursor: 'pointer'}}>
                <p>{eventInfo.location}</p>
                <p>{eventInfo.address}</p>
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
          </div>
        </div>
        :
        <div>
          <p>event not found</p>
        </div>
      }
      <div>{JSON.stringify(eventInfo)}</div>
    </div>
  )
}

export default Event;