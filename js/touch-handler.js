'use strict'

var canvas = document.querySelector('.main-canvas');



canvas.addEventListener("touchstart", function (ev) {
    const mousePos = getTouchPos(canvas, ev);
    var touch = ev.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (ev) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (ev) {
    var touch = ev.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

document.body.addEventListener("touchstart", function (ev) {
    if (ev.target == gCanvas) {
        ev.preventDefault();
    }
}, false);
document.body.addEventListener("touchend", function (ev) {
    if (ev.target == gCanvas) {
        ev.preventDefault();
    }
}, false);
document.body.addEventListener("touchmove", function (ev) {
    if (ev.target == gCanvas) {
        ev.preventDefault();
    }
}, false);