document.getElementById('search-bar').addEventListener('input', function(e) {
  // Récupère la valeur du champ de recherche et enlève les espaces
  const query = e.target.value.trim().toLowerCase();

  if (query.length > 0) {
    // Effectuer la requête à l'API
    fetchData(query);
  } else {
    // Si le champ est vide, effacer les résultats
    document.getElementById('search-results').innerHTML = '';
  }
});

async function fetchData(query) {
  try {
    // Formater l'URL de l'API pour la requête
    const url = `https://api.football-data.org/v4/competitions`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '054aa7d4ae5e4177992ada5e762d7f41'  // Remplace avec ta clé d'API
      }
    });

    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }

    const data = await response.json();

    // Filtrer les données en fonction de la requête de l'utilisateur
    const results = filterResults(data, query);

    // Afficher les résultats filtrés
    displayResults(results);

  } catch (error) {
    console.error('Erreur:', error);
    document.getElementById('search-results').innerHTML = 'Erreur de chargement des données.';
  }
}

function filterResults(data, query) {
  // Utilise un tableau vide pour stocker les résultats filtrés
  const results = [];

  // Vérifie chaque compétition dans le tableau
  data.competitions.forEach(comp => {
    // Vérifie si le nom de la compétition, l'ID, la zone (area.name) ou d'autres champs contiennent la recherche
    if (
      comp.name.toLowerCase().includes(query) ||  // Nom de la compétition
      comp.id.toString().includes(query) ||       // ID de la compétition
      comp.area.name.toLowerCase().includes(query) ||  // Nom de la zone
      (comp.currentSeason && comp.currentSeason.startDate && comp.currentSeason.startDate.includes(query))  // Date de début de la saison
    ) {
      results.push(comp);
    }
  });

  return results;
}

function displayResults(results) {
  const resultsContainer = document.getElementById('search-results');
  
  if (results.length === 0) {
    resultsContainer.innerHTML = 'Aucun résultat trouvé.';
    return;
  }

  // Crée un HTML pour afficher les résultats
  const resultsHTML = results.map(result => {
    return `
      <div class="result-item">
        <h3>${result.name}</h3>
        <p><strong>ID de la compétition :</strong> ${result.id}</p>
        <p><strong>Zone :</strong> ${result.area.name} (Code: ${result.area.code})</p>
        <p><strong>Code :</strong> ${result.code}</p>
        <p><strong>Saison actuelle :</strong> ${result.currentSeason ? result.currentSeason.startDate + ' - ' + result.currentSeason.endDate : 'Non disponible'}</p>
        <p><strong>Flag de la zone :</strong> <img src="${result.area.flag}" alt="Flag" width="50"></p>
      </div>
    `;
  }).join('');

  resultsContainer.innerHTML = resultsHTML;
}
