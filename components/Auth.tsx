'use client';
import Image from 'next/image'
import React from 'react'
import Head from 'next/head'
import { FaUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'

import { useState } from 'react';
import { useRouter } from 'next/router'

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [applicode, setAppliCode] = useState('DIGIODM')

    const [loader, setLoader] = useState(false)


    const [error, setError] = useState('');
    const router = useRouter();

    const handleAuht = async (e:any) =>{
        setLoader(true)
        e.preventDefault()
        setError("");

        try{
        const response = await fetch('api-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ Username:username, Password:password, Code_appli:applicode })
        })
        if (!response.ok) {
            if (response.status === 401) {
              setError("Identifiants incorrects. Veuillez réessayer.");
              setLoader(false)
            } else {
              setError(`Nom d\'utilisateur ou mot de passe incorrect`);
              setLoader(false)
            }
            return;
        }

        if(response.ok){
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // router.push('/missions');     
        }
        else{
            setError('Nom d\'utilisateur ou mot de passe incorrect');
            setLoader(false)
        }}catch(err){
            setError("Une erreur inattendue est survenue, réessayez svp");
            setLoader(false)
        }
    
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-green-50'>
        <Head>
            <title>AUTHENTIFICATION - MAYOMBE</title>
            <link rel="icon" href="/assets/images/logo_mayombe.png" />
        </Head>

        <main className='flex flex-col items-center justify-center w-full flex-1 sm:px-20 text-center'>
            <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5 p-5'>
                    <div className='text-left font-bold'>
                        <span className='text-[#B2241B] hidden sm:block uppercase'>Mayombe<span className='text-[#769C38]'> App</span></span>
                    </div>

                    <div className="py-10 ml-[7rem] sm:ml-[0rem]">
                        <div className='flex justify-center items-center'>
                            <Image src={'/assets/images/logo_mayombe.png'} className='hidden sm:block' width={100} height={100} alt='Logo ARPCE'/>
                        </div>
                        <h2 className='text-sm sm:text-xl font-bold text-[#769C38] mb-2 mt-4'>MAYOMBE APP</h2>
                        <div className='border-2 w-10 border-[#769C38] inline-block mb-5'></div>

                        <form onSubmit={handleAuht}>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <FaUser className='text-gray-400 mr-2'/> 
                                    <input type="text" name='username' placeholder='Ex: mmouanda' className='bg-gray-100 outline-none text-sm flex-1' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                </div>

                                <div className="bg-gray-100 w-64 p-2 flex items-center">
                                    <MdLockOutline className='text-gray-400 mr-2'/> 
                                    <input type="password" name='username' placeholder='Votre mot de passe' className='bg-gray-100 outline-none text-sm flex-1' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>

                                {!loader && (<button type='submit' className='border-2 border-[#769C38] mt-5 text-[#769C38] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#769C38] hover:text-white'>
                                    Se connecter
                                </button>)}

                                {loader && (<span className="relative flex h-5 w-5 mt-5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
                                </span>)}

                                {error && <p className='mt-3 text-red-800 font-semibold'>{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='w-2/5 bg-gradient-to-r from-[#769C38] to-[#B2241B] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 hidden sm:block'>
                    <h2 className='text-2xl font-bold mb-2'>Bienvenu,</h2>
                    <div className='border-2 w-10 border-white inline-block m-2'></div>
                    <p className='mb-2 text-[15px]'>Nous vous prions de vous connecter ...</p>

                    <div className="relative h-32  ...">
                        <div className="absolute inset-x-0 bottom-0 h-16 font-bold uppercase">Esace administrateur</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Auth