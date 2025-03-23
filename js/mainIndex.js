// Import des modules nécessaires
import { Alchimix } from './model.js';
import { viewIndex } from './view.js';

//Déclaration des éléments du model
let alchimix = new Alchimix();
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();

// ### Gestion des recherches favorites

// - Au chargement de la page, afficher ou non les recherches favorites
document.addEventListener("DOMContentLoaded", function(event) {

  let favorisRechercheCocktail = alchimix.getFavorisRechercheCocktail();

  if (favorisRechercheCocktail.length > 0) {
    viewIndex.aucunFavoris.hidden = true;

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
  
    viewIndex.aucunFavoris.parentNode.insertBefore(ul, Index.aucunFavoris.nextSibling);

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
    viewIndex.aucunFavoris.hidden = false;
  }

  // Vérifie au chargement de la page si le contenu de la recherche 
  // est une recherche favorite, pour afficher l'étoile correspondante
  if (alchimix.checkFav(viewIndex.rechercheInput.value) === true) {
    viewIndex.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
  }

});


// - Changements d'états du bouton Favoris
viewIndex.rechercheInput.addEventListener("input", function(event) {

  viewIndex.btnFav.disabled = false;
  viewIndex.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");

  if (viewIndex.rechercheInput.value == "") {
    // Désactiver de nouveau le bouton quand le champ redevient vide
    viewIndex.btnFav.disabled = true;
  } else if (alchimix.checkFav(viewIndex.rechercheInput.value) === true) {
    // On change l'image contenue dans le bouton btnFav
    viewIndex.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
  }
    
});


// - Ajout ou suppression d'une recherche aux favoris
viewIndex.btnFav.addEventListener("click", function(event) {
  // Si la recherche n'est pas encore dans les favoris, l'ajouter
  // Si elle y est déjà, la supprimer
  if (alchimix.checkFav(viewIndex.rechercheInput.value) !== true) {
    alchimix.addRechercheCocktail(viewIndex.rechercheInput.value);
    viewIndex.imgBtnFav.setAttribute("src", "images/etoile-pleine.svg");
    window.location.reload();
  } else {
    let id = alchimix.getFavorisRechercheCocktail().indexOf(viewIndex.rechercheInput.value);
    suppression(id);
  }
});

// Supprime une recherche de la liste
function suppression() {
  viewIndex.confirmation.showModal();

    // Confirmation de la suppression
    viewIndex.btnConfirmer.addEventListener("click", function(event) {
      alchimix.deleteRechercheCocktail(viewIndex.rechercheInput.value);
      viewIndex.confirmation.close();
      viewIndex.imgBtnFav.setAttribute("src", "images/etoile-vide.svg");
      window.location.reload();
    });

    // Annulation de la suppression par un clic sur "Annuler"
    viewIndex.btnAnnuler.addEventListener("click", function(event) {
      viewIndex.confirmation.close();
    });
    // OU par un clic en-dehors des boutons
    viewIndex.confirmation.addEventListener("click", function(event) {
      viewIndex.confirmation.close();
    });
}

// Ajoute le contenu de l'élémént cliqué dans la barre de recherche
function chercher(liId) {
  let id = liId.slice(-1);
  let tableauRecherchesFav = alchimix.getFavorisRechercheCocktail();
  viewIndex.rechercheInput.value = tableauRecherchesFav[id];
}


// ### Création de cocktails

viewIndex.btnCreate.addEventListener("click", function(event) {

  if (listIngredient.length != 0) {
    if (false) { // insérer condition cocktail existant
      // insérer image cocktail existant
    } else {
      viewIndex.imageCrea.src = "images/crea" + Math.floor(Math.random() * 4) + ".png"
    }
    viewIndex.dialogCrea.showModal();

    viewIndex.btnFermerCrea.addEventListener("click", function(event) {
      viewIndex.dialogCrea.close();
    })
  }
});


// ### Partie DragNDrop
let currentDroppable = null;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.ingredient');

    if (dragElement != null) {
      dragElement.onmousedown = function(event) {

        // On corrige la distance entre le pointeur de la souris et le centre de l'ingrédient
        let shiftX = event.clientX - dragElement.getBoundingClientRect().left;
        let shiftY = event.clientY - dragElement.getBoundingClientRect().top;
  
        dragElement.style.position = 'absolute';
        dragElement.style.zIndex = 1000;
        document.body.append(dragElement);
  
        moveAt(event.pageX, event.pageY);
  
        function moveAt(pageX, pageY) {
          dragElement.style.left = pageX - shiftX + 'px';
          dragElement.style.top = pageY - shiftY + 'px';
        }
  
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
  
          dragElement.hidden = true;
          let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
          dragElement.hidden = false;
  
          if (!elemBelow) return;
  
          let droppableBelow = elemBelow.closest('.droppable');
          if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
              leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
              enterDroppable(currentDroppable);
            }
          }
        }
  
        document.addEventListener('mousemove', onMouseMove);
  
        dragElement.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          dragElement.onmouseup = null;
        };
  
      };

      // Quand un ingrédient est glissé dans la zone du verre
    function enterDroppable(elem) {
      // On change la couleur du fond
      elem.style.background = '#CA5D36';
      // Si l'ingrédient n'est pas déjà présenrt dans la liste on l'y ajoute
      if(!listIngredient.includes(dragElement.id)) {
        listIngredient.push(dragElement.id);
      }
    }

    // Quand un ingrédient est glissé hors de la zone du verre
    function leaveDroppable(elem) {
      // On enlève la couleur du fond
      elem.style.background = ''
      // On retire l'ingrédient de la liste
      listIngredient = listIngredient.filter((ing) => ing !== dragElement.id)
    }

    dragElement.ondragstart = function() {
      return false;
    };

  }
});
