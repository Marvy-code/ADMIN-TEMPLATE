"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Jumbotron from '@/components/Jumbotron'
import ProtectedRoute from "@/components/ProtectedRoute";
import { formatDate } from '../../utilitaires/formatDate';

import axiosInstance from '../../../utils/axios'
import { LiaEyeSlashSolid } from 'react-icons/lia'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { IoTrashBin } from 'react-icons/io5'
import { HiAdjustments } from 'react-icons/hi';

const ListOdm = () => {

    const columns = [
        {
            name: "Nom du participant",
            selector: row => row.Nom_prenom_participant,
            sortable: true,
            cell: row=>(
                <span className='text-gray-800 font-semibold'>{row.Nom_prenom_participant}</span>
            )
        },
        {
            name: "Départ",
            selector: row => row.Date_depart,
            cell:row=>(
                <span className='capitalize'>{formatDate(row.Date_depart)}</span>
            )
        },
        {
            name: "Retour",
            selector: row => row.Date_retour,
            cell:row=>(
                <span className='capitalize'>{formatDate(row.Date_retour)}</span>
            )
        },
        {
            name: "Statut",
            selector: row => row.Statut_ODM,
            cell: row => (
                <span className='bg-green-700 text-white p-0.5 rounded-xl' >{row.Statut_ODM}</span>
            )
        },
        {
            name: "Action",
            cell:(row)=>(
                <div>
                    <button type='button' className="bg-blue-400 text-white p-2 rounded-full mr-1" onClick={() => handleAction(row)}><LiaEyeSlashSolid /></button>
                    <button type='button' className="bg-yellow-300 text-white p-2 rounded-full mr-1"><HiMiniPencilSquare /></button>
                    <button type='button' className="bg-green-700 text-white p-2 rounded-full mr-1"><HiAdjustments /></button>
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

    useEffect(()=>{
        getOdmsData()
    }, [])

    const [odmList, setOdmList] = useState([])
    const getOdmsData = () =>{
        axiosInstance.get("ordremission/GetAll")
        .then(res=>{
            setOdmList(res.data)
        })
    }

  return (
    <ProtectedRoute>
        <div className='font-primary'>
            <Jumbotron icon='/assets/images/lines.png' title='Gestion des ODM'/>

            <div className='flex gap-4 flex-col md:flex-row p-2 mt-5'>
                <div className="w-full bg-white font-primary">
                    <div className='flex flex-col md:flex-row p-2'>
                        <h4 className='font-bold w-full lg:w-1/3'>Total des ODM: {odmList.length}</h4>
                        <input type="text" className='w-full lg:w-2/3 outline-none rounded-full text-input' placeholder='Effectuez une recherche rapide des données ici...'/>
                    </div>
                    <DataTable 
                        columns={columns} 
                        data={odmList} 
                        customStyles={customStyles}
                        pagination
                    />
                </div>
            </div>
        </div>
    </ProtectedRoute>
  )
}

export default ListOdm