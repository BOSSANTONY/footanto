// Fonctionnalité de recherche
document.getElementById("search-bar").addEventListener("input", function (e) {
    const query = e.target.value.toLowerCase();
    if (query) {
      console.log(`Recherche : ${query}`);
      alert(`Vous avez recherché : ${query}`);
    }
  });
  