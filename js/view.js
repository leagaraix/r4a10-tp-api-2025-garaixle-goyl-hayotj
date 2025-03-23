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
  
  btnCreate: document.getElementById("btn-valider-creation"),
  dialogCrea: document.getElementById("resultat-cocktail"),
  imageCrea: document.getElementById("img-creation"),
  btnFermerCrea: document.getElementById("btn-fermer-crea"),
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
  
    // ! J'ai commenté cette ligne parce qu'elle provoquait une erreur
    //resultatContainer : document.getElementById("grid-cocktails"),

};

/**
 * Objet constant représentant la vue des favoris
 */
export const viewFavoris = {


};