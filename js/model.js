/**
 * Classe Alchimix
 * (Modèle stockant les infos nécessaires à la création de cocktails)
 */
export class Alchimix {

//Attributs
/**
 * Expression actuelle de la recherche
 * @type {string}
 */
_input;

/**
 * Favoris
 * @type {Array}
 */
_favoris; 

//Méthodes

/**
   * Constructeur de la classe Alchimix
   */
constructor() {
    this._input = "";
    this._favoris = Array();

  }

/***
 * Rechercher un cocktail par nom
 * @param {string} name
 * @returns {Array}
 */

 async searchByName(name) {  

      //On effectue l'appel AJAX avec await fetch car sinon le main n'obtient pas la réponse
      let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
          }
      })
      
      //On envoie le résultat au model
      if (!response.ok){
        throw new Error('Erreur HTTP : ' + response.status);
      }else{
          return await response.json();
        }
      }

}
