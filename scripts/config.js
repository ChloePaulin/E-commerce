// Afficher chaque ligne dans un paragraphe sur la page index
function afficherListeCategories(categories){
    container = document.getElementById("categorylist");
    container.innerHTML = "";
    categories.forEach(category => {
        const p = document.createElement('p');
        p.className = "category";
        p.innerHTML=`<a class="url" id="${category.name}" href="pageProduits.html?slug=${category.slug}">${category.name}</a>`;
        container.appendChild(p);
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
        container = document.getElementById("listeProduits");
        container.innerHTML = "<p>Erreur de chargement de la liste.</p>";
    }
}