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

  // Méthodes

  /**
   * Constructeur de la classe Alchimix
   */
  constructor() {
    this._input = "";
    this._favoris = Array();
    this._favorisRechercheCocktail = Array();
    this._favorisRechercheIngredient = Array();
  }

  /* GESTION DES RECHERCHES FAVORITES */

  /**
   * Ajoute une recherche de cocktail aux favoris
   */
  addRechercheCocktail(recherche) {
    if(this._favorisRechercheCocktail.indexOf(recherche) === -1) {
      this._favorisRechercheCocktail.push(recherche);
      this.saveStateToClient();
    }
  }

  /**
   * Ajoute une recherche d'ingrédient aux favoris
   */
  addRechercheIngredient(recherche) {
    if(this._favorisRechercheCocktail.indexOf(recherche) === -1) {
      this._favorisRechercheIngredient.push(recherche);
      this.saveStateToClient();
    }
  }

  /**
   * Supprime une recherche de cocktail des favoris
   */
  deleteRechercheCocktail(recherche) {
    console.log("On accède à deleteRechercheCocktail().");
    let position = this._favorisRechercheCocktail.indexOf(recherche);
    this._favorisRechercheCocktail.splice(position, 1);
    this.saveStateToClient();
  }

  /**
   * Supprime une recherche d'ingrédient des favoris
   */
  deleteRechercheIngredient(recherche) {
    let position = this._favorisRechercheIngredient.indexOf(recherche);
    this._favorisRechercheIngredient.splice(position, 1);
    this.saveStateToClient();
  }

  /**
   * Vérifie si la recherche se trouve dans la liste des recherches favorites
   */
  checkFav(recherche) {
    return (this._favorisRechercheCocktail.indexOf(recherche) !== -1);
  }

  /* GESTION DU LOCAL STORAGE */

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

  //Méthodes de recherches

  /***
   * Rechercher un cocktail par nom
   * @param {string} name
   * @returns {Array}
   */

  async searchByName(name) {  
    
      //On effectue l'appel AJAX avec await fetch car sinon le main n'obtient pas la réponse
      let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + encodeURIComponent(name));
      console.log(response);
      
      //On envoie le résultat au model
      if (!response.ok){
        consolelog(error);      
      }else{
        return await response.json();
      }

  }

  /***
   * Rechercher un cocktail par ingrédient
   * @param {string} ingredient
   * @returns {Array}
   */

  async searchByIngredient(ingredient) {  
    
    //On effectue l'appel AJAX avec await fetch car sinon le main n'obtient pas la réponse
    let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + encodeURIComponent(ingredient));
    console.log(response);
    
    //On envoie le résultat au model
    if (!response.ok){
      consolelog(error);      
    }else{
      return await response.json();
    }
  }


  /***
   * Rechercher si un coctail existe ou non par une liste d'ingrédients, si oui on le renvoie, sinon, on renvoie null
   * @param {Array} ingredients
   * @returns {?Object}
   */

  async searchByIngredientsList(ingredients) { 
    
    let exist = true; //On part du principe que le cocktail existe

    //On recherche tous les cocktails contenant au moins le premier ingrédient
    //On effectue l'appel AJAX 
    let responseIngredient1 = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + encodeURIComponent(ingredients[0]));
    //on gère les erreurs s'il y en a
    if (!responseIngredient1.ok){
      consolelog(error);      
    }else{
    //sinon on traite la réponse
      let dataIngredient1= await responseIngredient1.json();
      //Si aucun cocktail ne contient le premier ingrédient, alors il n'existe aucun cocktail pareil, exist est mis à false
      if(dataIngredient1['drinks'] == "no data found"){
        exist = false;
      }


      //S'il y a des cocktails contenant le premier ingrédient
      //On vérifie pour chaque cocktail, s'il est bien dans la liste des autres ingrédients
      if(exist){
        let hasAllIngredients = true;

        //Pour chaque cocktail contenant le premier ingrédient
        dataIngredient1['drinks'].forEach(cocktail => {
          //Pour chaque ingrédient (sauf le premier)
          for(let i=1; i< count(ingredients); i++){
            //Si le cocktail a tous les ingrédients précédents
            if(hasAllIngredients){
              //on vérifie qu'il a cet ingrédient
              let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + encodeURIComponent(ingredients[i]));
              if (!response.ok){
                consolelog(error);      
              }else{
                let data = await response.json();

                //Si le cocktail n'est pas dans la liste contenant cet ingrédient, alors il ne correspond pas au mélange
                if(!cocktail in data['drinks']){
                  hasAllIngredients = false;
                }
              }
            }
          }
          //Si le cocktail a tous les ingrédients 
          if(hasAllIngredients){
            //On vérifie qu'il n'a pas d'ingrédient en plus
            let response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + encodeURIComponent(ingredients[i]));
            if (!response.ok){
              consolelog(error);      
            }else{
              let data = await response.json();
              
              //Si oui, on le renvoie
              if(data['drinks'][0]["strIngredient" + (count(ingredients) + 1).toString()] == null){
                return data['drinks'][0];
              }else{
                //Sinon
                exist = false;
              }
            }
          }
          
        })

      }
      //Si le cocktail n'existe pas on renvoie null
      if(!exist){
        return null;
      }
      
    }
  }
    

    
}




}



