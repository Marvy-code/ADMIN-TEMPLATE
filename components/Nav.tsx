'use client'
import Image from 'next/image'
import React from 'react'

import { redirect } from 'next/navigation';

import { useUser } from '../app/context/UserContext';

const Logout = () => {
  // Supprimer le token ou les informations d'authentification
  localStorage.removeItem('token');
  // Rediriger vers la page de connexion après la déconnexion
  redirect('/');
};

const Nav = () => {
  const { user } = useUser();
  return (
    <div className='flex items-center justify-between p-3 bg-[#769C38] shadow-inner'>
      {/* Search */}
      <div className='flex items-center'>
        <button className='bg-gradient-to-b from-[#B2241B] to-[#769C38] p-1 text-white rounded-xl w-35 flex items-center' type='button' onClick={Logout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          Déconnexion
        </button>
      </div>

      {/*  */}
      <div className='flex items-center gap-6 justify-end w-full'>
        <div className='bg-white rounded-full w-7 h-7 hidden md:flex  items-center justify-center cursor-pointer'>
          <Image src={'/assets/images/messages.png'} alt='ARPCE' width={20} height={20} />
        </div>

        <div className='bg-white rounded-full hidden md:flex w-7 h-7  items-center justify-center cursor-pointer relative'>
          <Image src={'/assets/images/megaphone.png'} alt='ARPCE' width={20} height={20} />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-[#B2241B] text-white rounded-full text-xs">1</div>
        </div>

        <div className="flex flex-col">
          <span className='text-xs leading-3 text-white font-medium'><span>{user?.Prenom}</span> <span className='uppercase'>{user?.Nom}</span></span>
          <span className='text-[12px] text-white text-right'>{user?.Email}</span>
        </div>

        <Image src={'/assets/images/user.png'} alt='' width={25} height={25} className='rounded-full'/>
      </div>
    </div>
  )
}

export default Nav