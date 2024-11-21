'use client'
import React, { useEffect, useState } from 'react'

const initialFormData = {
    agentDde: "",
    fonctionDde: "",
    validateur: "",
    participant: "",
    directionParticipant: "",
    serviceParticipant: "",
    bureauParticipant: "",
    fonctionParticipant: "",
    budget: "",
    objectSpec: "",
    depart: "",
    retour: "",
    moyenTransport: "",
    priseCharge: "",
    fraisMission: "",
    fraisHebergement: "",
    forfait: "",
    joursMission: "",
    joursHebergement: "",
}

const NewOdm = () => {

    const [formStep, setFormStep] = useState(0)
    const completeFormStep = () =>{
        setFormStep(cur => cur + 1)
    }

    const renderButton = () =>{
        if(formStep > 2 ){
            return undefined
        }
        else if(formStep === 2){
            return (
                <button type='button' className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900 mt-2 w-30'>Créer l'ODM</button>
            )
        }
        else{
            return (
                <button type='button' onClick={completeFormStep} className='bg-blue-700 p-2 text-white font-bold rounded-2xl hover:bg-green-900 mt-2 w-20'>Suivant</button>
            )
        }
    }

    const goToPreviousSteps = () =>{
        setFormStep(cur => cur - 1)
    }

  return (
    <div className=''>
        <form className='form flex flex-col'>
            <h3 className='text-gray-500'>Formulaire d'enregistrement d'un ODM</h3>

            <div className='mt-4 bg-slate-600 p-2 rounded-xl'>
                <h3 className='text-white flex items-center'>
                    {formStep > 0 && (
                        <button type='button' onClick={goToPreviousSteps} className='bg-yellow-300 rounded-3xl text-black font-bold p-1 mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                            </svg>
                        </button>
                    )}

                    <span>Etape {formStep + 1}: {formStep === 0 ? "Identification du demandeur" : formStep === 1 ? "Identification du participant" : "A propos de l'ODM"} </span>
                </h3>
            </div>

            {formStep === 0 && (
                <div>
                    <div className='mt-4'>
                        <label htmlFor="">Agent demandeur</label>
                        <input type="text" id='' className='outline-none rounded-2xl text-input w-full' autoFocus placeholder=''/>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="participant">Fonction du demandeur</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="participant">Validateur</label>
                        <select name="" id="" className='outline-none rounded-2xl text-input w-full'>
                            <option>---Veuillez sélectionner une valeur---</option>
                            <option>DG</option>
                            <option>DEM</option>
                            <option>DAFC</option>
                            <option>DAJI</option>
                            <option>DRSCE</option>
                            <option>DRP</option>
                            <option>DPP</option>
                        </select>
                    </div>
                </div>
                
            )}

            {/* Step 2 */}
            {formStep === 1 && (
                <div>
                    <div className='mt-4'>
                        <label htmlFor="participant">Nom et prénoms du participant</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                    </div>

                    <div className=''>
                        <label htmlFor="">Direction du participant</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder='Ex: DAFC'/>
                    </div>

                    <div className=''>
                        <label htmlFor="">Service du participant</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Service Ressources Humaines et Documentation'/>
                    </div>

                    <div className='md:flex-row w-full lg:w-1.5/3'>
                        <label htmlFor="">Bureau du participant</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Bureau Administration et Paie'/>
                    </div>

                    <div className='md:flex-row w-full lg:w-1.5/3'>
                        <label htmlFor="">Fonction du participant</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Assistante administrative'/>
                    </div>
                </div>
            )}

            {/* Step 3 */}

            {formStep === 2 && (
                <div>
                    <div className='mt-4'>
                        <label htmlFor="">Budget</label>
                        <input type="number" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder='Ex: 350000'/>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="">Objectif spécifique</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder="Quel est l'objectif spécifique de cet ODM ?"/>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="">Date de départ</label>
                            <input type="date" id='participant' className='outline-none rounded-2xl text-input w-full'/>
                        </div>

                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="">Date de retour</label>
                            <input type="date" id='participant' className='outline-none rounded-2xl text-input w-full'/>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="">Moyen de transport</label>
                        <select name="" id="" className='outline-none rounded-2xl text-input w-full'>
                            <option>---Veuillez sélectionner une valeur---</option>
                            <option>Avion</option>
                            <option>Voiture</option>
                        </select>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="">Nature de prise en charge</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder="A la charge de l'ARPCE"/>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="">Frais de mission en CFA</label>
                            <input type="number" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder='Ex: 3000000'/>
                        </div>

                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="">Frais d'hébergement en CFA</label>
                            <input type="number" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="">Forfait</label>
                        <input type="text" id='participant' className='outline-none rounded-2xl text-input w-full' placeholder="A la charge de l'ARPCE"/>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="">Nombre de jours de la mission</label>
                            <input type="number" id='participant' className='outline-none rounded-2xl text-input w-full'/>
                        </div>

                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="">Nombre de jours de l'hébergement</label>
                            <input type="number" id='participant' className='outline-none rounded-2xl text-input w-full'/>
                        </div>
                    </div>
                </div>
            )}

            {renderButton()}
        </form>
    </div>
  )
}

export default NewOdm