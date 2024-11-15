import Image from 'next/image'
import React from 'react'
import Form from 'next/form'
import style from './Auth.module.css'
import Head from 'next/head'
import { FaUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'

const Auth = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
        <Head>
            <title>AUTHENTIFICATION</title>
            <link rel="icon" href="" />
        </Head>

        <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
            <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5 p-5'>
                    <div className='text-left font-bold'>
                        <span className='text-[#B2241B]'>Agence de Régulation des Postes <span className='text-[#769C38]'>et des Communications Electroniques</span></span>
                    </div>

                    <div className="py-10">
                        <div className='flex justify-center items-center'>
                            <Image src={'/assets/images/Logo_arpce.png'} width={200} height={200} alt='Logo ARPCE'/>
                        </div>
                        <h2 className='text-3xl font-bold text-[#769C38] mb-2'>Se connecter</h2>
                        <div className='border-2 w-10 border-[#769C38] inline-block mb-2'></div>

                        {/* <div className="flex"></div> */}
                        <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                <FaUser className='text-gray-400 mr-2'/> 
                                <input type="text" name='username' placeholder='Ex: mmouanda' className='bg-gray-100 outline-none text-sm flex-1'/>
                            </div>

                            <div className="bg-gray-100 w-64 p-2 flex items-center">
                                <MdLockOutline className='text-gray-400 mr-2'/> 
                                <input type="password" name='username' placeholder='Votre mot de passe ARPCE' className='bg-gray-100 outline-none text-sm flex-1'/>
                            </div>

                            <a href="#" className='border-2 border-[#769C38] mt-2 text-[#769C38] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#769C38] hover:text-white'>
                                Se connecter
                            </a>
                        </div>
                    </div>
                </div>
                <div className='w-2/5 bg-[#769C38] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                    <h2 className='text-3xl font-bold mb-2'>Bienvenu,</h2>
                    <div className='border-2 w-10 border-white inline-block m-2'></div>
                    <p className='mb-2 text-[18px]'>Nous sommes contents de vous revoir sur notre plateforme DIGI ODM. Veuillez renseigner vos identifiants pour accéder.</p>

                    {/* <p className='mt-[2rem]'>
                        Support Informatique: 1123
                    </p> */}
                </div>
            </div>
        </main>
    </div>
  )
}

export default Auth