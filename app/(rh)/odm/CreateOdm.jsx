'use client'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import axiosInstance from '../../../utils/axios'
import { useUser } from '../../context/UserContext'
import Swal from 'sweetalert2';
import Loader from '../../../components/Loader'
import Select from "react-select";
import ProtectedRoute from '@/components/ProtectedRoute'

const NewOdm = ({idMission}) => {
    const { user } = useUser();

    const [idCurrentUser, setIdCurrentuser] = useState()
    const [fonctionCurrentUser, setFonctionCurrentuser] = useState()

    let userIdData  = null
    let userFonctionData = null
    axiosInstance.get(`poste/getbymatricule/${user?.Num_Matricule}`)
    .then(res=>{
        userIdData = res.data[0].Id_agent
        setIdCurrentuser(userIdData)

        userFonctionData = res.data[0].fonction
        setFonctionCurrentuser(userFonctionData)
    })

    const [formStep, setFormStep] = useState(0)

    const [modalOpen, setModalOpen] = useState(false)

    const completeFormStep = () =>{
        setFormStep(cur => cur + 1)
    }
    
    const [loader, setLoader] = useState(false)
    const {
        register, // Pour enregistrer les champs
        handleSubmit, // Pour gérer la soumission
        control,
        reset, 
        formState: { errors, isValid }, // Pour gérer les erreurs et l'état d'envoi
    } = useForm();


    const renderButton = () =>{
        if(formStep > 2 ){
            return undefined
        }
        else if(formStep === 2){
            return (
                <button type='submit' className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900 mt-2 w-30 mb-6'>Créer l'ODM</button>
            )
        }
        else{
            return (
                undefined
                // <button type='button' onClick={completeFormStep} className='bg-blue-700 p-2 text-white font-bold rounded-2xl hover:bg-green-900 mt-2 w-20'>Suivant</button>
            )
        }
    }

    const goToPreviousSteps = () =>{
        setFormStep(cur => cur - 1)
    }

    const onSubmit = async (data) => {
        setLoader(true)
        try{
            axiosInstance.post("ordremission/create", {
                Id_mission: idMission,
                Id_budget: data.budget,
                Id_agent_demandeur: idCurrentUser,
                Id_agent_participant: selectedOption.value,
                Id_poste_validateur: 44, //A changer
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
                Direction_agent_participant: selectedDirection.value,
                Service_agent_participant: selectedService?.value || 0,
                Bureau_agent_participant: selectedBureaux?.value || 0,
                Fonction_agent_demandeur: fonctionCurrentUser,
                Statut_ODM: "Validé",
                Cree_par: idCurrentUser
            })
            .then(()=>{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "ODM créé avec succès",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                setLoader(false)
            })
            .catch(()=>{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Impossible de créer cet ODM car cet agent a déjà un ODM pour cette même mission"
                });
                setLoader(false)
            })
        }
        catch(err){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Veuillez vérifier les champs. Tous les champs sont obligatoires"
            });
        }
    }

    const handleAction = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const [annee, setAnnee] = useState('')
    const [ligne, setLigne] = useState('')
    const [libelle, setLibelle] = useState('')
    const [montant, setMontant] = useState('')

    const createBudget = async (e) => {
        e.preventDefault()
        setLoader(true)
        
        try{
            axiosInstance.post("budget/create", {
                Annee_budgetaire: annee,
                Ligne_budgetaire: ligne,
                Libelle_ligne_budgetaire: libelle,
                Montant_alloue: montant
            })
            .then(()=>{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Année budgétaire créée avec succès",
                    showConfirmButton: false,
                    timer: 1500
                });
                setModalOpen(false);
                setLoader(false)
                getBudgetDatas()
                setAnnee('')
                setLigne('')
                setLibelle('')
                setMontant('')
            })
            .catch(()=>{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Une erreur est survenue, réessayez svp",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoader(false)
            })
        }
        catch(err){
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Une erreur réseau est survenue, vérifiez votre connexion svp",
                showConfirmButton: false,
                timer: 1500
            });
            setLoader(false)
        }
    }

    const [yearArray, setYearArray] = useState([])

    useEffect(() => {
        const newArray = [];
        for (let i = 2024; i <= new Date().getFullYear(); i++) {
            newArray.push(i);
        }
        setYearArray(newArray);

        getBudgetDatas()    
        getAgentsARPCE()
        getDirection()
    }, []);

    const [bugetList, setbudgetList] = useState([])

    const getBudgetDatas = async () =>{
        axiosInstance.get("budget/GetAll")
        .then(res=>{
            setbudgetList(res.data)
        })
    }

    const [agentsARPCE, setAgentsARPCE] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    
    const getAgentsARPCE = () => {
        axiosInstance.get("https://bzv-test-appli:9001/api/agent/getagent")
        .then(res=>{
            setAgentsARPCE(Array.isArray(res.data) ? res.data : []);
        })
    }

    const options = agentsARPCE.map((user) => ({
        value: user.Id_agent,
        label: user.Nom_prenom,
    }));

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const [direction, setDirection] = useState([])
    const [selectedDirection, setSelectedDirection] = useState(null);

    const getDirection = () =>{
        axiosInstance.get("poste/getdirection")
        .then(res=>{
            setDirection(res.data)
        })
    }

    const directionList = direction.map((item) => ({
        value: item.idORGANISATION,
        label: item.libelle,
    }));

    const handleChangeDirection = (selectedDirection) => {
        setSelectedDirection(selectedDirection);
    };

    // Récupérer les services pour une direction donnée
    const [serviceList, setServiceList] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        const getServices = async () => {
            if (!selectedDirection) return; // Si aucune direction n'est sélectionnée, ne pas effectuer la requête
                try {
                    const response = await axiosInstance.get(`/poste/getservice/${selectedDirection.value}`);
                    setServiceList(response.data.map((srv) => ({ value: srv.idORGANISATION, label: srv.libelle })));
                } catch (err) {
                    console.error("Erreur lors de la récupération des services", err);
                }
            };
        getServices();
    }, [selectedDirection]); // Déclenche uniquement lorsque selectedDirection change

    // Gérer le changement de service
    const handleChangeService = (selectedDirection) => {
        setSelectedService(selectedDirection);
    };


    // Récupération des bureaux
    const [BureauxList, setBureauxList] = useState([]);
    const [selectedBureaux, setSelectedBureau] = useState(null);

    useEffect(() => {
        const getBureau = async () => {
            if (!selectedService) return;
                try {
                    const response = await axiosInstance.get(`/poste/getbureau/${selectedService.value}`);
                    setBureauxList(response.data.map((bur) => ({ value: bur.idORGANISATION, label: bur.libelle })));
                } catch (err) {
                    console.error("Erreur lors de la récupération des bureaux", err);
                }
            };
        getBureau();
    }, [selectedService]); 

    // Gérer le changement de service
    const handleChangeBureau = (selectedService) => {
        setSelectedBureau(selectedService);
    };

    const [posteValidateur, setPostValidateur] = useState([])

    const getPosteValidateur = () =>{
        axiosInstance.get("poste/getpostevalidate")
        .then(res=>{
            console.log(res.data)
            setPostValidateur(res.data)
        })
    }

    
    // Récupération de la fonction du user
    const [fonction, setFonction] = useState('');
    useEffect(() => {
        const getFonction = async () => {
            if (!selectedOption) return; 
                try {
                    const response = await axiosInstance.get(`/poste/getfonction/${selectedOption.value}`);
                    setFonction(response.data);
                } catch (err) {
                    console.error("Erreur lors de la récupération des bureaux", err);
                }
            };
            getFonction()
            getPosteValidateur()
    }, [selectedOption]);
    

  return (
    <ProtectedRoute>
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

                        <span>Etape {formStep + 1}/3 : {formStep === 0 ? "Directeur validateur" : formStep === 1 ? "Identification du participant" : "A propos de l'ODM"} </span>
                    </h3>
                </div>

                {formStep === 0 && (
                    <div>
                        <div className='mt-4'>
                            <label htmlFor="participant">Validateur *</label>
                            <select {...register("validateur", { required: "Ce champs est obligatoire" })} required id="participant" className='outline-none rounded-2xl text-input w-full'>
                                <option>---Veuillez sélectionner une valeur---</option>
                                {posteValidateur.map((data) => (
                                        <option value={data.Id_poste} key={data.Id_poste}>{data.Abbr_poste + ' --- ' + data.Libelle_poste}</option>
                                    ))}
                            </select>
                            {errors.validateur && (<p className="text-red-500 text-sm">{errors.validateur.message}</p>)}
                        </div>
                    </div>
                    
                )}

                {/* Step 2 */}
                {formStep === 1 && (
                    <div>
                        <div className='mt-4'>
                            <label htmlFor="participant">Nom et prénoms du participant *</label>
                            <Controller
                                name="participant"
                                id="participant"
                                control={control}
                                defaultValue={null}
                                rules={{ required: "Ce champ est obligatoire" }}
                                render={({ field }) => (
                                    <Select
                                        options={options}
                                        value={selectedOption}
                                        onChange={handleChange}
                                        isSearchable
                                        placeholder="Rechercher un agent..."
                                    />
                                )}
                            />
                            {errors.participant && (<p className="text-red-500 text-sm">{errors.participant.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="direction">Direction du participant *</label>
                            <Controller
                                name="direction"
                                id="direction"
                                control={control}
                                defaultValue={null}
                                rules={{ required: "Ce champ est obligatoire" }}
                                render={({ field }) => (
                                    <Select
                                        options={directionList}
                                        value={selectedDirection}
                                        onChange={handleChangeDirection}
                                        isSearchable
                                        placeholder="Rechercher une direction..."
                                    />
                                )}
                            />
                            {/* <input type="text" id='direction' required {...register("direction", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: DAFC'/> */}
                            {errors.direction && (<p className="text-red-500 text-sm">{errors.direction.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="Service">Service du participant</label>
                            <Controller
                                name="service"
                                id="Service"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <Select
                                    {...field}
                                    options={serviceList}
                                    value={selectedService}
                                    onChange={handleChangeService}
                                    isSearchable
                                    placeholder="Rechercher un service..."
                                    isDisabled={!selectedDirection} // Désactiver tant qu'une direction n'est pas sélectionnée
                                    />
                                )}
                            />
                            {/* <input type="text" id='Service' required {...register("service", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Service Ressources Humaines et Documentation'/> */}
                            {errors.service && (<p className="text-red-500 text-sm">{errors.service.message}</p>)}
                        </div>

                        <div className='md:flex-row w-full lg:w-1.5/3'>
                            <label htmlFor="bureau">Bureau du participant</label>
                            <Controller
                                name="bureau"
                                id="bureau"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <Select
                                    {...field}
                                    options={BureauxList}
                                    value={selectedBureaux}
                                    onChange={handleChangeBureau}
                                    isSearchable
                                    placeholder="Rechercher un bureau..."
                                    isDisabled={!selectedService}
                                    />
                                )}
                            />
                            {/* <input type="text" id='bureau' required {...register("bureau", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Bureau Administration et Paie'/> */}
                            {errors.bureau && (<p className="text-red-500 text-sm">{errors.bureau.message}</p>)}
                        </div>
                        {/* handleChangeFonction */}
                        {fonction && (<div className='md:flex-row w-full lg:w-1.5/3'>
                            <label htmlFor="fonctionp">Fonction du participant *</label>
                            <input type="text" id='fonctionp' required {...register("fonctionparticipant", { required: "Ce champs est obligatoire" })} value={fonction[0].fonction} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: Assistante administrative'/>
                            {errors.fonctionparticipant && (<p className="text-red-500 text-sm">{errors.fonctionparticipant.message}</p>)}
                        </div>)}
                    </div>
                )}

                {/* Step 3 */}

                {formStep === 2 && (
                    <div>
                        <div className='mt-4'>
                            <label htmlFor="budget">Budget *</label>
                            <span className='flex items-center gap-2'>
                                <select id='budget' {...register("budget", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'>
                                    <option value="">---Sélectionnez une valeur---</option>
                                    {bugetList.map((data) => (
                                        <option value={data.Id_budget} key={data.Id_budget}>{data.Libelle_ligne_budgetaire}</option>
                                    ))}
                                </select>                           
                                <button className='bg-gray-500 rounded-lg p-2 text-white'  onClick={() => handleAction()}>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                </button>
                            </span>
                            {errors.budget && (<p className="text-red-500 text-sm">{errors.budget.message}</p>)}
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="objectif">Objectif spécifique *</label>
                            <input type="text" id='objectif' {...register("objet", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder="Quel est l'objectif spécifique de cet ODM ?"/>
                            {errors.objet && (<p className="text-red-500 text-sm">{errors.objet.message}</p>)}
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 mt-4'>
                            <div className='w-full lg:w-1.5/3'>
                                <label htmlFor="depart">Date de départ *</label>
                                <input type="date" id='depart' {...register("depart", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                                {errors.depart && (<p className="text-red-500 text-sm">{errors.depart.message}</p>)}
                            </div>

                            <div className='w-full lg:w-1.5/3'>
                                <label htmlFor="retour">Date de retour *</label>
                                <input type="date" id='retour' {...register("retour", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                                {errors.retour && (<p className="text-red-500 text-sm">{errors.retour.message}</p>)}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="transport">Moyen de transport *</label>
                            <select {...register("transport", { required: "Ce champs est obligatoire" })} id="transport" className='outline-none rounded-2xl text-input w-full'>
                                <option value="" disabled>---Veuillez sélectionner une valeur---</option>
                                <option>Avion</option>
                                <option>Voiture</option>
                            </select>
                            {errors.transport && (<p className="text-red-500 text-sm">{errors.transport.message}</p>)}
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="priseencharge">Nature de prise en charge *</label>
                            <input type="text" id='priseencharge' {...register("priseencharge", { required: "Ce champs est obligatoire" })} value={"A la charge de l'ARPCE"} className='outline-none rounded-2xl text-input w-full' placeholder="A la charge de l'ARPCE"/>
                            {errors.priseencharge && (<p className="text-red-500 text-sm">{errors.priseencharge.message}</p>)}
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 mt-4'>
                            <div className='w-full lg:w-1.5/3'>
                                <label htmlFor="fraismission">Frais de mission en CFA *</label>
                                <input type="number" id='fraismission' {...register("fraismission", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder='Ex: 3000000'/>
                                {errors.fraismission && (<p className="text-red-500 text-sm">{errors.fraismission.message}</p>)}
                            </div>

                            <div className='w-full lg:w-1.5/3'>
                                <label htmlFor="fraishebergement">Frais d'hébergement en CFA *</label>
                                <input type="number" id='fraishebergement' {...register("fraishebergement", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder=''/>
                                {errors.fraishebergement && (<p className="text-red-500 text-sm">{errors.fraishebergement.message}</p>)}
                            </div>
                        </div>

                        <div className='mt-4'>
                            <label htmlFor="forfait">Forfait *</label>
                            <input type="number" id='forfait' {...register("forfait", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full' placeholder="A la charge de l'ARPCE"/>
                            {errors.forfait && (<p className="text-red-500 text-sm">{errors.forfait.message}</p>)}
                        </div>

                        <div className='flex flex-col md:flex-row gap-4 mt-4'>
                            <div className='w-full lg:w-1.5/3'>
                                <label htmlFor="joursmission">Nombre de jours de la mission *</label>
                                <input type="number" id='joursmission' {...register("joursmission", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                                {errors.joursmission && (<p className="text-red-500 text-sm">{errors.joursmission.message}</p>)}
                            </div>

                            <div className='w-full lg:w-1.5/3'>
                                <label htmlFor="jourshebergement">Nombre de jours de l'hébergement *</label>
                                <input type="number" id='jourshebergement' {...register("jourshebergement", { required: "Ce champs est obligatoire" })} className='outline-none rounded-2xl text-input w-full'/>
                                {errors.jourshebergement && (<p className="text-red-500 text-sm">{errors.jourshebergement.message}</p>)}
                            </div>
                        </div>
                    </div>
                )}

                {renderButton()}
            </form>

            {formStep < 2 && <button type='button' onClick={completeFormStep} className='bg-blue-700 p-2 text-white font-bold rounded-2xl hover:bg-green-900 mt-2 w-20'>Suivant</button>}

                {/* Modal de création du budget */}
            {modalOpen && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center'>
                    <div
                        className={`bg-white p-6 rounded-lg shadow-lg w-full lg:w-2/3 transform transition-transform duration-300 ease-in-out ${
                        modalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <div className="flex justify-between bg-gray-300 items-center px-6 py-4 border-b">
                                <h3 className='uppercase'>Formulaire de création d'un budget</h3>
                            </div>

                            <div className="p-6">
                                <form className='form border-t flex flex-col gap-5 mt-4' onSubmit={createBudget}>
                                    <div className='mt-4'>
                                        <label htmlFor="objet" className='font-primary'>Année budgétaire *</label>
                                        <select id='objet' name='annee' value={annee} onChange={(e) => setAnnee(e.target.value)} required placeholder='' className='outline-none text-input rounded-2xl'>
                                            <option value="">---Veuillez sélectionner l'année---</option>
                                            {yearArray.map((year) => (
                                                <option value={year} key={year}>{year}</option>
                                            ))}
                                        </select>
                                        {/* <input type="date" id='objet' name='annee' value={annee} onChange={(e) => setAnnee(e.target.value)} required placeholder='' className='outline-none text-input rounded-2xl' /> */}
                                    </div>

                                    <span className='flex flex-col gap-5 md:flex-row'>
                                        <div className='w-full lg:w-1.5/3'>
                                            <label htmlFor="desc">Ligne budgétaire *</label>
                                            <input type="number" id='desc' name='ligne' value={ligne} onChange={(e) => setLigne(e.target.value)} required placeholder='' className='outline-none text-input rounded-2xl w-full' />
                                        </div>

                                        <div className='w-full lg:w-1.5/3'>
                                            <label htmlFor="desc">Libellé de la ligne budgétaire *</label>
                                            <input type="text" id='desc' name='libelle' value={libelle} onChange={(e) => setLibelle(e.target.value)} required placeholder='' className='outline-none text-input rounded-2xl w-full' />
                                        </div>
                                    </span>

                                    <div className=''>
                                        <label htmlFor="desc">Montant *</label>
                                        <input type="number" id='desc' name='montant' value={montant} onChange={(e) => setMontant(e.target.value)} required placeholder='' className='outline-none text-input rounded-2xl' />
                                    </div>

                                    {!loader && <button type='submit' className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900'>Je crée le budget</button>}

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
                    </div>
                </div>
            )}
        </div>
    </ProtectedRoute>
  )
}

export default NewOdm