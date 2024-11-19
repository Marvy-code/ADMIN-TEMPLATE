import Image from 'next/image'
import React from 'react'

interface Props{
  icon: string,
  title: string
}


const jumbotron = ({icon, title}:Props) => {
  return (
    <div className='bg-gradient-to-r from-[#769C38] to-[#B2241B] text-white flex items-center rounded-lg p-2 gap-1 font-bold uppercase'>
      <Image src={`${icon}`} alt='' width={20} height={20} className='object-cover mix-blend-multiply' />
      <p>{title}</p>
    </div>
  )
}

export default jumbotron