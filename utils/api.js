export async function getUserFromApi(token) {
    try {
      if (!token) {
        console.error("Token manquant !");
        return null;
      }
  
      const response = await fetch("https://bzv-test-appli:8000/api/home/getcurrentuser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          console.warn("Token invalide ou expiré !");
          return null;
        }
        throw new Error(`Erreur API : ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de l'appel API :", error);
      return null;
    }
  }
  