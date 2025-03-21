let currentDroppable = null;
let isDragging = false;

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.ingredient');

    dragElement.onmousedown = function(event) {

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
          if (currentDroppable) { // null lorsque nous étions sur un élément déposable avant cet évènement
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) { // null si nous ne n'atterrissions pas sur un élément déposable maintenant
            // (peut être a juste quitte l'objet déposable)
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

    function enterDroppable(elem) {
        elem.style.background = '#CA5D36';
    }

    function leaveDroppable(elem) {
      elem.style.background = '';
    }

    dragElement.ondragstart = function() {
      return false;
    };
});