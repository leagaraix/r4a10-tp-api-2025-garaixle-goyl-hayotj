import { alchimix } from './model.js';
import { viewRecherche } from './view.js';
import { RecherchesFavorites } from './rechercheFavorites.js';

//Déclaration des éléments du model
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();

// ### Gestion des recherches favorites

new RecherchesFavorites(viewRecherche);

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

// ### Affichage des détails d'un cocktail

viewRecherche.btnTestMargarita.addEventListener("click", async (evt) => {

    // ! Pour les tests 
    let idCocktail = 11007;

    const detailsCocktails = await alchimix.getCocktail(idCocktail);

    let id = detailsCocktails['idDrink'];

    // Eviter la duplication des <li> quand on réouvre le dialogue
    viewRecherche.listeIngredients.innerHTML = "";

    viewRecherche.pageCocktail.showModal();

    viewRecherche.nomCocktail.innerText = detailsCocktails['strDrink'];
    viewRecherche.alcoholicGlassCocktail.innerText = detailsCocktails['strAlcoholic'] + " ; " + detailsCocktails['strGlass'];
    viewRecherche.imgCocktail.setAttribute("src", detailsCocktails['strDrinkThumb']);
    
    // Récupérer les ingrédients et leurs mesures
    let i = 1;
    while (detailsCocktails['strIngredient' + i.toString()] !== null) {
        let li = document.createElement("li");
        li.textContent = (detailsCocktails['strMeasure' + i.toString()] != null ? detailsCocktails['strMeasure' + i.toString()] : "") + " " + detailsCocktails['strIngredient' + i.toString()];
        viewRecherche.listeIngredients.appendChild(li);
        i++;
    }

    // Afficher les instructions (en français de préférence, anglais sinon)
    if (detailsCocktails['strInstructionsFR'] != null) {
        viewRecherche.recetteCocktail.innerText = detailsCocktails['strInstructionsFR'];
    } else {
        viewRecherche.recetteCocktail.innerText = detailsCocktails['strInstructions'];
    }

    viewRecherche.btnFermerRecette.addEventListener("click", function(event) {
        viewRecherche.pageCocktail.close();
    })

})


