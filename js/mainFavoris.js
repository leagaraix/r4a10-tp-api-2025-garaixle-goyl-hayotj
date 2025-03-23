import { alchimix } from './model.js';
import { viewFavoris} from './view.js';

//Déclaration des éléments du model
let listIngredient = []

// Récupération des données du LocalStorage
alchimix.retrieveStateFromClient();