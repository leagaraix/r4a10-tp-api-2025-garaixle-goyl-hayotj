// Import des modules nécessaires
import { Alchimix } from './model.js';
import { view } from './view.js';

let alchimix = new Alchimix();

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();

// ### Initialisation des listeners#
// - Gestion de la saisie au clavier
view.rechercheButton.addEventListener("click", (evt) => {
  console.log(view.rechercheInput.value);
  // Lance la recherche
  console.log(alchimix.searchByName(view.rechercheInput.value));
  console.log(alchimix.searchByIngredient(view.rechercheInput.value));
  // (La vue n'a pas besoin d'être mis à jour ici)
});


// ### Gestion des recherches favorites

// - Au chargement de la page, afficher ou non les recherches favorites
document.addEventListener("DOMContentLoaded", function(event) {

  let favorisRechercheCocktail = alchimix.getFavorisRechercheCocktail();

  if (favorisRechercheCocktail.length > 0) {
    view.aucunFavoris.hidden = true;

    let ul = document.createElement("ul");
    ul.id = "bloc-recherches-favorites";
  
    favorisRechercheCocktail.forEach((rechercheFavorite, index) => {
      let li = document.createElement("li");
      li.id = "li" + index;
      li.className = "recherche-favorite";
      li.textContent = rechercheFavorite;
      let img = document.createElement("img");
      img.id = "img-croix" + index;
      img.className = "img-croix";
      img.src = "images/croix.svg";
      li.appendChild(img);
      ul.appendChild(li);
    });
  
    view.aucunFavoris.parentNode.insertBefore(ul, view.aucunFavoris.nextSibling);

    // Ecoute des clics sur les éléments <li> de la liste, pour lancer la recherche
    // OU clics sur la croix, pour supprimer la recherche
    ul.addEventListener("click", function(event) {
      let li = event.target.closest("#bloc-recherches-favorites li");
      let img = event.target.closest("#bloc-recherches-favorites img");
      if (img) { 
        suppression(li.id);
      } else if (li) {
        chercher(li.id); 
      }
    });

  
  } else {
    view.aucunFavoris.hidden = false;
  }

  // Vérifie au chargement de la page si le contenu de la recherche 
  // est une recherche favorite, pour afficher l'étoile correspondante
  if (alchimix.checkFav(view.rechercheInput.value) === true) {
    view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
  }

});


// - Changements d'états du bouton Favoris
view.rechercheInput.addEventListener("input", function(event) {

  view.btnFav.disabled = false;
  view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");

  if (view.rechercheInput.value == "") {
    // Désactiver de nouveau le bouton quand le champ redevient vide
    view.btnFav.disabled = true;
  } else if (alchimix.checkFav(view.rechercheInput.value) === true) {
    // On change l'image contenue dans le bouton btnFav
    view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
  }
    
});


// - Ajout ou suppression d'une recherche aux favoris
view.btnFav.addEventListener("click", function(event) {
  // Si la recherche n'est pas encore dans les favoris, l'ajouter
  // Si elle y est déjà, la supprimer
  if (alchimix.checkFav(view.rechercheInput.value) !== true) {
    alchimix.addRechercheCocktail(view.rechercheInput.value);
    view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
    window.location.reload();
  } else {
    let id = alchimix.getFavorisRechercheCocktail().indexOf(view.rechercheInput.value);
    suppression(id);
  }
});

// Supprime une recherche de la liste
function suppression() {
  view.confirmation.showModal();

    // Confirmation de la suppression
    view.btnConfirmer.addEventListener("click", function(event) {
      alchimix.deleteRechercheCocktail(view.rechercheInput.value);
      view.confirmation.close();
      view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
      window.location.reload();
    });

    // Annulation de la suppression par un clic sur "Annuler"
    view.btnAnnuler.addEventListener("click", function(event) {
      view.confirmation.close();
    });
    // OU par un clic en-dehors des boutons
    view.confirmation.addEventListener("click", function(event) {
      view.confirmation.close();
    });
}

// Ajoute le contenu de l'élémént cliqué dans la barre de recherche
function chercher(liId) {
  let id = liId.slice(-1);
  let tableauRecherchesFav = alchimix.getFavorisRechercheCocktail();
  view.rechercheInput.value = tableauRecherchesFav[id];
}