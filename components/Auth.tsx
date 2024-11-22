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


    const [error, setError] = useState('');
    const router = useRouter();

    const handleAuht = async (e:any) =>{
        e.preventDefault()
        setError("");

        try{
        const response = await fetch('https://bzv-test-appli:8000/api/home/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ Username:username, Password:password, Code_appli:applicode })
        })
        if (!response.ok) {
            if (response.status === 401) {
              // Identifiants incorrects
              setError("Identifiants incorrects. Veuillez réessayer.");
            } else {
              // Autres erreurs
              setError(`Nom d\'utilisateur ou mot de passe incorrect`);
            }
            return;
        }

        if(response.ok){
            const data = await response.json();
            // Sauvegarder le token dans localStorage ou cookies
            localStorage.setItem('token', data.token);
            // Rediriger vers une page protégée
            router.push('/missions');
            
        }
        else{
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        }}catch(err){
            setError("Une erreur est survenue. Veuillez vérifier vos identifiants et réessayer.");
        }
    
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-green-50'>
        <Head>
            <title>AUTHENTIFICATION</title>
            <link rel="icon" href="" />
        </Head>

        <main className='flex flex-col items-center justify-center w-full flex-1 sm:px-20 text-center'>
            <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5 p-5'>
                    <div className='text-left font-bold'>
                        <span className='text-[#B2241B] hidden sm:block'>Agence de Régulation des Postes <span className='text-[#769C38]'>et des Communications Electroniques</span></span>
                    </div>

                    <div className="py-10 ml-[7rem] sm:ml-[0rem]">
                        <div className='flex justify-center items-center'>
                            <Image src={'/assets/images/Logo_arpce.png'} className='hidden sm:block' width={200} height={200} alt='Logo ARPCE'/>
                        </div>
                        <h2 className='text-sm sm:text-3xl font-bold text-[#769C38] mb-2 mt-4'>DIGI ODM</h2>
                        <div className='border-2 w-10 border-[#769C38] inline-block mb-5'></div>

                        <form onSubmit={handleAuht}>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <FaUser className='text-gray-400 mr-2'/> 
                                    <input type="text" name='username' placeholder='Ex: mmouanda' className='bg-gray-100 outline-none text-sm flex-1' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                </div>

                                <div className="bg-gray-100 w-64 p-2 flex items-center">
                                    <MdLockOutline className='text-gray-400 mr-2'/> 
                                    <input type="password" name='username' placeholder='Votre mot de passe ARPCE' className='bg-gray-100 outline-none text-sm flex-1' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>

                                <button type='submit' className='border-2 border-[#769C38] mt-5 text-[#769C38] rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#769C38] hover:text-white'>
                                    Se connecter
                                </button>

                                {error && <p className='mt-3 text-red-800 font-semibold'>{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='w-2/5 bg-gradient-to-r from-[#769C38] to-[#B2241B] text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 hidden sm:block'>
                    <h2 className='text-3xl font-bold mb-2'>Bienvenu,</h2>
                    <div className='border-2 w-10 border-white inline-block m-2'></div>
                    <p className='mb-2 text-[18px]'>
                        <span className='font-bold'>DIGI ODM App</span> est une application de Gestion des Ordres de Missions à l'ARPCE. <br />
                        <span className=''>Digitaliser pour mieux Gérer</span>
                    </p>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Auth