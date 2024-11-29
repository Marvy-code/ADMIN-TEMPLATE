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

export default async function PrintPage({ params }) {
  const { id,nom } = params; // Récupère l'ID dynamique depuis l'URL
  const data = await getData(id); // Récupère les données pour l'ID
  
  // Si aucune donnée n'est trouvée pour l'ID, renvoyer une page 404
  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1>Page Print pour l'ID {}</h1>
      <p>Contenu : {}</p>
    </div>
  );
}
