/**
 * Objet constant représentant la vue.
 */
export const view = {

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