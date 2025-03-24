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
    
    //On remet le champ vide
    viewRecherche.resultatContainer.innerHTML = "";
    viewRecherche.attenteGif.style.display = "block";

    const dataByName = await alchimix.searchByName(viewRecherche.rechercheInput.value);
    

    const dataByIngredient = await alchimix.searchByIngredient(viewRecherche.rechercheInput.value);
    console.log(dataByIngredient);
    //On met à jour la vue
    if((dataByName.drinks == null && dataByIngredient.drinks == "no data found")  || (dataByName.drinks == "no data found" && dataByIngredient.drinks == "no data found") || (dataByName == undefined && dataByIngredient.drinks == undefined)){
        viewRecherche.resultatContainer.innerHTML = "<div><p>Aucun cocktail n'a été trouvé</p></div>"
    }else{
        
        if(dataByName.drinks !=null ){
            //On ajoute une div pour chaque résultat par nom
            for(let i=0; i < dataByName.drinks.length; i++){
                viewRecherche.resultatContainer.innerHTML += "<div class='cocktail-affichage' id='"  +dataByName.drinks[i].idDrink +  "'><img src=\"" + dataByName.drinks[i].strDrinkThumb + "/small"+"\"/> <p>" + dataByName.drinks[i].strDrink + "</p></div>"
            }
        }
        
        if(dataByIngredient.drinks != "no data found"){
            //On ajoute une div pour chaque résultat par nom
            for(let j=0; j < dataByIngredient.drinks.length; j++){
                /* Vérifieer que l'element n'est pas déjà affiché
                if((dataByName.drinks.find((elem) => elem.id == dataByIngredient.drinks[j].id)) == undefined){
                }
                */    
                    viewRecherche.resultatContainer.innerHTML += "<div class='cocktail-affichage'> <img src=\"" + dataByIngredient.drinks[j].strDrinkThumb + "/small"+"\"/> <p>" + dataByIngredient.drinks[j].strDrink + "</p> </div>"
                
            }
        }
        
    }
    viewRecherche.attenteGif.style.display = "none";
    //Ajout de l'affichage des cocktails avec click
    for (let elem of viewRecherche.cocktailAffichage) {
        elem.addEventListener('click', async (event) =>{
            // recuperation de l'id
            console.log(elem.id);
        let idCocktail = elem.id;

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
    };
});

//Recherche suite au chargement de la page
if(viewRecherche.rechercheInput != ""){
    viewRecherche.rechercheButton.click();
}

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


