// Import des modules nécessaires
import { Alchimix } from './model.js';
import { view } from './view.js';


let alchimix = new Alchimix();

// ### Initialisation des listeners#
// - Gestion de la saisie au clavier
view.rechercheButton.addEventListener("click", (evt) => {
    console.log(view.rechercheInput.value);
    // Lance la recherche
    console.log(alchimix.searchByName(view.rechercheInput.value));
    // (La vue n'a pas besoin d'être mis à jour ici)
  });