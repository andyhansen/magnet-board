$(document).ready(function() {

    // words come from api/words.js - to get around .json loading issues
    var magnetArea = $("#MagnetSidebar");
    $.each(words.categories, function (categoryName, categoryFields) {
        var magnetRow = $("<div/>").addClass("magnet-row");

        magnetRow.append($("<h3/>").text(categoryName))

        var colorForRow = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        categoryFields.forEach(function (categoryItem) {
            var text = $("<p/>").text(categoryItem);
            magnetRow.append($("<div/>").addClass("magnet").append(text).css("backgroundColor", colorForRow));
        });
        
        magnetArea.append(magnetRow);
    });

});


interact('.magnet')
  .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
          //restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: function (event) {
          $(event.target).addClass("moved")
      }
  });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;