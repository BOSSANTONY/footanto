const API_URL = "http://api.football-data.org/v4/persons/"; // Endpoint pour récupérer les joueurs
const API_KEY = "054aa7d4ae5e4177992ada5e762d7f41"; // Remplacez par votre clé API

const searchBar = document.getElementById("search-bar"); // Barre de recherche
const searchResults = document.getElementById("search-results"); // Conteneur pour les résultats

// Fonction pour effectuer une recherche dans l'API
const searchPlayers = async (query) => {
  try {
    const response = await fetch(`${API_URL}?name=${query}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.players; // Modifiez selon la structure de l'API (parfois `players` peut être `data` ou autre)
    } else {
      console.error("Erreur API :", response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
    return [];
  }
};

// Fonction pour afficher les résultats dans l'interface utilisateur
const displayResults = (players) => {
  searchResults.innerHTML = ""; // Vider les résultats précédents

  if (players && players.length > 0) {
    players.forEach((player) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-card");

      // Remplir les informations des joueurs (photo, nom, équipe, etc.)
      resultItem.innerHTML = `
        <img src="${player.photo || 'default-photo.jpg'}" alt="${player.name}" class="player-photo">
        <div class="player-info">
          <h3>${player.name}</h3>
          <p><strong>Équipe :</strong> ${player.team || "Inconnue"}</p>
          <p><strong>Nationalité :</strong> ${player.nationality || "Non spécifiée"}</p>
        </div>
      `;
      searchResults.appendChild(resultItem);
    });
  } else {
    searchResults.innerHTML = "<p>Aucun résultat trouvé.</p>";
  }
};

// Événement pour la barre de recherche
searchBar.addEventListener("input", async (e) => {
  const query = e.target.value.trim();

  if (query.length > 2) { // Effectuer une recherche uniquement si la saisie est suffisante
    const players = await searchPlayers(query); // Appel de l'API avec la saisie
    displayResults(players); // Afficher les résultats
  } else {
    searchResults.innerHTML = ""; // Réinitialiser les résultats si la saisie est vide
  }
});
