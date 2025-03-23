import { alchimix } from './model.js';
import { viewRecherche } from './view.js';
import { RecherchesFavorites } from './rechercheFavorites.js';

//Déclaration des éléments du model
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();

// ### Gestion des recherches favorites

new RecherchesFavorites(viewRecherche);

//Pour rechercher depuis l'index
viewRecherche.rechercheInput.value = alchimix.getInput();



// ### Recherche #
// - Gestion de la saisie au clavier
viewRecherche.rechercheButton.addEventListener("click", async (evt) => {
    // Lance la recherche
    alchimix.setInput(rechercheInput.value);
    alchimix.saveStateToClient();
    const dataByName = await alchimix.searchByName(viewRecherche.rechercheInput.value);
    console.log(dataByName);

    const dataByIngredient = await alchimix.searchByIngredient(viewRecherche.rechercheInput.value);

    //On met à jour la vue
    if((dataByName.drinks == null && dataByIngredient.drinks == null)  || (dataByName.drinks == "no data found" && dataByIngredient.drinks == "no data found") || (dataByName == undefined && dataByIngredient.drinks == undefined)){
        viewRecherche.resultatContainer.innerHTML = "<div><p>Aucun cocktail n'a été trouvé</p></div>"
    }else{
        //On remet le champ vide
        viewRecherche.resultatContainer.innerHTML = "";
        if(dataByName.drinks !=null ){
            //On ajoute une div pour chaque résultat par nom
            for(let i=0; i < dataByName.drinks.length; i++){
                viewRecherche.resultatContainer.innerHTML += "<div> <img src=\"" + dataByName.drinks[i].strDrinkThumb + "/small"+"\"/> <p>" + dataByName.drinks[i].strDrink + "</p> </div>"
            }
        }
        
        if(dataByIngredient.drinks != "no data found"){
            //On ajoute une div pour chaque résultat par nom
            for(let j=0; j < dataByIngredient.drinks.length; j++){
                viewRecherche.resultatContainer.innerHTML += "<div> <img src=\"" + dataByIngredient.drinks[j].strDrinkThumb + "/small"+"\"/> <p>" + dataByIngredient.drinks[j].strDrink + "</p> </div>"
            }
        }
            
    }
    
  });
  //Recherche suite au chargement de la page
  if(viewRecherche.rechercheInput != ""){
  viewRecherche.rechercheButton.click();
  }