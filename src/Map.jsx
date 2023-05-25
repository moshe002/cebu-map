import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import ImageMapper from 'react-img-mapper'; // npm package for react image mapper (https://www.npmjs.com/package/react-img-mapper?activeTab=readme)

import CebuMap from '/assets/map.jpg';
import MAP_LOCATIONS from './map-locations.json';

/* 
  - not responsive
  - point system must be corrected (points buttons should only be clicked once)
  - better visualization of selected areas (color coded)
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

  const elementRef = useRef(null);

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

  const displayName = (area) => { // on hover
    //console.log(area.id);
    setShowProvince(true);
    setProvinceName(area.id)
  };

  const removeName = () => {
    setShowProvince(false);
  }

  const clearPoints = () => {
    setUserPoints(0)
  }

  // exports html to png (uses html-to-image library)
  const exportImage = () => {
      toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "my-cebu-map.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });  
    }
  /* 
    scoring mechanics: 
    each specific type of button has its own individual score
    nya dapat ma total ang final score
  */

  const handleOptions = (event) => {
    let btn_id = event.target.id; 
    if(btn_id === '1') {
      // stayed there
      setUserPoints(prev => prev + 3);
      console.log(`user points: ${userPoints}`)
      btn_id.disabled;
    } else if(btn_id === '2') {
      // lived there
      setUserPoints(prev => prev + 5);
      console.log(`user points: ${userPoints}`)
    } else if(btn_id === '3') {
      // visited there
      setUserPoints(prev => prev + 1);
      console.log(`user points: ${userPoints}`)
    } else if(btn_id === '4') {
      // 
      setUserPoints(prev => prev + 0);
      console.log(`user points: ${userPoints}`)
    }
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      className='relative items-center border-2 w-full h-full'>
        {/* legend */}
        <div className='flex flex-row items-center p-3 gap-1 absolute top-28 left-12 w-1/4 h-60 rounded-md bg-white z-50 shadow-2xl'>
          <div className='flex flex-col gap-1 w-1/3'>
            <div className='p-5 bg-red-300 rounded-md'></div>
            <div className='p-5 bg-blue-300 rounded-md'></div>
            <div className='p-5 bg-green-300 rounded-md'></div>
            <div className='p-5 bg-gray-300 rounded-md'></div>
          </div>
          <div className='flex flex-col text-center font-semibold text-xl w-full gap-4'>
            <h1>Stayed/Slept there</h1>
            <h1>Lived there</h1>
            <h1>Visited there</h1>
            <h1>Haven't visited</h1>
          </div>
        </div>
        {/* end of legend */}
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
        height={500}
        width={500}
      />      
      {
        showDetails 
        && 
          <div
            className='flex flex-col items-center gap-1 absolute top-96 left-32 p-5 rounded-md bg-white font-sans z-50 shadow-2xl'>
            <button onClick={handleOutsideClick} className='cursor-pointer'>&#x2716;</button>
              <br />
            <h1 className='text-xl font-semibold'>{province}</h1>
              <br />
            <div 
              className='flex flex-col gap-5'>
              <button className='bg-red-400 p-3 rounded-md cursor-pointer' onClick={handleOptions} title='3 points' id='1'>Stayed/Slept there</button>
              <button className='bg-blue-300 p-3 rounded-md cursor-pointer' onClick={handleOptions} title='5 points' id='2'>Lived there</button>
              <button className='bg-green-300 p-3 rounded-md cursor-pointer' onClick={handleOptions} title='1 points' id='3'>Visited there</button>
              <button className='bg-gray-300 p-3 rounded-md cursor-pointer' onClick={handleOptions} title='0 points' id='4'>Haven't Visited</button>
            </div>
              <br />
            <h2>Points: {userPoints}</h2>
              <br />
            <button 
              className='bg-black text-white p-3 rounded-md cursor-pointer'
              onClick={clearPoints}>Clear points</button>
          </div>
      }
      {
        showProvince 
        &&
        <h1 
          className='fixed text-2xl font-semibold z-50 font-sans'
          id='province_name' 
          style={{
            top: mousePos.y + 15,
            left: mousePos.x + 15,
          }}>
          {provinceName}
        </h1>
      }
      <div className='flex flex-col justify-center gap-5 absolute top-3/4 right-40 z-50'>
        <h1 className='text-3xl font-bold font-sans'>
          Total Points: {userPoints}
        </h1>
        <button 
          className='text-black text-lg font-semibold rounded-md bg-white w-auto h-14 cursor-pointer hover:shadow-xl duration-150' 
          type='button' 
          onClick={exportImage}>
            Save Image
        </button>
      </div>
    </div>
  )
};

export default Map;