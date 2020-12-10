'use strict'

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('.main-canvas');
    addCanvasEventListeners();
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = '500';
    gCanvas.height = '500';
    renderImgsGallery();
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
    const x = gCanvas.width / 2;
    const y = gCanvas.height / 2 * 0.25;
    meme.lines.forEach(line => {
        gCtx.lineWidth = `${line.strokeWidth}`
        gCtx.font = `${line.size}px Impact`
        gCtx.textAlign = `${line.align}`
        gCtx.textBaseline = "top";
        gCtx.fillStyle = `${line.color}`;
        gCtx.strokeStyle = `${line.strokeColor}`;
        const txtWidth = gCtx.measureText(line.txt).width;
        gCtx.fillText(line.txt, x, y)
        gCtx.strokeText(line.txt, x, y)
        setLineLocation({ x: x, y: y, width: txtWidth, height: line.strokeWidth + line.size });
        if (line.marked) drawFrame(line);
        // drawPointer(x, y, txtWidth, line.strokeWidth + line.size)
    });
}

function onImgPick(imgId) {
    createMeme(imgId);
    drawCanvas();
}

function drawFrame(line) {
    const location = line.location;
    const alignment = line.align;
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
    setLineTxt(txt)
    clearCanvas();
    drawCanvas(txt);
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
    gCanvas.addEventListener('click', markCurrLine);
}


function markCurrLine(ev) {
    const offset = { x: ev.offsetX, y: ev.offsetY };
    const line = getLineClicked(offset)
    if (line && !line.marked) {
        toggleLineMark(true);
        drawCanvas();
    } else {
        toggleLineMark(false);
        drawCanvas();
    }
}

function onAlignText(alignVal) {
    setTextAlignment(alignVal);
}

function onAddLine() {
    addLine();
}