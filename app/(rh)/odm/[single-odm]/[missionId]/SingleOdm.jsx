'use client'
import React, { useEffect, useState } from 'react'
import Jumbotron from '@/components/Jumbotron';
import Link from 'next/link';
import NewOdm from "../../CreateOdm"

import { useParams } from 'next/navigation';


import ProtectedRoute from "@/components/ProtectedRoute";
import axiosInstance from '@/utils/axios';

const SingleOdm = () => {

    const params = useParams();
    const { 'single-odm': singleOdm, missionId } = params;

    const [missionById, setMissionById] = useState([])

    const getMissionById = () => {
        try {
            axiosInstance.get(`mission/getbyid/${singleOdm}`)
                .then(res => {
                    setMissionById(res.data)
                })
        }
        catch {
            console.log("Erreur de connexion")
        }
    }

    useEffect(() => {
        getMissionById()
    }, [])


    return (
        <ProtectedRoute>
            <div className='font-primary'>
                <Jumbotron icon='/assets/images/lines.png' title='Enregistrement des odm' />
                <div className='flex flex-col gap-4 md:flex-row p-2 mt-5'>
                    <div className='w-full lg:w-1.5/3 bg-white'>
                        <div className='p-4'>
                            <NewOdm idMission={singleOdm}/>
                        </div>
                    </div>

                    <div className='w-full lg:w-1.5/3 bg-white'>
                        {missionById && missionById.length > 0 ? (
                            <div>
                                <div className='rounded-2xl shadow-2xl'>
                                    <h3 className='text-gray-500 float-right p-2'>Informations de la mission pour laquelle l'ODM est créé</h3> <br />

                                    <div className='p-4 border-t md:mt-5 mt-8'>
                                        <p className='flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                                            </svg>

                                            <span className='text-red-500'>Objet de la mission:</span>
                                        </p>
                                        <p><span className=''>{missionById[0].Objet_mission}</span></p>
                                    </div>

                                    <div className='flex flex-col gap-4 md:flex-row p-4'>
                                        <div className='w-full lg:w-1/3'>
                                            <p className='flex'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                                </svg>
                                                &nbsp;<span className='text-red-500'>Continent de la mission:</span>
                                            </p>
                                            <p>{missionById[0].Continent_mission}</p>
                                        </div>

                                        <div className='w-full lg:w-1/3'>
                                            <p className=' flex'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                                                </svg>
                                                &nbsp;<span className='text-red-500'>Pays de la mission</span>:</p>
                                            <p>{missionById[0].Pays_mission}</p>
                                        </div>

                                        <div className='w-full lg:w-1/3'>
                                            <p className='flex'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                                </svg>

                                                &nbsp;<span className='text-red-500'>Ville de la mission:</span>
                                            </p>
                                            <p>{missionById[0].Ville_mission}</p>
                                        </div>
                                    </div>

                                    <div className='w-full p-4'>
                                        <p className=' flex'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                            </svg>

                                            &nbsp;<span className='text-red-500'>Description de la mission:</span></p>
                                        <p>{missionById[0].Description_mission}</p>
                                    </div>

                                    {/* Card Footer */}

                                    <div className='p-4 border-t md:mt-5 mt-8'>
                                        <p className='font-bold'>2 ODM ont été retrouvés pour cette mission <span className='float-end text-blue-700 flex'><Link href={`/missions/${singleOdm}/${missionId}`}>Consulter les ODM</Link></span></p>
                                    </div>

                                    <div className='bg-gradient-to-r  from-[#B2241B] to-[#769C38] p-1'></div>
                                </div>
                            </div>
                        ) : ""}

                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default SingleOdm