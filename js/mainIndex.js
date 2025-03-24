// Import des modules nécessaires
import { alchimix } from './model.js';
import { viewIndex, viewRecherche } from './view.js';
import { RecherchesFavorites } from './rechercheFavorites.js';

//Déclaration des éléments du model
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();

// ### Gestion des recherches favorites
new RecherchesFavorites(viewIndex);

// Remplissage des ingrédients par défauts aléatoirement
viewIndex.resultatIngredients.innerHTML = "";
for (let i=0; i < 4; i++) {
  let divGrid = document.createElement("div");
  
  for(let j=0; j < 4; j++) {
    let idIng = Math.floor(Math.random() * 616);
    let randomIng = await alchimix.searchIngredientById(idIng);

    // Certains id ne renvoient rien, on recommence donc jusqu'à en avoir un bon
    while (randomIng.ingredients == null) {
      let idIng = Math.floor(Math.random() * 616);
      randomIng = await alchimix.searchIngredientById(idIng);
    }

    // Remplissage de l'image qui sera affichée dans le grid
    let imgIng = document.createElement("img");
    imgIng.src = 'https://www.thecocktaildb.com/images/ingredients/' + (randomIng.ingredients[0].strIngredient).toLowerCase() + '-small.png';
    imgIng.id = randomIng.ingredients[0].strIngredient;
    imgIng.className = "ingredient";
    imgIng.setAttribute("title", randomIng.ingredients[0].strIngredient);
    
    divGrid.appendChild(imgIng);
  }
  viewIndex.resultatIngredients.appendChild(divGrid);
}

// ###Redirection vers la recherche

function search(event)  {
  alchimix.setInput(viewIndex.rechercheInput.value);
  alchimix.saveStateToClient();
  window.location = "./recherche.html";
}

viewIndex.rechercheButton.addEventListener("click", function(event) {
  search(event);
} )

viewIndex.rechercheInput.addEventListener("keydown", function(event) {
  if (event.code === "Enter") {
    search(event);
  }
})

// ### Création de cocktails

let prefixCocktails = ["Dynamo", "Tonic", "Ti'", "Royal"];

viewIndex.btnCreate.addEventListener("click", async function(event) {

  if (listIngredient.length != 0) {
    //const cocktailExist = await alchimix.searchByIngredientsList(["sugar", "water"]);
    const cocktailExist = null;

    // Mise à jour de l'image et du nom du cocktail créé en fonction de si celui-ci existe déjà ou non
    if (cocktailExist != null) {
      viewIndex.imageCrea.src = dataCocktail.drinkThumb;
      viewIndex.nomCrea.textContent = dataCocktail.strDrink;
    } else {
      viewIndex.imageCrea.src = "images/crea" + Math.floor(Math.random() * 4) + ".png"
      viewIndex.nomCrea.textContent = prefixCocktails[Math.floor(Math.random() * 4)] + " " + listIngredient[Math.floor(Math.random() * (listIngredient.length-1))]
    }

    // On vide l'affichage de la liste d'ingrédient précédente
    while (viewIndex.paraCrea.firstChild ) {
      viewIndex.paraCrea.removeChild(viewIndex.paraCrea.firstChild );
    }

    // Ajout des ingrédients à l'affichage
    let paraIngredients = document.createElement("p");
    
    // Liste miroir pour que la suppression du premier ingrédient liée à l'affichage ne gène pas
    let listeMiroir = [...listIngredient];
    paraIngredients.textContent = listeMiroir[0];
    listeMiroir.shift();
    for (let ingredient of listeMiroir) {
      paraIngredients.textContent = paraIngredients.textContent + " ; " + ingredient;
    }
    viewIndex.paraCrea.appendChild(paraIngredients);
    viewIndex.dialogCrea.showModal();

    viewIndex.btnFermerCrea.addEventListener("click", function(event) {
      viewIndex.dialogCrea.close();
    })
  }
});

// ### Recherche d'ingrédients
viewIndex.rechercheIngredientButton.addEventListener("click", async function(){
  //On remet le champ vide
  viewIndex.resultatIngredients.innerHTML = "";
  viewIndex.attenteGif.style.display = "block";
  const resultIngredient = await alchimix.searchInngredientByName(viewIndex.rechercheIngredientInput.value);
  //On met à jour la vue
  if (resultIngredient.ingredients == null) {
    viewIndex.resultatIngredients.innerHTML = "<div><p>Aucun ingrédient n'a été trouvé</p></div>"
  } else {
    
    if(resultIngredient.ingredients !=null ){
        //On ajoute une div pour chaque résultat par nom
        for(let i=0; i < resultIngredient.ingredients.length; i++){
            viewIndex.resultatIngredients.innerHTML += '<img id=' + resultIngredient.ingredients[i].strIngredient + ' class="ingredient" src="https://www.thecocktaildb.com/images/ingredients/' + (resultIngredient.ingredients[i].strIngredient).toLowerCase() + '-small.png">'
        }
    }
  }

  viewIndex.attenteGif.style.display = "none";
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
