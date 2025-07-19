// Afficher chaque ligne dans un paragraphe sur pageProduits
function afficherListeProduits(products){
    container = document.getElementById("productList");
    container.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = "product";
        div.innerHTML=`<img class="imgproducts" src="${product.thumbnail}" alt="${product.title}">
        <h4>${product.title}</h4>
        <p>Prix : ${product.price}</p>
        <p>Note : ${product.rating}</p>`;
        container.appendChild(div);
    });
}
// Récupérer les données de l'API et les afficher sur la page avec afficherListeProduits()
async function recupJSONProducts(url){
    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Erreur de réponse du site : "+ response.status);
        }

        listeProduits = await response.json();
        listeProduits = listeProduits["products"];
        afficherListeProduits(listeProduits);
    }
    catch (error){
        container = document.getElementById("productList");
        container.innerHTML = "<p>Erreur de chargement de la liste.</p>";
    }
}

// On va récupérer l'URL dans la page sur laquelle se trouve l'utilisateur
const params = new URLSearchParams(window.location.search);
// Cette ligne permet d'isoler l'id de l'URL.
const slug = params.get("slug");
// Les URL's de l'API ont toutes des ressemblances, je peux l'intégrer dans un URL générique :
recupJSONProducts("https://dummyjson.com/products/category/"+slug);