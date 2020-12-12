'use strict'

var gCanvas;
var gCtx;
var isMouseDown = false;


function init() {
    gCanvas = document.querySelector('.main-canvas');
    addCanvasEventListeners();
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = '400';
    gCanvas.height = '400';
    renderImgsGallery();
}

function galleryPageLink() {
    window.location = 'index.html';
}

function onControlBtnClick(actionName) {
    switch (actionName) {
        case 'increase-font': {
            setFontSize(2);
        }
            break
        case 'decrease-font': {
            setFontSize(-2);
        }
            break
        case 'align-right': {
            onAlignText('start');
        }
            break
        case 'align-center': {
            onAlignText('center');
        }
            break
        case 'align-left': {
            onAlignText('end');
        }
            break
        case 'add': {
            onAddLine();
        }
            break
        case 'up-down': {
            onMoveBetweenLines();
        }
            break
        case 'trash': {
            onDeleteLine();
        }
            break
    }
    clearCanvas();
    drawCanvas();
}

function drawCanvas() {
    drawImg();
    drawText();
}

function drawText() {
    const meme = getCurrMeme()
    if (!meme) return;
    meme.lines.forEach((line, idx) => {
        const location = line.location;
        gCtx.lineWidth = `${line.strokeWidth}`
        gCtx.font = `${line.size}px Impact`
        gCtx.textAlign = `${line.align}`
        gCtx.textBaseline = "top";
        gCtx.fillStyle = `${line.color}`;
        gCtx.strokeStyle = `${line.strokeColor}`;
        const txtWidth = gCtx.measureText(line.txt).width;
        gCtx.fillText(line.txt, location.x, location.y)
        gCtx.strokeText(line.txt, location.x, location.y)
        if (meme.selectedLineIdx === idx) {
            setLineLocation({ x: location.x, y: location.y, width: txtWidth, height: line.size + 10 });
        }
        if (line.isMarked) drawFrame(line);
    });
}

function onImgPick(imgId) {
    createMeme(imgId);
    showEditor();
    hideImgGallery();
    drawCanvas();
}

function drawFrame(line) {
    const location = line.location;
    const alignment = line.align;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `white`;
    if (alignment === 'center') gCtx.strokeRect(location.x - (location.width / 2) - 10, location.y, location.width + 20, location.height);
    else if (alignment === 'start') gCtx.strokeRect(location.x - 10, location.y, location.width + 20, location.height);
    else gCtx.strokeRect(location.x - location.width - 10, location.y, location.width + 20, location.height);

}

function drawImg() {
    const imgObj = getCurrImgById();
    var img = new Image();
    img.src = `${imgObj.url}`;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
}

function onLineTyping(txt) {
    const line = getCurrLine();
    if (line.isMarked) {
        setLineTxt(txt)
        clearCanvas();
        drawCanvas(txt);
    }
}

function renderImgsGallery() {
    const elImgsContainer = document.querySelector('.imgs-gallery-inner-container');
    const imgs = getImgsGallery();
    let strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" onclick="onImgPick(${img.id})">`
    }).join('');
    elImgsContainer.innerHTML = strHTMLs;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function addCanvasEventListeners() {
    gCanvas.addEventListener('click', onMarkLine);
    gCanvas.addEventListener('mousemove', onDragLine);
}

function onMarkLine(ev) {
    const offset = { x: ev.offsetX, y: ev.offsetY };
    const line = getLineClicked(offset)
    if (!line) {
        unMarkAllLines();
        drawCanvas();
        return
    }
    updateSelectedLineIdx(offset)
    unMarkAllLines();
    toggleLineMark();
    drawCanvas();
}

function onDragLine(ev) {
    const offset = { x: ev.offsetX, y: ev.offsetY };
    const line = getLineClicked(offset)
    if (line && isMouseDown) {
        setLineLocation({ x: offset.x, y: offset.y - line.location.height / 2, width: line.location.width, height: line.location.height });
        drawCanvas();
    }
}


function onAlignText(alignVal) {
    setTextAlignment(alignVal);
}

function onAddLine() {
    unMarkAllLines();
    addLine();
}

function onMoveBetweenLines() {
    moveBetweenLines();
}

function updateMouseDown(val) {
    isMouseDown = val;
}

function updateTouchDown(val) {
    isTouchDown = val;
    console.log(isTouchDown);
}

function showEditor() {
    document.querySelector('.canvas-and-controlles-container').style.display = 'flex';
}

function hideImgGallery() {
    document.querySelector('.imgs-gallery-container').style.display = 'none';
}

function onDeleteLine() {
    deleteLine();
}

function onStrokeColorChange(color) {
    strokeColorChange(color);
    drawCanvas();
}

function onFontColorChange(color) {
    fontColorChange(color);
    drawCanvas();
}

function onStrokeWidthChange(width) {
    strokeWidthChange(width);
    drawCanvas();
}

function downloadImg(elLink) {
elLink.href = gCanvas.toDataURL();
elLink.download = 'my-meme.jpeg';
}

function toggleMenu() {
    document.body.classList.toggle('open-menu');
}