import React from 'react'
import Image from "next/image";
// import SidebarLeft from "./components/Sidebars/SidebarLeft";
import MainMenu from "../components/Menus/MainMenu";
import styles from "./gardenStyles.module.css";

const gardens = () => {
  return (
    <>
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
      <div className={`fade-in ${styles.aboutUs}`}>
        <div className={styles.about}>
          About Us
        </div>
      </div>
      <div className='main-menu-container'>
        <MainMenu currentPage='gardens'/>
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

export default gardens