import React from 'react'
import Image from "next/image";
import MainMenu from "../components/Menus/MainMenu";
import styles from "./mapStyles.module.css";
const map = () => {
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
      <div className={styles.mapContainer}>
        <iframe
          id="resourceMap"
          title="Resource Map"
          width="100%"
          height="100px"
          className={`center-content calendar-border ${styles.map}`}
          src={`
          https://www.google.com/maps/d/embed?mid=1kaYI_k_P4pyR_dOxK46fCcEYso2JrV8&g_ep=CAESBzI0LjQ3LjQYACDdYipsLDk0MjQyNjE2LDk0MjIzMjk5LDk0MjE2NDEzLDk0MjEyNDk2LDk0MjA3Mzk0LDk0MjA3NTA2LDk0MjA4NTA2LDk0MjE3NTIzLDk0MjE4NjUzLDk0MjI5ODM5LDQ3MDg0MzkzLDk0MjEzMjAwQgJVUw%3D%3D&shorturl=1&ll=29.957050321531547%2C-90.0452639579093&z=13
          `}>
        </iframe>
      </div>    
      <div className='main-menu-container'>
        <MainMenu currentPage='map'/>
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

export default map
