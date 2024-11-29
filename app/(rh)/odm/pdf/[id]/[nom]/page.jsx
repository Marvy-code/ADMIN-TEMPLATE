'use client'
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";

async function getData(id) {
  // Simuler une récupération de données depuis une API ou base de données
  // Dans un cas réel, tu ferais une requête API ici pour obtenir les données
  const data = { id, content: `Contenu spécifique pour l'ID ${id}` };

  // Tu peux aussi vérifier si les données existent pour cet ID
  if (!data) {
    return null;  // Si les données ne sont pas trouvées, retourner null
  }

  return data;  // Retourne les données simulées
}

export default function PrintPage({ params: paramsPromise }) {
  const blocRef = useRef();
  const params = React.use(paramsPromise);
  const { id, nom } = params; // Récupère l'ID dynamique depuis l'URL
  const data = getData(id); // Récupère les données pour l'ID

  // Si aucune donnée n'est trouvée pour l'ID, renvoyer une page 404
  if (!data) {
    notFound();
  }

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
    pdf.save("bloc-imprimable.pdf"); // Télécharger le PDF
  };

  return (
    <div>
      <div className="font-century"
        ref={blocRef}
        style={{ padding: '70px', paddingRight: '100px', paddingLeft: '100px' }}
      >
        <div style={{ borderLeft: '5px solid #769C38' }}>
          <div style={{ borderLeft: '5px solid yellow' }}>
            <div style={{ borderLeft: '5px solid #B2241B', padding: '50px' }}>
              <Image src={'/assets/images/logo-file-odm.png'} width={1400} height={900} alt="" />
              <h3 className="font-bold ml-5 text-4xl">N<sup>o</sup>093/ARPCE-DG/DAFC/SRHD/2024</h3>

              <h2 className="" style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bold', paddingTop: '80px', textDecoration: 'underline' }}>ORDRE DE MISSION</h2>

              <p className="mt-[80px] text-4xl text-justify">
                Le Directeur Administratif Financier et Comptable de l'Agence de Régulation des Postes et des Communications Électroniques (A.R.P.C.E.), soussigné, prescrit une mission à :
              </p>

              <table className="text-4xl border-separate border-spacing-4" style={{ width: '100%', marginTop: '80px', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Noms et Prénoms</strong></td>
                    <td style={{ padding: '8px' }}>??????</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Fonction</strong></td>
                    <td style={{ padding: '8px' }}>Technicien sécurité Informatique</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Objet de la mission</strong></td>
                    <td style={{ padding: '8px' }}>FORMATION ?????</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Destination</strong></td>
                    <td style={{ padding: '8px' }}>Paris</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Moyen de Transport</strong></td>
                    <td style={{ padding: '8px' }}>Avion</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Date de départ</strong></td>
                    <td style={{ padding: '8px' }}>11 octobre 2024</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Date de retour</strong></td>
                    <td style={{ padding: '8px' }}>20 octobre 2024</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px' }}><strong>Frais de transport et séjour</strong></td>
                    <td style={{ padding: '8px' }}>à la charge du budget de l’ARPCE</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-4xl text-justify" style={{ marginTop: '80px' }}>
                En foi de quoi, le présent ordre de mission lui est délivré pour servir et valoir ce que de droit.
              </p>

              <div className="text-4xl" style={{ textAlign: 'right', marginTop: '90px' }}>
                <p className="">Fait à Brazzaville, le 05 septembre 2024</p>
                <p className="mt-[80px]"><strong>Le Directeur Général,</strong></p>
                <p className="mt-[200px]"><strong>Louis-Marc SAKALA.</strong></p>
              </div>

              <div className="text-gray-400 border-t-4 border-[#B2241B]" style={{ fontSize: '28px', marginTop: '100px', textAlign: 'center' }}>
                <p>Etablissement public administratif doté de la personnalité juridique et de l’autonomie financière placé sous la tutelle du MPTEN
                  Adresse : 91, Bis Avenue de l'Amitié, Immeuble ARPCE <br /> BP : 2490 Brazzaville | République du Congo | Téléphone : +242 510 7272
                  <br /> Email : contact@arpce.cg</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Bouton pour générer le PDF */}
      <button onClick={genererPDF}>Télécharger le PDF</button>
    </div>
  );
}
