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
            sortable: true
        },
        {
            name: "Continent",
            selector: (row:any) => row.Continent_mission
        },
        {
            name: "Pays",
            selector: (row:any) => row.Pays_mission
        },
        {
            name: "Ville",
            selector: (row:any) => row.Ville_mission
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
            // selector: (row:any) => row.action
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
                                            <div className="w-full md:w-1/3"><p>Continent: <strong>{selectedRow.Continent_mission}</strong></p></div>
                                            <div className="w-full md:w-1/3"><p>Pays: <strong>{selectedRow.Pays_mission}</strong></p></div>
                                            <div className="w-full md:w-1/3"><p>Ville: <strong>{selectedRow.Ville_mission}</strong></p></div>
                                        </div>
                                        <p className='mt-4 justify-normal text-gray-700'>Description: {selectedRow.Description_mission}</p>

                                        <p className='mt-10 justify-normal text-gray-400 float-righ'>
                                            <span className='float-end'>Cette mission a été créée le {selectedRow.Date_creation}, par {selectedRow.Cree_par}</span>
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