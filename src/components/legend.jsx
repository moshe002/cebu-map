import React from 'react'

function Legend() {
  return (
    <>
        <div className='flex flex-row items-center p-3 gap-1 absolute top-28 left-12 w-1/4 h-80 rounded-md bg-white z-50 shadow-2xl'>
            <div className='flex flex-col gap-1 w-1/3'>
                <div className='flex justify-center text-xs text-center p-5 bg-red-300 rounded-md'>3 points</div>
                <div className='flex justify-center text-xs text-center p-5 bg-blue-300 rounded-md'>5 points</div>
                <div className='flex justify-center text-xs text-center p-5 bg-green-300 rounded-md'>2 points</div>
                <div className='flex justify-center text-xs text-center p-5 bg-gray-300 rounded-md'>0 points</div>
            </div>
            <div className='flex flex-col text-center font-semibold text-lg w-full gap-10'>
                <h1>Stayed/Slept there</h1>
                <h1>Lived there</h1>
                <h1>Visited there</h1>
                <h1>Haven't visited</h1>
            </div>
        </div>
  </>
  )
}

export default Legend;