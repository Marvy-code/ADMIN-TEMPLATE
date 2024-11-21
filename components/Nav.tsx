import Image from 'next/image'
import React from 'react'

const Nav = () => {
  return (
    <div className='flex items-center justify-between p-3 bg-[#769C38] shadow-inner'>
      {/* Search */}
      <div className='hidden md:flex'></div>

      {/*  */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
          <Image src={'/assets/images/messages.png'} alt='ARPCE' width={20} height={20} />
        </div>

        <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
          <Image src={'/assets/images/megaphone.png'} alt='ARPCE' width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-[#B2241B] text-white rounded-full text-xs">1</div>
        </div>

        <div className="flex flex-col">
          <span className='text-xs leading-3 text-white font-semibold font-medium'>Marvy MOUANDA</span>
          <span className='text-[12px] text-white text-right'>Admin</span>
        </div>

        <Image src={'/assets/images/user.png'} alt='' width={25} height={25} className='rounded-full'/>
      </div>
    </div>
  )
}

export default Nav