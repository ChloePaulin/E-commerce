// Création du fil d'Ariane pour la page détail
function filAriane(category) {
  let arianeContainer = document.getElementById("ariane");
  arianeContainer.innerHTML = "";
  const h4 = document.createElement("h4");
  h4.className = "breadcrumb";
  h4.ariaLabel ="Breadcrumb";
  h4.innerHTML = `<a href="index.html">L'accueil</a> -> <a href="pageProduits.html?slug=${category}">La catégorie</a>`;
  arianeContainer.appendChild(h4);
}

async function recupAriane(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur de réponse du site : " + response.status);
    }
    detailProduit = await response.json();
    filAriane([detailProduit.category]);
  } catch (error) {
    containerDetail = document.getElementById("productDetail");
    containerDetail.innerHTML = "<p>Erreur de chargement de la liste.</p>";
  }
}

// Affiche le détail du produit sur la page
function detailsProducts(details) {
  const containerDetail = document.getElementById("productDetail");
  containerDetail.innerHTML = "";

  details.forEach((detail) => {
    const div = document.createElement("div");
    div.className = "description";
    div.innerHTML = `
        <div>
        <img src="${detail.images[0]}" class="card-img-top" alt="Image ${
      detail.title
    }" title="Image ${detail.title}"></div>
<div>
        <h4>${detail.title}</h4>
        <p>Description : ${detail.description}</p>
        <p>Prix : ${detail.price}</p>
        <p>Note : <span class="etoiles">${genererEtoiles(
          detail.rating
        )}</span></p>
        </div>`;
    containerDetail.appendChild(div);
  });
}

async function recupDetailProduct(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur de réponse du site : " + response.status);
    }
    detailProduit = await response.json();
    detailsProducts([detailProduit]);
  } catch (error) {
    containerDetail = document.getElementById("productDetail");
    containerDetail.innerHTML = "<p>Erreur de chargement de la liste.</p>";
  }
}

// On va récupérer l'URL dans la page sur laquelle se trouve l'utilisateur
const paramsDetail = new URLSearchParams(window.location.search);
// Cette ligne permet d'isoler l'id de l'URL.
const id = params.get("id");

// Les URL's de l'API ont toutes des ressemblances, je peux l'intégrer dans un URL générique :
recupDetailProduct("https://dummyjson.com/products/" + id);
recupAriane("https://dummyjson.com/products/" + id);