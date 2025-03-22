let btnFav = document.getElementById("btn-favori-recherche");
let btnIngredients = document.getElementById("btn-favori-ingredients");
let inputRecherche = document.getElementById("rechercheInput");

let tableauFav = 

inputRecherche.addEventListener("input", function(event) {

    console.log("Test d'activation.");
    btnFav.disabled = false;

    if (inputRecherche.value == "") {
        btnFav.disabled = true;
    }

    //if (inputRecherche.value == )
    
});

btnFav.addEventListener("click", function(event) {

    let newRechercheFav = inputRecherche.value;



});