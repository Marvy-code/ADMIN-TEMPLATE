import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-300 text-black font-bold  py-4 px-6 fixed bottom-0">
      <div className="">
        <span>© {new Date().getFullYear()} DSI - ARPCE</span>
      </div>
    </footer>
  )
}

export default Footer