"use client"
import React from 'react'
import Jumbotron from '@/components/Jumbotron';
import CreateMission from "./CreateMission"

import { data } from "@/components/FakeDatas";
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';

const columns = [
    {
        name: "Titre",
        selector: row => row.title,
        sortable: true
    },
    {
        name: "Pays",
        selector: row => row.country
    },
    {
        name: "Ville",
        selector: row => row.city
    },
    {
        name: "Action",
        selector: row => row.action
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
const Liste = () => {
  return (
    <div className='font-primary'>
        <Jumbotron icon='/assets/images/add-files.png' title='Gestion des Missions'/>

        <div className='flex gap-4 flex-col md:flex-row p-2 mt-5'>
            <div className="w-full lg:w-2/3 bg-white font-primary">
                {/* <p className='p-2 text-gray-500'>Ici sront affichées les différentes missions enregistrées</p> */}
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

            {/* NewMission */}
            <CreateMission />
        </div>
    </div>
  )
}

export default Liste