import React from 'react'

const Loader = () => {
  return (
    <div className='items-center justify-center'>
        <span className="relative flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
        </span>
    </div>
  )
}

export default Loader