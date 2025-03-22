let currentDroppable = null;
let listIngredient = []
const buttonCreate = document.getElementById("btn-valider-creation");

buttonCreate.addEventListener("click", (event) => {
  // Insérer vérification que le cocktail existe ou non
  // Insérer cas ou le cocktail existe
  
});

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.ingredient');

    dragElement.onmousedown = function(event) {

      // On corrige la distance entre le pointeur de la souris et le centre de l'ingrédient
      let shiftX = event.clientX - dragElement.getBoundingClientRect().left;
      let shiftY = event.clientY - dragElement.getBoundingClientRect().top;

      dragElement.style.position = 'absolute';
      dragElement.style.zIndex = 1000;
      document.body.append(dragElement);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        dragElement.style.left = pageX - shiftX + 'px';
        dragElement.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        dragElement.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        dragElement.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
          if (currentDroppable) {
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            enterDroppable(currentDroppable);
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      dragElement.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        dragElement.onmouseup = null;
      };

    };

    // Quand un ingrédient est glissé dans la zone du verre
    function enterDroppable(elem) {
        // On change la couleur du fond
        elem.style.background = '#CA5D36';
        // Si l'ingrédient n'est pas déjà présenrt dans la liste on l'y ajoute
        if(!listIngredient.includes(dragElement.id)) {
          listIngredient.push(dragElement.id);
        }
    }

    // Quand un ingrédient est glissé hors de la zone du verre
    function leaveDroppable(elem) {
      // On enlève la couleur du fond
      elem.style.background = ''
      // On retire l'ingrédient de la liste
      listIngredient = listIngredient.filter((ing) => ing !== dragElement.id)
    }

    dragElement.ondragstart = function() {
      return false;
    };
});