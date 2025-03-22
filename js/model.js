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
   * Cocktails favoris
   * @type {Array}
   */
  _favoris;

  /**
   * Recherches favorites de cocktail
   * @type {Array}
   */
  _favorisRechercheCocktail;

  /**
   * Recherches favorites d'ingrédients
   * @type {Array}
   */
  _favorisRechercheIngredient;

  //Méthodes

  /**
  * Constructeur de la classe Alchimix
  */
  constructor() {
    this._input = "";
    this._favoris = Array();
    this._favorisRechercheCocktail = Array();
    this._favorisRechercheIngredient = Array();
  }

  /***
   * Rechercher un cocktail par nom
   * @param {string} name
   * @returns {Array}
   */

  async searchByName(name) {  
    
      //On effectue l'appel AJAX avec await fetch car sinon le main n'obtient pas la réponse
      let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + name);
      console.log(response);
      
      //On envoie le résultat au model
      if (!response.ok){
        consolelog(error);      
      }else{
        return await response.json();
      }

  }


  /**
   * Ajoute une recherche de cocktail aux favoris
   */
  addRechercheCocktail(recherche) {
    this._favorisRechercheCocktail.push(recherche);
  }

  /**
   * Ajoute une recherche d'ingrédient aux favoris
   */
  addRechercheIngredient(recherche) {
    this._favorisRechercheIngredient.push(recherche);
  }

  /**
   * Supprime une recherche de cocktail des favoris
   */
  deleteRechercheCocktail(recherche) {
    let position = this._favorisRechercheCocktail.indexOf(recherche);
    this._favorisRechercheCocktail.splice(position, 1);
  }

  /**
   * Supprime une recherche d'ingrédient des favoris
   */
  deleteRechercheIngredient(recherche) {
    let position = this._favorisRechercheIngredient.indexOf(recherche);
    this._favorisRechercheIngredient.splice(position, 1);
  }


  saveStateToClient() {

    // Enregistrer les recherches de cocktail favorites 
    if(this._favorisRechercheCocktail !== null) {
      localStorage.setItem("rechercheCocktail", JSON.stringify(this._favorisRechercheCocktail));
    } else {
      localStorage.setItem("rechercheCocktail", "");
    }

    // Enregistrer les recherches d'ingrédient favorites 
    if(this._favorisRechercheIngredient !== null) {
      localStorage.setItem("rechercheIngredient", JSON.stringify(this._favorisRechercheIngredient));
    } else {
      localStorage.setItem("rechercheIngredient", "");
    }
   
  }

  retrieveStateFromClient() {

    // Récupérer les recherches de cocktail favorites 
    let chaineRechercheCocktail = localStorage.getItem("rechercheCocktail");
    if (chaineRechercheCocktail !== null) {
      this._favorisRechercheCocktail = JSON.parse(chaineRechercheCocktail);
    }

    // Récupérer les recherches d'ingrédients favorites 
    let chaineRechercheIngredient = localStorage.getItem("rechercheIngredient");
    if (chaineRechercheIngredient !== null) {
      this._favorisRechercheIngredient = JSON.parse(chaineRechercheIngredient);
    }

  }


}



