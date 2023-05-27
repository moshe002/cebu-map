import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import ImageMapper from 'react-img-mapper'; // npm package for react image mapper (https://www.npmjs.com/package/react-img-mapper?activeTab=readme)

import CebuMap from '/assets/map.jpg';
import MAP_LOCATIONS from './map-locations.json';

import Legend from './components/legend';
import BottomComponents from './components/bottom-components';

/* 
  - not responsive
  - point system must be corrected (points buttons should only be clicked once)
  - better visualization of selected areas (color coded fill color)
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
  const [province, setProvince] = useState(); // gets the area id (province name) on click
  const [userPoints, setUserPoints] = useState(0);
  const [showProvince, setShowProvince] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [provinceName, setProvinceName] = useState(); // gets the area id (province name) on hover
  const [isClicked, setIsClicked] = useState(true);
  //const [fillColor, setFillColor] = useState('transparent');

  // handles on click
  const handleClick = (area) => {
    console.log('area id: ' + area.id);
    setShowDetails(true);
    setProvince(area.id);
    setIsClicked(false);
   // setFillColor(area.fillColor);
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
  };

  const reset = () => {
    setUserPoints(0);
    setShowDetails(false);
    //window.location.reload();
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

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      className='relative border-2 w-full h-full overflow-auto'>
      <Legend />
        <ImageMapper 
          onClick={handleClick}
          src={mapURL} 
          map={CEBU_MAP} 
          onMouseMove={handleMouseMove}
          onMouseEnter={displayName}
          onMouseLeave={removeName}
          active={true}
          stayHighlighted={true}
          stayMultiHighlighted={true}
          toggleHighlighted={true}
          responsive={true}
          parentWidth={window.innerWidth}
          natural={true}
          lineWidth={1.5}
          height={500}
          width={500}
          //fillColor={fillColor}
        />      
      {
        showDetails 
        && 
          <div className='flex flex-col items-center gap-1 absolute top-1/3 left-28 p-5 rounded-md bg-white font-sans z-50 shadow-2xl'>
            <h1 className='text-xl font-semibold'>{province}</h1>
              <br />
            <div className='flex flex-col gap-5'>
              <button 
                className='bg-red-400 p-3 rounded-md cursor-pointer' 
                onClick={() => {
                  setUserPoints(prev => prev + 3);
                  //setStrokeColor('rgb(252 165 165)');
                  // rgb(252 165 165)
                  if(!isClicked) setIsClicked(true);
                  setShowDetails(false);
                  //setFillColor('rgb(252 165 165)');
                }} 
                disabled={isClicked}
                title='3 points' 
                id='1'>Stayed/Slept there</button>
              <button 
                className='bg-blue-300 p-3 rounded-md cursor-pointer' 
                onClick={() => {
                  setUserPoints(prev => prev + 5);
                  //setStrokeColor('rgb(147 197 253)');
                  // rgb(147 197 253)
                  if(!isClicked) setIsClicked(true);
                  setShowDetails(false);
                  //setFillColor('rgb(147 197 253)');
                }} 
                disabled={isClicked}
                title='5 points' 
                id='2'>Lived there</button>
              <button 
                className='bg-green-300 p-3 rounded-md cursor-pointer' 
                onClick={() => {
                  setUserPoints(prev => prev + 2);
                  //setStrokeColor('rgb(134 239 172)');
                  // rgb(134 239 172)
                  if(!isClicked) setIsClicked(true);
                  setShowDetails(false);
                  //setFillColor('rgb(134 239 172)');
                }} 
                disabled={isClicked}
                title='1 points' 
                id='3'>Visited there</button>
              <button 
                className='bg-gray-300 p-3 rounded-md cursor-pointer' 
                onClick={() => {
                  setUserPoints(prev => prev + 0);
                  //setStrokeColor('rgb(209 213 219)');
                  // rgb(209 213 219)
                  if(!isClicked) setIsClicked(true);
                  setShowDetails(false);
                  //setFillColor('rgb(209 213 219)');
                }} 
                disabled={isClicked}
                title='0 points' 
                id='4'>Haven't Visited</button>
            </div>
              <br />
            <h2>Points: {userPoints}</h2>
              <br />
            <button 
              className='bg-black text-white p-3 rounded-md cursor-pointer'
              onClick={reset}>Reset</button>
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
      <BottomComponents userPoints={userPoints} exportImage={exportImage} />
    </div>
  )
};

export default Map;