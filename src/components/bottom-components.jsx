import React from 'react'

function BottomComponents({ userPoints, exportImage }) {
  return (
    <>
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
    </>
  )
}

export default BottomComponents