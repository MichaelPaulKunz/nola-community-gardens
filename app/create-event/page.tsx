import React from 'react'
import Image from "next/image";
// import SidebarLeft from "./components/Sidebars/SidebarLeft";
import MainMenu from "../components/Menus/MainMenu";
import styles from "./createStyles.module.css";

const CreateEvent = () => {
  return (
    <>
    {/* <div className="vert-container">
      <div className="three-dee-vert">
        <SidebarLeft />
      </div>
    </div> */}
    <div className="center-body">
      <div className="img-container main-content">
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
      <div className={`fade-in ${styles.createEvent}`}>
        Create Event
      </div>
      <div className='main-menu-container'>
        <MainMenu currentPage='createEvent'/>
      </div>
      <div className="" style={{textAlign: 'center'}}>
        <br></br><br></br><br></br><br></br>
        <p className="fade-in">UNDER CONSTRUCTION</p>
      </div>
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>      
    </div>
    </>
  )
}

export default CreateEvent