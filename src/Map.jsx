import React, { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import ImageMapper from 'react-img-mapper'; // npm package for react image mapper (https://www.npmjs.com/package/react-img-mapper?activeTab=readme)

import CebuMap from '/assets/map.jpg';
import MAP_LOCATIONS from './map-locations.json';

import Legend from './components/legend';
import BottomComponents from './components/bottom-components';
import Details from './components/details';

/* 
  - not responsive
  - point system must be corrected (points buttons should only be clicked once, WONT STACK)
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // gets the mouse position inside the mapper
  const [provinceName, setProvinceName] = useState(); // gets the area id (province name) on hover
  const [isClicked, setIsClicked] = useState(true);
  const [strokeColor, setStrokeColor] = useState('');
  const [parentWidth, setParentWidth] = useState(window.innerWidth);

  // updates the window.innerWidth and parent width of the imagemapper
  useEffect(() => {
    const handleResize = () => {
      setParentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  // handles on click
  const handleClick = (area, event, areas) => {
    console.log('area id: ' + area.id);
    setShowDetails(true);
    setProvince(area.id);
    setIsClicked(false);
    // area.strokeColor = strokeColor;
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

  const removeDetails = () => {
    setShowDetails(false);
    console.clear()
  }

  const reset = () => {
    setUserPoints(0);
    setShowDetails(false);
    //window.location.reload();
    console.clear()
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
          onClick={event => handleClick(event)} // idk if this works
          src={mapURL} 
          map={CEBU_MAP} 
          onMouseMove={handleMouseMove}
          onMouseEnter={displayName}
          onMouseLeave={removeName}
          onImageClick={removeDetails}
          active={true}
          stayHighlighted={true}
          stayMultiHighlighted={true}
          toggleHighlighted={true}
          responsive={true}
          parentWidth={parentWidth}
          natural={true}
          lineWidth={1.5}
          height={500}
          width={500}
          imgWidth={1500}
          //strokeColor={strokeColor}
          //fillColor={fillColor} //this does not work for it changes all of the fillColor for the areas
        />      
      {
        showDetails 
        && 
        <Details 
          province={province}
          userPoints={userPoints}
          setUserPoints={setUserPoints}   
          setIsClicked={setIsClicked}
          setShowDetails={setShowDetails}
          setStrokeColor={setStrokeColor}
          isClicked={isClicked}
          reset={reset}
        />
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