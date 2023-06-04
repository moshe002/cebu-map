import React from 'react'

function Details({ 
    reset, 
    userPoints, 
    province, 
    setUserPoints, 
    setIsClicked, 
    isClicked, 
    setShowDetails, 
    setStrokeColor 
}) 
{
  return (
    <>
        <div className='flex flex-col items-center gap-1 absolute top-1/3 left-28 p-5 rounded-md bg-white font-sans z-50 shadow-2xl'>
            <h1 className='text-xl font-semibold'>{province}</h1>
              <br />
            <div className='flex flex-col gap-5'>
                <button 
                    className='bg-red-400 p-3 rounded-md cursor-pointer' 
                    onClick={() => {
                        setUserPoints(prev => prev + 3);
                        // rgb(252 165 165)
                        if(!isClicked) setIsClicked(true);
                        setShowDetails(false);
                        setStrokeColor('rgb(252 165 165)');
                    }} 
                    value={3}
                    disabled={isClicked}
                    title='3 points' 
                    id='1'>Stayed/Slept there
                </button>
                <button 
                    className='bg-blue-300 p-3 rounded-md cursor-pointer' 
                    onClick={() => {
                        setUserPoints(prev => prev + 5);
                        // rgb(147 197 253)
                        if(!isClicked) setIsClicked(true);
                        setShowDetails(false);
                        setStrokeColor('rgb(147 197 253)');
                    }} 
                    value={5}
                    disabled={isClicked}
                    title='5 points' 
                    id='2'>Lived there
                </button>
                <button 
                    className='bg-green-300 p-3 rounded-md cursor-pointer' 
                    onClick={() => {
                        setUserPoints(prev => prev + 2);
                        // rgb(134 239 172)
                        if(!isClicked) setIsClicked(true);
                        setShowDetails(false);
                        setStrokeColor('rgb(134 239 172)');
                    }} 
                    value={2}
                    disabled={isClicked}
                    title='1 points' 
                    id='3'>Visited there
                </button>
                <button 
                    className='bg-gray-300 p-3 rounded-md cursor-pointer' 
                    onClick={() => {
                        setUserPoints(prev => prev + 0);
                        // rgb(209 213 219)
                        if(!isClicked) setIsClicked(true);
                        setShowDetails(false);
                        setStrokeColor('rgb(209 213 219)');
                    }} 
                    value={0}
                    disabled={isClicked}
                    title='0 points' 
                    id='4'>Want to visit
                </button>
            </div>
              <br />
            <h2>Points: {userPoints}</h2>
              <br />
            <button 
              className='bg-black text-white p-3 rounded-md cursor-pointer'
              onClick={reset}>Reset
            </button>
        </div>
    </>
  )
}

export default Details;
