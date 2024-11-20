"use client"
import React from 'react'
import Jumbotron from '@/components/Jumbotron';

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

const handleSubmit = async (e) => {
    e.preventDefault()
    Swal.fire({
        title: "Mission créée avec succès",
        text: "Souhaitez-vous enregistrer un ODM pour cette mission ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#769C38",
        cancelButtonColor: "#B2241B",
        confirmButtonText: "Oui, je veux",
        cancelButtonText: "Plus tard",
      }).then((result) => {
        if (result.isConfirmed) {
            redirect('/odm')
        }
      });
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
                    <input type="text" className='w-full lg:w-2/3 outline-none rounded-full' placeholder='Effectuez une recherche rapide des données ici'/>
                </div>
                <DataTable 
                    columns={columns} 
                    data={data} 
                    customStyles={customStyles}
                    pagination
                />
            </div>

            <div className="w-full lg:w-1/3 bg-white">
                <div className='p-2 max-w-3xl mx-auto'>
                    <h1 className='text-xl font-bold font-primary text-green-900'>Enregistrez une nouvelle mission</h1>
                    <p className='text-gray-400'>Veuillez remplir ce formulaire pour ajouter une nouvelle mission</p>
                    
                    <div>
                        <form className='form border-t flex flex-col gap-5 mt-4' onSubmit={handleSubmit}>
                            <div className='mt-4'>
                                <label htmlFor="objet" className='font-primary'>Objet de la mission</label>
                                <input type="text" id='objet' placeholder='Objet de la mission' className='outline-none'/>
                            </div>

                            <div className=''>
                                <label htmlFor="desc">Description de la mission</label>
                                <input type="text" id='desc' placeholder='Description de la mission' className='outline-none'/>
                            </div>

                            <div className=''>
                                <label htmlFor="continent">Continent de la mission</label>
                                <input type="text" id='continent' placeholder='Objet de la mission' className='outline-none'/>
                            </div>

                            <div className=''>
                                <label htmlFor="pays">Pays de la mission</label>
                                <input type="text" id='pays' placeholder='Pays de la mission' className='outline-none'/>
                            </div>

                            <div className=''>
                                <label htmlFor="ville">Ville de la mission</label>
                                <input type="text" id='ville' placeholder='Ville de la mission' className='outline-none'/>
                            </div>

                            <button className='bg-[#769C38] p-2 text-white font-bold hover:bg-green-900' type='submit'>Enregistrer</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Liste