import React, { useState, useEffect } from 'react';
import ImageMapper from 'react-img-mapper'; // npm package for react image mapper (https://www.npmjs.com/package/react-img-mapper?activeTab=readme)

import CebuMap from '/assets/map.jpg';
import MAP_LOCATIONS from './map-locations.json';

/* 
  - not responsive
  - point system must be corrected
  - better visualization of selected areas
*/

function Map() {

  // picture location
  const mapURL = CebuMap;

  // map areas data (object)
  const CEBU_MAP = {
    name: 'cebu-map',
    areas: MAP_LOCATIONS
  }
  // end of areas data


  const [showDetails, setShowDetails] = useState(false);
  const [province, setProvince] = useState();
  const [userPoints, setUserPoints] = useState(0);
  const [showProvince, setShowProvince] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [provinceName, setProvinceName] = useState();

  // handles on click
  const handleClick = (area) => {
    console.log('it works');
    console.log('area id: ' + area.id);
    setShowDetails(true);
    setProvince(area.id);
  };

  const handleOutsideClick = () => {
    setShowDetails(false);
  };

  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  const displayName = (area) => { //on hover
    //console.log(area.id);
    setShowProvince(true);
    setProvinceName(area.id)
  };

  const removeName = () => {
    setShowProvince(false);
  }
  /* 
    scoring mechanics: 
    each specific type of button has its own individual score
    nya dapat ma total ang final score
  */

  const handleOptions = (event) => {
    let btn_id = event.target.id; 
    if(btn_id === '1') {
      setUserPoints(prev => prev + 3);
      console.log(`user points: ${userPoints}`)
    } else if(btn_id === '2') {
      setUserPoints(prev => prev + 5);
      console.log(`user points: ${userPoints}`)
    } else if(btn_id === '3') {
      setUserPoints(prev => prev + 1);
      console.log(`user points: ${userPoints}`)
    } else if(btn_id === '4') {
      setUserPoints(prev => prev + 0);
      console.log(`user points: ${userPoints}`)
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ 
        position:'relative',
        alignItems: 'center',
        border: '1px solid black',
        maxWidth: 1104,
        maxHeight: 1100,
      }}>
      <ImageMapper 
        onClick={handleClick}
        onImageClick={handleOutsideClick} 
        src={mapURL} 
        map={CEBU_MAP} 
        onMouseEnter={displayName}
        onMouseLeave={removeName}
        stayHighlighted={true}
        stayMultiHighlighted={true}
        toggleHighlighted={true}
        responsive={true}
        parentWidth={window.innerWidth}
        natural={true}
        lineWidth={3}
        // height={window.innerHeight}
      />      
      {
        showDetails 
        && 
          <div style={{ 
            zIndex: 9999,
            position: 'absolute',
            top: 100,
            left: 25,
            border: '1px solid black',
            borderRadius: '4px',
            padding: '20px',
            backgroundColor: 'white',
          }}>
            <button onClick={handleOutsideClick} style={{ cursor: 'pointer' }}>&#x2716;</button>
            <h1>{province}</h1>
            <br />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
              <button style={{ cursor: 'pointer' }} onClick={handleOptions} title='3 points' id='1'>Stayed there</button>
              <button style={{ cursor: 'pointer' }} onClick={handleOptions} title='5 points' id='2'>Lived there</button>
              <button style={{ cursor: 'pointer' }} onClick={handleOptions} title='1 points' id='3'>Passed there</button>
              <button style={{ cursor: 'pointer' }} onClick={handleOptions} title='0 points' id='4'>Haven't Visited</button>
            </div>
            <h2>{userPoints}</h2>
          </div>
      }
      <div
        id='province_name' 
        style={{
          position: 'fixed',
          top: mousePos.y + 5,
          left: mousePos.x + 5,
          zIndex: 9999,
      }}>
          {
            showProvince 
            &&
            <h1>{provinceName}</h1>
          }
      </div>
    </div>
  )
};

export default Map;