'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../../utils/axios'
import { useUser } from '../../context/UserContext'
import Swal from 'sweetalert2';

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

    const [modalOpen, setModalOpen] = useState(false)

    const completeFormStep = () =>{
        setFormStep(cur => cur + 1)
    }

    const { user } = useUser();
    const [loader, setLoader] = useState(false)
    const {
        register, // Pour enregistrer les champs
        handleSubmit, // Pour gérer la soumission
        reset, 
        formState: { errors, isSubmitting }, // Pour gérer les erreurs et l'état d'envoi
      } = useForm();


    const renderButton = () =>{
        if(formStep > 2 ){
            return undefined
        }
        else if(formStep === 2){
            return (
                <button className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900 mt-2 w-30 mb-6'>Créer l'ODM</button>
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

    const onSubmit = async (data) => {
        axiosInstance.post("ordremission/create", {
            Id_mission: 1,
            Id_budget: 2,
            Id_agent_demandeur: 1002,
            Id_agent_participant: 1002,
            Id_poste_validateur: 1002,
            Objectif_specifique_ODM: data.objet,
            Date_depart:data.depart,
            Date_retour: data.retour,
            Moyen_transport: data.transport,
            Nature_prise_en_charge: data.priseencharge,
            Frais_mission: data.fraismission,
            Frais_hebergement: data.fraishebergement,
            Forfait: data.forfait,
            Nbre_jour_mission: data.joursmission,
            Nbre_jour_hebergement: data.jourshebergement,
            Fonction_agent_participant: data.fonctionparticipant,
            Direction_agent_participant: data.direction,
            Service_agent_participant: data.service,
            Bureau_agent_participant: data.bureau,
            Fonction_agent_demandeur: data.fonctiondemandeur,
            Statut_ODM: "En attente",
            Cree_par: user?.Id_User
        })
        .then((res)=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "ODM créé avec succès",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            // setLoader(false)
        })
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Une erreur svp, veuillez réessayer"
            });
            // setLoader(false)
        })
    }

    const handleAction = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    }

  return (
    <div className=''>
        <form className='form flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-gray-500'>Formulaire d'enregistrement d'un ODM</h3>

            <div className='mt-4 bg-slate-600 p-2 rounded-xl'>
                <h3 className='text-white flex items-center'>
                    {formStep > 0 && (
                        <button type='button' onClick={goToPreviousSteps} className='bg-yellow-300 rounded-3xl text-black font-bold p-1 mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
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
                        <label htmlFor="agentdemandeur">Agent demandeur</label>
                        <input type="text" id='agentdemandeur' {...register("agentdemandeur", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' autoFocus placeholder=''/>
                        {errors.agentdemandeur && (<p className="text-red-500 text-sm">{errors.agentdemandeur.message}</p>)}
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="fonctiondemandeur">Fonction du demandeur</label>
                        <input type="text" id='fonctiondemandeur' {...register("fonctiondemandeur", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                        {errors.fonctiondemandeur && (<p className="text-red-500 text-sm">{errors.fonctiondemandeur.message}</p>)}
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="participant">Validateur</label>
                        <select {...register("validateur", { required: "Ce champs est obligatoire" })} id="participant" className='outline-none rounded-2xl text-input w-full'>
                            <option>---Veuillez sélectionner une valeur---</option>
                            <option value="DG">DG</option>
                            <option value="DEM">DEM</option>
                            <option value="DAFC">DAFC</option>
                            <option value="DAJI">DAJI</option>
                            <option value="DAJI">DRSCE</option>
                            <option value="DRSCE">DRP</option>
                            <option value="DPP">DPP</option>
                        </select>
                        {errors.validateur && (<p className="text-red-500 text-sm">{errors.validateur.message}</p>)}
                    </div>
                </div>
                
            )}

            {/* Step 2 */}
            {formStep === 1 && (
                <div>
                    <div className='mt-4'>
                        <label htmlFor="participant">Nom et prénoms du participant</label>
                        <input type="text" id='participant' {...register("participant", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                        {errors.participant && (<p className="text-red-500 text-sm">{errors.participant.message}</p>)}
                    </div>

                    <div className=''>
                        <label htmlFor="">Direction du participant</label>
                        <input type="text" id='participant' {...register("direction", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: DAFC'/>
                        {errors.direction && (<p className="text-red-500 text-sm">{errors.direction.message}</p>)}
                    </div>

                    <div className=''>
                        <label htmlFor="">Service du participant</label>
                        <input type="text" id='participant' {...register("service", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Service Ressources Humaines et Documentation'/>
                        {errors.service && (<p className="text-red-500 text-sm">{errors.service.message}</p>)}
                    </div>

                    <div className='md:flex-row w-full lg:w-1.5/3'>
                        <label htmlFor="">Bureau du participant</label>
                        <input type="text" id='participant' {...register("bureau", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Bureau Administration et Paie'/>
                        {errors.bureau && (<p className="text-red-500 text-sm">{errors.bureau.message}</p>)}
                    </div>

                    <div className='md:flex-row w-full lg:w-1.5/3'>
                        <label htmlFor="fonctionp">Fonction du participant</label>
                        <input type="text" id='fonctionp' {...register("fonctionparticipant", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Assistante administrative'/>
                        {errors.fonctionparticipant && (<p className="text-red-500 text-sm">{errors.fonctionparticipant.message}</p>)}
                    </div>
                </div>
            )}

            {/* Step 3 */}

            {formStep === 2 && (
                <div>
                    <div className='mt-4'>
                        <label htmlFor="budget">Budget</label>
                        <span className='flex items-center gap-2'>
                            <select id='budget' {...register("budget", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'>
                                <option value="">---Sélectionnez une valeur---</option>
                                <option value=""></option>
                            </select>
                            {/* <input type="number" id='budget' {...register("budget", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: 350000'/> */}
                            <button className='bg-gray-500 rounded-lg p-2 text-white'  onClick={() => handleAction()}>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            </button>
                        </span>
                        {errors.budget && (<p className="text-red-500 text-sm">{errors.budget.message}</p>)}
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="objectif">Objectif spécifique</label>
                        <input type="text" id='objectif' {...register("objet", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder="Quel est l'objectif spécifique de cet ODM ?"/>
                        {errors.objet && (<p className="text-red-500 text-sm">{errors.objet.message}</p>)}
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="depart">Date de départ</label>
                            <input type="date" id='depart' {...register("depart", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                            {errors.depart && (<p className="text-red-500 text-sm">{errors.depart.message}</p>)}
                        </div>

                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="retour">Date de retour</label>
                            <input type="date" id='retour' {...register("retour", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                            {errors.retour && (<p className="text-red-500 text-sm">{errors.retour.message}</p>)}
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="transport">Moyen de transport</label>
                        <select {...register("transport", { required: "Ce champs est obligatoire" })} id="transport" className='outline-none rounded-2xl text-input w-full'>
                            <option>---Veuillez sélectionner une valeur---</option>
                            <option>Avion</option>
                            <option>Voiture</option>
                        </select>
                        {errors.transport && (<p className="text-red-500 text-sm">{errors.transport.message}</p>)}
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="priseencharge">Nature de prise en charge</label>
                        <input type="text" id='priseencharge' {...register("priseencharge", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder="A la charge de l'ARPCE"/>
                        {errors.priseencharge && (<p className="text-red-500 text-sm">{errors.priseencharge.message}</p>)}
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="fraismission">Frais de mission en CFA</label>
                            <input type="number" id='fraismission' {...register("fraismission", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: 3000000'/>
                            {errors.fraismission && (<p className="text-red-500 text-sm">{errors.fraismission.message}</p>)}
                        </div>

                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="fraishebergement">Frais d'hébergement en CFA</label>
                            <input type="number" id='fraishebergement' {...register("fraishebergement", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                            {errors.fraishebergement && (<p className="text-red-500 text-sm">{errors.fraishebergement.message}</p>)}
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="forfait">Forfait</label>
                        <input type="text" id='forfait' {...register("forfait", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder="A la charge de l'ARPCE"/>
                        {errors.forfait && (<p className="text-red-500 text-sm">{errors.forfait.message}</p>)}
                    </div>

                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="joursmission">Nombre de jours de la mission</label>
                            <input type="number" id='joursmission' {...register("joursmission", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                            {errors.joursmission && (<p className="text-red-500 text-sm">{errors.joursmission.message}</p>)}
                        </div>

                        <div className='w-full lg:w-1.5/3'>
                            <label htmlFor="jourshebergement">Nombre de jours de l'hébergement</label>
                            <input type="number" id='jourshebergement' {...register("jourshebergement", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                            {errors.jourshebergement && (<p className="text-red-500 text-sm">{errors.jourshebergement.message}</p>)}
                        </div>
                    </div>
                </div>
            )}

            {renderButton()}
        </form>

            {/* Modal de création du budget */}
        {modalOpen && (
            <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                <div
                    className={`bg-white p-6 rounded-lg shadow-lg w-full lg:w-2/3 transform transition-transform duration-300 ease-in-out ${
                    modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={(e) => e.stopPropagation()} // Empêcher la propagation pour ne pas fermer le modal en cliquant à l'intérieur
                >
                    {/* {selectedRow && ( */}
                        <div>
                            <div className="flex justify-between bg-gray-300 items-center px-6 py-4 border-b">
                                <h3 className='uppercase'>Formulaire de création d'un budget</h3>
                            </div>

                            <div className="p-6">
                            <form className='form border-t flex flex-col gap-5 mt-4' onSubmit={handleSubmit(onSubmit)}>
                                <div className='mt-4'>
                                    <label htmlFor="objet" className='font-primary'>Année budgétaire *</label>
                                    <input type="date" id='objet' {...register("annee", { required: "L'année est obligatoire" })} placeholder='Objet de la mission' className='outline-none text-input rounded-2xl' />
                                    {errors.annee && (<p className="text-red-500 text-sm">{errors.annee.message}</p>)}
                                </div>

                                <span className='flex flex-col gap-5 md:flex-row'>
                                    <div className='w-full lg:w-1.5/3'>
                                        <label htmlFor="desc">Ligne budgétaire *</label>
                                        <input type="number" id='desc' {...register("lignebudgetaire", { required: "La ligne budgétaire est obligatoire" })} placeholder='' className='outline-none text-input rounded-2xl w-full' />
                                        {errors.lignebudgetaire && (<p className="text-red-500 text-sm">{errors.lignebudgetaire.message}</p>)}
                                    </div>

                                    <div className='w-full lg:w-1.5/3'>
                                        <label htmlFor="desc">Libellé de la ligne budgétaire *</label>
                                        <input type="text" id='desc' {...register("lib", { required: "Le libellé de la ligne est obligatoire" })} placeholder='' className='outline-none text-input rounded-2xl w-full' />
                                        {errors.lib && (<p className="text-red-500 text-sm">{errors.lib.message}</p>)}
                                    </div>
                                </span>

                                <div className=''>
                                    <label htmlFor="desc">Montant *</label>
                                    <input type="number" id='desc' {...register("montant", { required: "Le montant est obligatoire" })} placeholder='' className='outline-none text-input rounded-2xl' />
                                    {errors.montant && (<p className="text-red-500 text-sm">{errors.montant.message}</p>)}
                                </div>

                                    {!loader && <button className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900' type='submit'>Enregistrer</button>}

                                    <div className='justify-center'>
                                        {loader && <Loader />}
                                    </div>
                                </form>
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
                    {/* )} */}
                </div>
            </div>
        )}
    </div>
  )
}

export default NewOdm