import { alchimix } from './model.js';

export class RecherchesFavorites {

    constructor(view) {
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

        // Par défaut, l'étoile est vide et le bouton est désactivé
        this.view.btnFav.disabled = true;
        this.view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
        
        // Vérifie au chargement de la page si le contenu de la recherche 
        // est une recherche favorite, pour afficher l'étoile correspondante
        if (this.alchimix.isFav(this.view.rechercheInput.value) === true) {
            this.view.btnFav.disabled = false;
            this.view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
        } else if (this.view.rechercheInput.value !== "") {
            this.view.btnFav.disabled = false;
        }

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

    }

    // Changements d'états du bouton Favoris
    changementEtatBtnFav() {
        
        // Quand le champ redevient vide
        if (this.view.rechercheInput.value === "") {
            this.view.btnFav.disabled = true;
            this.view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
        
        // Quand le champ contient une recherche favorite
        } else if (this.alchimix.isFav(this.view.rechercheInput.value) === true) {
            this.view.btnFav.disabled = false;
            this.view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
        
        // Quand le champ contient du texte, mais pas une recherche favorite
        } else {
            this.view.btnFav.disabled = false;
            this.view.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
        }
    }


    // Gère les clics sur les recherches favorites (recherche ou suppression)
    gestionClick(event) {
        // Ecoute des clics sur les éléments <li> de la liste, pour lancer la recherche
        let li = event.target.closest("#bloc-recherches-favorites li");
        // Ecoute des clics sur la croix, pour supprimer la recherche
        let img = event.target.closest("#bloc-recherches-favorites img");

        if (img) { 
            this.suppression(li.id.slice(-1));
        } else if (li) {
            this.chercher(li.id.slice(-1)); 
        }
    }

    // Ajout ou suppression d'une recherche aux favoris à partir de l'étoile
    gererRechercheFavorite() {
        if (this.alchimix.isFav(this.view.rechercheInput.value)) {
            let id = this.alchimix.getFavorisRechercheCocktail().indexOf(this.view.rechercheInput.value);
            this.suppression(id);
        } else {
            this.alchimix.addRechercheCocktail(this.view.rechercheInput.value);
            this.view.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
            window.location.reload();
        }
    }


    // Supprime une recherche de la liste
    // id doit être un entier 
    suppression(id) {
        this.view.confirmation.showModal();
        let tableauRecherchesFav = this.alchimix.getFavorisRechercheCocktail();

        // ! Utilisation de fonctions fléchées pour conserver this tel qu'il
        // ! était au moment de la définition de cette fonction
        // ! (autrement, this est mal interprété) 

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
    chercher(id) {
      let tableauRecherchesFav = this.alchimix.getFavorisRechercheCocktail();
      this.view.rechercheInput.value = tableauRecherchesFav[id];

      //Lancement de la recherche
      alchimix.setInput(tableauRecherchesFav[id]);
      window.location = "./recherche.html";
    }

}