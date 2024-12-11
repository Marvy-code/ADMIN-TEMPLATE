import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import axiosInstance from '../../../utils/axios';
import { useUser } from '../../context/UserContext';
import Loader from '../../../components/Loader'
import Select from "react-select";
import { useRouter } from 'next/navigation';

const CreateMission = () => {
    const router = useRouter();
    const { user } = useUser();
    const [loader, setLoader] = useState(false)
    const {
        register, // Pour enregistrer les champs
        handleSubmit, // Pour gérer la soumission
        reset,
        control,
        formState: { errors, isSubmitting }, // Pour gérer les erreurs et l'état d'envoi
    } = useForm();

    const onSubmit = async (data) => {
        setLoader(true)
        try {
            await axiosInstance.post('mission/create', {
                Objet_mission: data.objet,
                Description_mission: data.description,
                Continent_mission: selectedContinent.value,
                Pays_mission: selectedPays.value,
                Ville_mission: selectedVilles.value,
                Cree_par: user?.Id_User
            })
                .then((res) => {
                    Swal.fire({
                        title: "Félicitations",
                        text: "Vous avez créez avec succès une mission",
                        icon: "info",
                        confirmButtonColor: "#769C38",
                        confirmButtonText: "Fermer"
                    }).then((result) => {
                        window.location.reload()
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Une erreur svp, l'objet de cette mission existe déjà"
                    });
                    setLoader(false)
                })
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Une erreur liée au réseau s'est produite. Nous vous prions de réessayer svp"
            });
            setLoader(false)
        }
    }

    const [selectedContinent, setSelectedContinent] = useState(null);
    const [allContinent, setAllContinent] = useState([]);

    const getContinent = async () => {
        axiosInstance.get('lieu/getcontinent')
        .then(res=>{
            setAllContinent(res.data)
        })
    }

    const ContinentList = allContinent.map((item) => ({
        value: item.Libelle_continent,
        label: item.Libelle_continent,
    }));

    const handleChangeContinent = (selectedContinent) => {
        setSelectedContinent(selectedContinent)
    };

    useEffect(() => {
        getContinent()
    }, [])

    const [PaysList, setPaysList] = useState([]);
    const [selectedPays, setSelectedPays] = useState(null);

    useEffect(() => {
        const getPays = async () => {
            if (!selectedContinent) return;
                try {
                    const response = await axiosInstance.get(`/lieu/getpays`, {
                        params:{
                            libelle: selectedContinent.value
                        }
                    });
                    setPaysList(response.data.map((pays) => ({ value: pays.libelle_pays, label: pays.libelle_pays })));
                } catch (err) {
                    console.error("Erreur lors de la récupération des services", err);
                }
            };
            getPays();
    }, [selectedContinent]);
    // Gérer le changement de =pays
    const handleChangePays = (selectedContinent) => {
        setSelectedPays(selectedContinent);
    };

    // Gestion des villes
    const [VillesList, setVillesList] = useState([]);
    const [selectedVilles, setSelectedVille] = useState(null);

    useEffect(() => {
        const getPays = async () => {
            if (!selectedPays) return;
                try {
                    const response = await axiosInstance.get(`/lieu/getville`, {
                        params:{
                            libelle: selectedPays.value
                        }
                    });
                    setVillesList(response.data.map((ville) => ({ value: ville.Libelle_ville, label: ville.Libelle_ville })));
                } catch (err) {
                    console.error("Erreur lors de la récupération des bureaux", err);
                }
            };
            getPays();
    }, [selectedPays]); 
    const handleChangeVille = (selectedVilles) => {
        setSelectedVille(selectedVilles);
    };

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
                            <Controller
                                name="continent"
                                id="continent"
                                control={control}
                                defaultValue={null}
                                // rules={{ required: "Le continent où se tiendra la mission est obligatoire" }}
                                render={({ field }) => (
                                    <Select
                                        options={ContinentList}
                                        value={selectedContinent}
                                        onChange={handleChangeContinent}
                                        isSearchable
                                        placeholder="Rechercher un continent..."
                                    />
                                )}
                            />
                            {errors.continent && (<p className="text-red-500 text-sm">{errors.continent.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="pays">Pays de la mission *</label>

                            <Controller
                                name="pays"
                                id="pays"
                                control={control}
                                defaultValue={null}
                                // rules={{ required: "Le pays où se tiendra la mission est obligatoire" }}
                                render={({ field }) => (
                                    <Select
                                        options={PaysList}
                                        onChange={handleChangePays}
                                        placeholder="Recherchez un pays..."
                                        isSearchable
                                        isDisabled={!selectedContinent}
                                    />
                                )}
                            />
                            {errors.pays && (<p className="text-red-500 text-sm">{errors.pays.message}</p>)}
                        </div>

                        <div className=''>
                            <label htmlFor="ville">Ville de la mission *</label>
                            <Controller
                                name="ville"
                                id="ville"
                                control={control}
                                defaultValue={null}
                                // rules={{ required: "La ville où se tiendra la mission est obligatoire" }}
                                render={({ field }) => (
                                    <Select
                                        options={VillesList}
                                        onChange={handleChangeVille}
                                        placeholder="Recherchez une ville ..."
                                        isSearchable
                                        isDisabled={!selectedPays}
                                    />
                                )}
                            />
                            {errors.ville && (<p className="text-red-500 text-sm">{errors.ville.message}</p>)}
                        </div>

                        {!loader && <button className='bg-[#769C38] p-2 text-white font-bold rounded-2xl hover:bg-green-900' type='submit'>Enregistrer</button>}

                        <div className='justify-center'>
                            {loader && <Loader />}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMission