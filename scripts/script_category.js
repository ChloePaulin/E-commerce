// Afficher chaque ligne dans un paragraphe sur pageProduits
function afficherListeProduits(products) {
  categoryContainer = document.getElementById("productList");
  categoryContainer.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<img class="imgproducts" src="${product.thumbnail}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p>Prix : ${product.price}</p>
        <p>Note : <span class="etoiles">${genererEtoiles(product.rating)}</span></p>
        <a href="detailsProduit.html?id=${product.id}"><button class="bouton-detail">Voir le produit</button></a>`;
    categoryContainer.appendChild(div);
  });
}
// Récupérer les données de l'API et les afficher sur la page avec afficherListeProduits()
async function recupJSONProducts(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur de réponse du site : " + response.status);
    }

    listeProduits = await response.json();
    listeProduits = listeProduits["products"];
    afficherListeProduits(listeProduits);
  } catch (error) {
    categoryContainer = document.getElementById("productList");
    categoryContainer.innerHTML = "<p>Erreur de chargement de la liste.</p>";
  }
}

// On va récupérer l'URL dans la page sur laquelle se trouve l'utilisateur
const params = new URLSearchParams(window.location.search);
// Cette ligne permet d'isoler l'id de l'URL.
const slug = params.get("slug");
// Les URL's de l'API ont toutes des ressemblances, je peux l'intégrer dans un URL générique :
recupJSONProducts("https://dummyjson.com/products/category/" + slug);

// Générer des étoiles pleines ou vide en fonction de la note du produit
function genererEtoiles(note, max = 5) {
  let etoiles = "";
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(note)) {
      etoiles += "★"; // étoile pleine
    } else if (i - note < 1) {
      etoiles += "☆"; // étoile vide
    } else {
      etoiles += "☆"; // étoile vide
    }
  }
  return etoiles;
}
