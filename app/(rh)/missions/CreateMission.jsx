import React, { useState } from 'react'
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import axiosInstance from '../../../utils/axios';
import { useUser } from '../../context/UserContext';

// const handleSubmit = async (e) => {
//     e.preventDefault()
//     // Swal.fire({
//     //     title: "Mission créée avec succès",
//     //     text: "Souhaitez-vous enregistrer un ODM pour cette mission ?",
//     //     icon: "info",
//     //     showCancelButton: true,
//     //     confirmButtonColor: "#769C38",
//     //     cancelButtonColor: "#B2241B",
//     //     confirmButtonText: "Oui, je veux",
//     //     cancelButtonText: "Plus tard",
//     //   }).then((result) => {
//     //     if (result.isConfirmed) {
//     //         redirect('/odm/single-odm/')
//     //     }
//     //   });
// }


const CreateMission = () => {
    const { user } = useUser();
    const {
        register, // Pour enregistrer les champs
        handleSubmit, // Pour gérer la soumission
        formState: { errors, isSubmitting }, // Pour gérer les erreurs et l'état d'envoi
      } = useForm();
    
    const onSubmit = async (data) => {
        // console.log(data.ville);
        try{
            await axiosInstance.post('mission/create', {
                Objet_mission: data.objet,
                Description_mission: data.description,
                Ville_mission: data.ville,
                Pays_mission: data.pays,
                Continent_mission: data.continent,
                Cree_par: user?.Id_User
            })
            .then(()=>{
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
                        redirect('/odm/single-odm/')
                    }
                });
            })
            .catch(()=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Une erreur s'est produite, réessayez svp"
                });
            })
        }catch(err){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Une erreur liée au réseau s'est produite. Nous vous prions de réessayer svp"
            });
        }
    }
    return (
        <div className="w-full lg:w-1/3 bg-white">
            <div className='p-2 max-w-3xl mx-auto'>
                <h1 className='text-xl font-bold font-primary text-green-900'>Enregistrez une nouvelle mission</h1>
                <p className='text-gray-400'>Veuillez remplir ce formulaire pour ajouter une nouvelle mission</p>

                <div>
                    <form className='form border-t flex flex-col gap-5 mt-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4'>
                            <label htmlFor="objet" className='font-primary'>Objet de la mission *</label>
                            <input type="text" id='objet' {...register("objet", { required: "L'objet de la mission est obligatoire" })} placeholder='Objet de la mission' className='outline-none text-input rounded-2xl' />
                            {errors.objet && (<p className="text-red-500 text-sm">{errors.objet.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="desc">Description de la mission *</label>
                            <input type="text" id='desc' {...register("description", { required: "La description de la mission est obligatoire" })} placeholder='Description de la mission' className='outline-none text-input rounded-2xl' />
                            {errors.description && (<p className="text-red-500 text-sm">{errors.description.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="continent">Continent de la mission *</label>
                            <input type="text" id='continent' {...register("continent", { required: "Le continent où se tiendra la mission est obligatoire" })} placeholder='Objet de la mission' className='outline-none text-input rounded-2xl' />
                            {errors.continent && (<p className="text-red-500 text-sm">{errors.continent.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="pays">Pays de la mission *</label>
                            <input type="text" id='pays' {...register("pays", { required: "Le pays où se tiendra la mission est obligatoire" })} placeholder='Pays de la mission' className='outline-none text-input rounded-2xl' />
                            {errors.pays && (<p className="text-red-500 text-sm">{errors.pays.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="ville">Ville de la mission *</label>
                            <input type="text" id='ville' {...register("ville", { required: "La ville où se tiendra la mission est obligatoire" })} placeholder='Ville de la mission' className='outline-none text-input rounded-2xl' />
                            {errors.ville && (<p className="text-red-500 text-sm">{errors.ville.message}</p>)}
                        </div>

                        <button className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900' type='submit'>Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMission