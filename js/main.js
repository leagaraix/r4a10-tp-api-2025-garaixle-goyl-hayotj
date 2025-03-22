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

// - Ajout d'une recherche aux favoris
view.btnFav.addEventListener("click", function(event) {

  // Si la recherche n'est pas encore dans les favoris, l'ajouter
  // Si elle y est déjà, la supprimer
  if (alchimix.checkFav(view.rechercheInput.value) !== true) {
    alchimix.addRechercheCocktail(view.rechercheInput.value);
    view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
  } else {
    
    view.confirmation.showModal();

    // Confirmation de la suppression
    view.btnConfirmer.addEventListener("click", function(event) {
      alchimix.deleteRechercheCocktail(view.rechercheInput.value);
      view.confirmation.close();
      view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
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

  view.btnCreate.addEventListener("click", function(event) {

    view.imageCrea.src = "images/crea" + Math.floor(Math.random() * 4) + ".png"
    view.dialogCrea.showModal();

    view.btnFermerCrea.addEventListener("click", function(event) {
      view.dialogCrea.close();
    })
  })

});