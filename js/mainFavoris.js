import { Alchimix } from './model.js';
import { viewFavoris} from './view.js';

//Déclaration des éléments du model
let alchimix = new Alchimix();
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();