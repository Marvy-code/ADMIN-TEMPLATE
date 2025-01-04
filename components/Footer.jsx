import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className='mt-10'></div>
      <footer className="w-full bg-gray-300 text-black font-bold  py-4 px-6 fixed bottom-0">
        <div className="">
          <a href='https://www.marvy-mouanda.tech' target='_blank'>© {new Date().getFullYear()} Marvycode</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer