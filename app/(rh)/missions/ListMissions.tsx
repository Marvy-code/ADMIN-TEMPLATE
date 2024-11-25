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
    const [loading, setLoading] = useState(true); // Gestion du chargement
    const [error, setError] = useState(null); // Gestion des erreurs

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
            <button type='button' className="bg-blue-400 text-white p-2 rounded-full mr-1" onClick={() => handleAction(row.Id_mission)}><LiaEyeSlashSolid /></button>
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
        setLoading(true);

        try{
            await axiosInstance.get('mission/getall')
            .then(res=>{
                setData(res.data)

                console.log(res.data)
            })
        }catch(err){

        }
    }

    const handleAction = (id:any) => {
        alert(`Action pour la ligne avec ID : ${id}`);
      };

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
                    />
                </div>
                <CreateMission />
            </div>
        </div>
    </ProtectedRoute>
  )
}

export default Liste