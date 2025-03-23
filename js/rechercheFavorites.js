import { alchimix } from './model.js';

export class RecherchesFavorites {

    constructor(view) {
        // Stocke la vue associée à la page
        this.view = view; 
        this.alchimix = alchimix;
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => this.afficherRecherchesFavorites());
        this.view.rechercheInput.addEventListener("input", () => this.changementEtatBtnFav());
        this.view.btnFav.addEventListener("click", () => this.gererRechercheFavorite());
    }

    // Affichage des recherches favorites au chargement de la page
    afficherRecherchesFavorites() {

        let favorisRechercheCocktail = this.alchimix.getFavorisRechercheCocktail();
        
          if (favorisRechercheCocktail.length > 0) {
            this.view.aucunFavoris.hidden = true;
        
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
          
            this.view.aucunFavoris.parentNode.insertBefore(ul, this.view.aucunFavoris.nextSibling);
        
            // Ecouteurs de clics sur les recherches
            ul.addEventListener("click", (event) => this.gestionClick(event));        
          
          } else {
            this.view.aucunFavoris.hidden = false;
          }
        
          // Vérifie au chargement de la page si le contenu de la recherche 
          // est une recherche favorite, pour afficher l'étoile correspondante
          if (this.alchimix.checkFav(this.view.rechercheInput.value) === true) {
            this.view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
          }
    }

    // Changements d'états du bouton Favoris
    changementEtatBtnFav() {
        this.view.btnFav.disabled = false;
        this.view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");

        if (this.view.rechercheInput.value == "") {
            // Désactiver de nouveau le bouton quand le champ redevient vide
            this.view.btnFav.disabled = true;
        } else if (this.alchimix.checkFav(this.view.rechercheInput.value) === true) {
            // On change l'image contenue dans le bouton btnFav
            this.view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
        }
    }


    // Gère les clics sur les recherches favorites 
    gestionClick(event) {
        // Ecoute des clics sur les éléments <li> de la liste, pour lancer la recherche
        let li = event.target.closest("#bloc-recherches-favorites li");
        // Ecoute des clics sur la croix, pour supprimer la recherche
        let img = event.target.closest("#bloc-recherches-favorites img");

        if (img) { 
            this.suppression(li.id);
        } else if (li) {
            this.chercher(li.id); 
        }
    }

    // Ajout ou suppression d'une recherche aux favoris
    gererRechercheFavorite() {
        if (this.alchimix.checkFav(this.view.rechercheInput.value) !== true) {
            this.alchimix.addRechercheCocktail(this.view.rechercheInput.value);
            this.view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
            window.location.reload();
        } else {
            let id = this.alchimix.getFavorisRechercheCocktail().indexOf(this.view.rechercheInput.value);
            this.suppression(id);
        }
    }


    // Supprime une recherche de la liste
    // ! Utilisation de fonctions fléchées pour conserver this tel qu'il
    // ! était au moment de la définition de cette fonction
    // ! (autrement, this est mal interprété) 
    suppression(liId) {
        this.view.confirmation.showModal();
        let id = liId.slice(-1);
        let tableauRecherchesFav = this.alchimix.getFavorisRechercheCocktail();

        // Confirmation de la suppression
        this.view.btnConfirmer.onclick = () => {
            this.alchimix.deleteRechercheCocktail(tableauRecherchesFav[id]);
            this.view.confirmation.close();
            this.view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
            window.location.reload();
        };

        // Annulation de la suppression par un clic sur "Annuler"
        this.view.btnAnnuler.onclick = () => {
            this.view.confirmation.close();
        };
        // OU par un clic en-dehors des boutons
        this.view.confirmation.onclick = () => {
            this.view.confirmation.close();
        };
    }

    // Ajoute le contenu de l'élémént cliqué dans la barre de recherche
    chercher(liId) {
      let id = liId.slice(-1);
      let tableauRecherchesFav = this.alchimix.getFavorisRechercheCocktail();
      this.view.rechercheInput.value = tableauRecherchesFav[id];
    }

}