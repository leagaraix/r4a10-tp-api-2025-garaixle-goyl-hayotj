// Import des modules nécessaires
import { Alchimix } from './model.js';
import { view } from './view.js';

let alchimix = new Alchimix();
let listIngredient = []

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
});

view.btnCreate.addEventListener("click", function(event) {

  if (listIngredient.length != 0) {
    if (false) { // insérer condition cocktail existant
      // insérer image cocktail existant
    } else {
      view.imageCrea.src = "images/crea" + Math.floor(Math.random() * 4) + ".png"
    }
    view.dialogCrea.showModal();

    view.btnFermerCrea.addEventListener("click", function(event) {
      view.dialogCrea.close();
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