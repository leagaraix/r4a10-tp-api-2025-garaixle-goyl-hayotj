import { Alchimix } from './model.js';
import { viewRecherche } from './view.js';

//Déclaration des éléments du model
let alchimix = new Alchimix();
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();

// ### Recherche #
// - Gestion de la saisie au clavier
viewRecherche.rechercheButton.addEventListener("click", async (evt) => {
    // Lance la recherche
    const dataByName = await alchimix.searchByName(viewRecherche.rechercheInput.value);
    console.log(dataByName.drinks);
    const dataByIngredient = await alchimix.searchByIngredient(viewRecherche.rechercheInput.value);
  console.log(dataByIngredient.drinks);
    //On met à jour la vue
    if(dataByName.drinks == null && dataByIngredient.drinks == "no data found"){
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