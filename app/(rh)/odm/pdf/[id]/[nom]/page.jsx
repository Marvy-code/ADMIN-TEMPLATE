'use client'
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import ProtectedRoute from "@/components/ProtectedRoute";
import Jumbotron from '@/components/Jumbotron';
import { formatDate } from '../../../../../utilitaires/formatDate';

export default function PrintPage({ params: paramsPromise }) {
  const blocRef = useRef();
  const params = React.use(paramsPromise);
  const { id } = params; 

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(`ordremission/getbyid/${id}`);
        setData(response.data); 
        // console.log('Mes données, ', response.data)
      } catch (error) {
        setError('Erreur de récupération des données');
        console.error(error);
      } finally {
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  const genererPDF = async () => {
    const bloc = blocRef.current;

    // Convertir le bloc HTML en image avec html2canvas
    const canvas = await html2canvas(bloc);
    const imgData = canvas.toDataURL("image/png");

    // Configurer le PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("odm-imprimable.pdf"); // Télécharger le PDF
  };

  const today = new Date();

  // Formater la date correctement en chaîne de caractères
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(today);

  return (
    <ProtectedRoute>
    <div className="p-2">
      <Jumbotron icon="/assets/images/add-files.png" title="Visualisation de l'odm avant impression"/>

      <div className="pl-[100px] mb-3 float-end mt-5">
        <button className="bg-blue-900 text-white p-2 rounded-full" onClick={genererPDF}>
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
        </svg>
        </button>
      </div>

      {data ? (
          <div className="font-century"
          ref={blocRef}
          style={{ padding: '70px', paddingRight: '100px', paddingLeft: '100px' }}
        >
          <div style={{ borderLeft: '5px solid #769C38' }}>
            <div style={{ borderLeft: '5px solid yellow' }}>
              <div style={{ borderLeft: '5px solid #B2241B', padding: '50px' }}>
                <Image src={'/assets/images/logo-file-odm.png'} width={1400} height={900} alt="" />
                <h3 className="font-bold ml-5 text-4xl">N<sup>o</sup>&nbsp;{ data[0].Id_ordre_mission }/ARPCE-DG/DAFC/SRHD/2024</h3>
  
                <h2 className="" style={{ textAlign: 'center', fontSize: '55px', fontWeight: 'bold', paddingTop: '80px', textDecoration: 'underline' }}>ORDRE DE MISSION</h2>
  
                <p className="mt-[80px] text-4xl text-justify">
                  Le { data[0].Libelle_poste } de l'Agence de Régulation des Postes et des Communications Électroniques (A.R.P.C.E.), soussigné, prescrit une mission à :
                </p>
  
                <table className="text-4xl border-separate border-spacing-4" style={{ width: '100%', marginTop: '80px', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{  }}><strong>Noms et Prénoms</strong></td>
                      <td style={{  }}>: { data[0].Nom_prenom_participant }</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Fonction</strong></td>
                      <td style={{ paddingTop: '20px' }}>: { data[0].Fonction_agent_participant}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Objet de la mission</strong></td>
                      <td style={{ paddingTop: '20px' }}>: {data[0].Objet_mission}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Destination</strong></td>
                      <td style={{ paddingTop: '20px' }}>: {data[0].Ville_mission}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Moyen de Transport</strong></td>
                      <td style={{ paddingTop: '20px' }}>: {data[0].Moyen_transport}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Date de départ</strong></td>
                      <td className='capitalize' style={{ paddingTop: '20px' }}>: {formatDate(data[0].Date_depart)}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Date de retour</strong></td>
                      <td className='capitalize' style={{ paddingTop: '20px' }}>: {formatDate(data[0].Date_retour)}</td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: '20px' }}><strong>Frais de transport et séjour</strong></td>
                      <td style={{ paddingTop: '20px' }}>: {data[0].Nature_prise_en_charge}</td>
                    </tr>
                  </tbody>
                </table>
  
                <p className="text-4xl text-justify" style={{ marginTop: '50px' }}>
                  En foi de quoi, le présent ordre de mission lui est délivré pour servir et valoir ce que de droit.
                </p>
  
                <div className="text-4xl" style={{ textAlign: 'right', marginTop: '80px' }}>
                  <p className="">Fait à Brazzaville, le {formattedDate}</p>
                  <p className="mt-[40px]"><strong>Le Directeur Général,</strong></p>
                  <p className="mt-[200px]"><strong>Louis-Marc SAKALA.</strong></p>
                </div>
  
                <div className="text-gray-400 border-t-4 border-[#B2241B]" style={{ fontSize: '28px', marginTop: '50px', textAlign: 'center' }}>
                  <p>
                    Etablissement public administratif doté de la personnalité juridique et de l’autonomie financière placé sous la tutelle du MPTEN
                    Adresse : 91, Bis Avenue de l'Amitié, Immeuble ARPCE <br /> BP : 2490 Brazzaville | République du Congo | Téléphone : +242 510 7272
                    <br /> 
                    Email : contact@arpce.cg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : 
        <p className="p-2 mt-2 bg-slate-400 rounded-xl">Aucune donnée à imprimer n'est disponible pour le moment</p>
        }
    </div>
    </ProtectedRoute>
  );
}
