import React from 'react'
import Jumbotron from '@/components/Jumbotron';

const Liste = () => {
  return (
    <div className='font-primary'>
        <Jumbotron icon='/assets/images/add-files.png' title='Gestion des Missions'/>

        <div className='flex gap-4 flex-col md:flex-row p-2'>
            <div className="w-full lg:w-2/3 bg-white font-primary">
                <p className='p-2 text-gray-500'>Ici sront affichées les différentes missions enregistrées</p>
            </div>

            <div className="w-full lg:w-1/3 bg-white">
                <div className='p-2 max-w-3xl mx-auto'>
                    <h1 className='text-xl font-bold font-primary text-green-900'>Enregistrez une nouvelle mission</h1>
                    <p className='text-gray-400'>Veuillez remplir ce formulaire pour ajouter une nouvelle mission</p>
                    
                    <div>
                        <form className='form border-t flex flex-col gap-5 mt-4'>
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