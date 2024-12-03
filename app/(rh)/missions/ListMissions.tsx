"use client"
import { useUser } from '../../context/UserContext';

import React, { useEffect, useState } from 'react'
import Jumbotron from '@/components/Jumbotron';
import CreateMission from "./CreateMission"
import axiosInstance from '../../../utils/axios';

// import { data } from "@/components/FakeDatas";
import DataTable from 'react-data-table-component';

import ProtectedRoute from "@/components/ProtectedRoute";
import { LiaEyeSlashSolid } from 'react-icons/lia';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { IoTrashBin } from 'react-icons/io5';
import Link from 'next/link';


const Liste = () => {
    const { user } = useUser();

    const [data, setData] = useState([]); // Stocke les données récupérées
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState({
        Continent_mission: "",
        Date_creation: "",
        Description_mission: "",
        Id_mission: "",
        Objet_mission: "",
        Pays_mission: "",
        Ville_mission: "",
        Cree_par: ""
    })

    const columns = [
        {
            name: "Objet de la mission",
            selector: (row:any) => row.Objet_mission,
            sortable: true,
            cell: (row:any)=>(
                <Link href={`/odm/${row.Id_mission}/${row.Objet_mission}`} className='text-blue-900 font-semibold text-sm'>{row.Objet_mission}</Link>
            )
        },
        {
            name: "Ville/Pays",
            selector: (row:any) => row.Ville_mission,
            cell:(row:any)=>(
                <span>{row.Ville_mission}/ {row.Pays_mission}</span>
            )
        },
        {
            name: "Action",
            cell:(row:any)=>(
                <div>
                    <button type='button' className="bg-blue-400 text-white p-2 rounded-full mr-1" onClick={() => handleAction(row)}><LiaEyeSlashSolid /></button>
                    <button type='button' className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
                    <button type='button' className="bg-red-950 text-white p-2 rounded-full"><IoTrashBin /></button>
                </div>
            )
        }
    ]
    
    const customStyles = {
        headCells:{
            style:{
                backgroundColor: "#769C38",
                color: "white",
                fontSize: "17px",
                fontWeight: "bolder"
            }
        }
    }

    const fetchData = async () =>{
        try{
            await axiosInstance.get('mission/getall')
            .then(res=>{
                setData(res.data)
                
            })
        }catch(err){

        }
    }

    const handleAction = (row:any) => {
        setSelectedRow(row)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
        setSelectedRow({
            Continent_mission: "",
            Date_creation: "",
            Description_mission: "",
            Id_mission: "",
            Objet_mission: "",
            Pays_mission: "",
            Ville_mission: "",
            Cree_par: ""
        });
    }

    useEffect(()=>{
        fetchData()
    }, [])

  return (
    <ProtectedRoute>
        <div className='font-primary'>
            <Jumbotron icon='/assets/images/add-files.png' title='Gestion des Missions'/>

            <div className='flex gap-4 flex-col md:flex-row p-2 mt-5'>
                <div className="w-full lg:w-2/3 bg-white font-primary">
                    <div className='flex flex-col md:flex-row p-2'>
                        <h4 className='font-bold w-full lg:w-1/3'>Total des missions: {data.length}</h4>
                        <input type="text" className='w-full lg:w-2/3 outline-none rounded-full text-input' placeholder='Effectuez une recherche rapide des données ici...'/>
                    </div>
                    <DataTable 
                        columns={columns} 
                        data={data} 
                        customStyles={customStyles}
                        pagination
                        highlightOnHover
                    />
                </div>

                {modalOpen && (
                    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                        <div
                            className={`bg-white p-6 rounded-lg shadow-lg w-full lg:w-2/3 transform transition-transform duration-300 ease-in-out ${
                            modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                            }`}
                            onClick={(e) => e.stopPropagation()} // Empêcher la propagation pour ne pas fermer le modal en cliquant à l'intérieur
                        >
                            {selectedRow && (
                                <div>
                                    <div className="flex justify-between bg-gray-300 items-center px-6 py-4 border-b">
                                        <h3 className='uppercase'>Détails de la mission: <span className='font-bold text-green-700'>{selectedRow.Objet_mission}</span></h3>
                                    </div>

                                    <div className="p-6">
                                        <div className="text-gray-700 flex items-center w-full md:flex-row flex-col">
                                            <div className="w-full md:w-1/3">
                                                <p className='flex items-center gap-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                                                    </svg>
                                                    Continent: <strong>{selectedRow.Continent_mission}</strong>
                                                </p>
                                            </div>
                                            <div className="w-full md:w-1/3">  
                                                <p className='flex items-center gap-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                                    </svg>
                                                    Pays: <strong>{selectedRow.Pays_mission}</strong>
                                                </p>
                                            </div>
                                            <div className="w-full md:w-1/3">
                                                <p className='flex items-center gap-1'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
                                                    </svg>
                                                    Ville: <strong>{selectedRow.Ville_mission}</strong>
                                                </p>
                                            </div>
                                        </div>
                                        <p className='mt-4 justify-normal flex items-center gap-1 text-gray-700'>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25.22-.22a.75.75 0 0 1 1.28.53v6.441c0 .472.214.934.64 1.137a3.75 3.75 0 0 0 4.994-1.77c.205-.428-.152-.868-.627-.868h-.507m-6-2.25h7.5M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                            </svg> */}
                                            {selectedRow.Description_mission}
                                        </p>

                                        <p className='mt-10 justify-normal text-gray-400 float-righ'>
                                            <span className='float-end flex items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>
                                                Cette mission a été créée le {selectedRow.Date_creation}, par {selectedRow.Cree_par}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex justify-end gap-2 px-6 py-4 border-t">
                                        <button
                                            onClick={closeModal}
                                            className="mt-4 bg-[#B2241B] text-white px-4 py-2 rounded float-end"
                                            >
                                            Fermer
                                        </button>
                                    </div>
                                </div>  
                            )}
                        </div>
                    </div>
                )}
                <CreateMission />
            </div>
        </div>
    </ProtectedRoute>
  )
}

export default Liste