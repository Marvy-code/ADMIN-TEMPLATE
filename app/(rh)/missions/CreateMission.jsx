import React from 'react'
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2';
// import { useRouter } from 'next/router';

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
            redirect('/odm/single-odm/')
        }
      });
}

const CreateMission = () => {
    return (
        <div className="w-full lg:w-1/3 bg-white">
            <div className='p-2 max-w-3xl mx-auto'>
                <h1 className='text-xl font-bold font-primary text-green-900'>Enregistrez une nouvelle mission</h1>
                <p className='text-gray-400'>Veuillez remplir ce formulaire pour ajouter une nouvelle mission</p>

                <div>
                    <form className='form border-t flex flex-col gap-5 mt-4' onSubmit={handleSubmit}>
                        <div className='mt-4'>
                            <label htmlFor="objet" className='font-primary'>Objet de la mission</label>
                            <input type="text" id='objet' placeholder='Objet de la mission' className='outline-none text-input rounded-2xl' />
                        </div>

                        <div className=''>
                            <label htmlFor="desc">Description de la mission</label>
                            <input type="text" id='desc' placeholder='Description de la mission' className='outline-none text-input rounded-2xl' />
                        </div>

                        <div className=''>
                            <label htmlFor="continent">Continent de la mission</label>
                            <input type="text" id='continent' placeholder='Objet de la mission' className='outline-none text-input rounded-2xl' />
                        </div>

                        <div className=''>
                            <label htmlFor="pays">Pays de la mission</label>
                            <input type="text" id='pays' placeholder='Pays de la mission' className='outline-none text-input rounded-2xl' />
                        </div>

                        <div className=''>
                            <label htmlFor="ville">Ville de la mission</label>
                            <input type="text" id='ville' placeholder='Ville de la mission' className='outline-none text-input rounded-2xl' />
                        </div>

                        <button className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900' type='submit'>Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMission