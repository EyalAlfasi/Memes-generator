'use strict'

var canvas = document.querySelector('.main-canvas');

canvas.addEventListener("touchstart", function (ev) {
    const mousePos = getTouchPos(ev);
    ev.preventDefault();
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: mousePos.x,
        clientY: mousePos.y
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (ev) {
    var mouseEvent = new MouseEvent("mouseup", {});
    ev.preventDefault();
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (ev) {
    const mousePos = getTouchPos(ev);
    ev.preventDefault();
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: mousePos.x,
        clientY: mousePos.y
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(touchEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX + rect.left,
        y: touchEvent.touches[0].clientY + rect.top
    };
}

