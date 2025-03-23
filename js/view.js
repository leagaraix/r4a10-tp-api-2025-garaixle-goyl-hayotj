/**
 * Objet constant représentant la vue de l'index
 */
export const viewIndex = {

  //Main
  mainZone: document.getElementById("conteneur"),

  // Champ de recherche text
  rechercheInput: document.getElementById("rechercheInput"),

  // Bouton de recherche
  rechercheButton: document.getElementById("btn-lancer-recherche"),

  // Bouton favoris de la recherche de cocktails
  btnFav: document.getElementById("btn-favori-recherche"),

  // Image du bouton favoris
  imgBtnFav: document.getElementById("img-etoile"),

  // Liste des recherches favorites
  aucunFavoris: document.getElementById("aucun-favoris"),

  // Boîte modale de confirmation (et ses boutons)
  confirmation: document.getElementById("confirmation"),
  btnConfirmer: document.getElementById("confirmer-suppression"),
  btnAnnuler: document.getElementById("annuler-suppression"),
  
  // Boîte modale résultat cocktail
  btnCreate: document.getElementById("btn-valider-creation"),
  dialogCrea: document.getElementById("resultat-cocktail"),
  imageCrea: document.getElementById("img-creation"),
  nomCrea: document.getElementById("nom-crea"),
  paraCrea: document.getElementById("p-ingredients"),
  btnFermerCrea: document.getElementById("btn-fermer-crea"),

  divCrea : document.getElementById("resultat-cocktail-div"),

  rechercheIngredientInput : document.getElementById("recherche-ingredients"),
  rechercheIngredientButton : document.getElementById("btn-recherche-ingredients"),
  resultatIngredients : document.getElementById("grid-ingredients"),
};

/**
 * Objet constant représentant la vue de la recherche
 */
export const viewRecherche = {

  // Champ de recherche text
  rechercheInput: document.getElementById("rechercheInput"),

  // Bouton de recherche
  rechercheButton: document.getElementById("btn-lancer-recherche"),

  // Bouton favoris de la recherche de cocktails
  btnFav: document.getElementById("btn-favori-recherche"),

  // Image du bouton favoris
  imgBtnFav: document.getElementById("img-etoile"),

  // Liste des recherches favorites
  aucunFavoris: document.getElementById("aucun-favoris"),

  // Boîte modale de confirmation (et ses boutons)
  confirmation: document.getElementById("confirmation"),
  btnConfirmer: document.getElementById("confirmer-suppression"),
  btnAnnuler: document.getElementById("annuler-suppression"),

  // Test de récupération des détails d'un cocktail
  btnTestMargarita: document.getElementById("btn-test-margarita"),
  pageCocktail: document.getElementById("page-cocktail"),
  nomCocktail: document.getElementById("nom-cocktail"),
  alcoholicGlassCocktail: document.getElementById("alcoholic-glass-cocktail"),
  imgCocktail: document.getElementById("img-cocktail"),
  listeIngredients: document.getElementById("liste-ingredients-cocktail"),
  recetteCocktail: document.getElementById("recette-cocktail"),
  btnFermerRecette: document.getElementById("btn-fermer-recette"),
  
  // ! J'ai commenté cette ligne parce qu'elle provoquait une erreur
  resultatContainer : document.getElementById("grid-cocktails"),

};
