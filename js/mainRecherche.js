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
viewIndex.rechercheButton.addEventListener("click", async (evt) => {
  // Lance la recherche
  const dataByName = await alchimix.searchByName(viewIndex.rechercheInput.value);
  console.log(dataByName.drinks);
  const dataByIngredient = await alchimix.searchByIngredient(viewIndex.rechercheInput.value);

  //On met à jour la vue
});
