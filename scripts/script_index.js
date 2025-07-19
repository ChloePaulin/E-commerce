// Afficher chaque ligne dans un paragraphe sur la page index
function afficherListeCategories(categories){
    accueilContainer = document.getElementById("categorylist");
    accueilContainer.innerHTML = "";
    categories.forEach(category => {
        const p = document.createElement('p');
        p.className = "category";
        p.innerHTML=`<a class="url" id="${category.name}" href="pageProduits.html?slug=${category.slug}">${category.name}</a>`;
        accueilContainer.appendChild(p);
    });
}
// Récupérer les données de l'API et les afficher sur la page avec afficherListeProduits()
async function recupUrlJSON(url){
    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Erreur de réponse du site : "+ response.status);
        }

        listeProduits = await response.json();
        afficherListeCategories(listeProduits);
    }
    catch (error){
        accueilContainer = document.getElementById("listeProduits");
        accueilContainer.innerHTML = "<p>Erreur de chargement de la liste.</p>";
    }
}

recupUrlJSON("https://dummyjson.com/products/categories");