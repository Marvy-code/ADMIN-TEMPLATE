/**
 * Formate une date au format "jour, jj mois aaaa".
 * 
 * @param {string} dateString - Chaîne de date, par exemple : "2024-11-27T00:00:00".
 * @returns {string} La date formatée, par exemple : "jeudi, 27 nov 2024".
 */
export function formatDate(dateString) {
    if (!dateString) {
      throw new Error("La date est invalide ou absente.");
    }
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Format de date invalide.");
    }
  
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options).replace('.', '');
  }