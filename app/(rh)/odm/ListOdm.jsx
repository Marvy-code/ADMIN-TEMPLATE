"use client"
import React from 'react'
import DataTable from 'react-data-table-component'
import Jumbotron from '@/components/Jumbotron'
import { odm } from "@/components/FakeDatasOdm";

const columns = [
    {
        name: "Nom du participant",
        selector: row => row.participant,
        sortable: true
    },
    {
        name: "Départ",
        selector: row => row.depart
    },
    {
        name: "Retour",
        selector: row => row.retour
    },
    {
        name: "Nbre de jours",
        selector: row => row.joursMission
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

const ListOdm = () => {
  return (
    <div className='font-primary'>
        <Jumbotron icon='/assets/images/lines.png' title='Gestion des ODM'/>

        <div className='flex gap-4 flex-col md:flex-row p-2 mt-5'>
            <div className="w-full bg-white font-primary">
                <div className='flex flex-col md:flex-row p-2'>
                    <h4 className='font-bold w-full lg:w-1/3'>Total des ODM: {odm.length}</h4>
                    <input type="text" className='w-full lg:w-2/3 outline-none rounded-full text-input' placeholder='Effectuez une recherche rapide des données ici...'/>
                </div>
                <DataTable 
                    columns={columns} 
                    data={odm} 
                    customStyles={customStyles}
                    pagination
                />
            </div>
        </div>
    </div>
  )
}

export default ListOdm