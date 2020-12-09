'use strict'

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('.main-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = '500';
    gCanvas.height = '500';
    renderImgsGallery();
}



function drawCanvas() {
    const meme = getCurrMeme();
    const img = getCurrImgObjById(meme.selectedImgId);
}

function drawText() {
    var text = getCurrMeme()
    const width = gCanvas.width / 2;
    const height = gCanvas.height / 2 * 0.25;
    gCtx.lineWidth = '1'
    gCtx.font = '40px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text.lines[0].txt, width, height)
    gCtx.strokeStyle = 'red';
    gCtx.strokeText(text.lines[0].txt, width, height)
}

function onImgPick(imgId) {
    createMeme(imgId);
    drawImg();
}

function drawImg() {
    const imgObj = getCurrImgById();
    var img = new Image();
    img.src = `${imgObj.url}`;

        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend

}

function onLineTyping(txt) {
    setLineTxt(txt)
    clearCanvasAndKeepImg();
    drawText(txt);
}

function renderImgsGallery() {
    const elImgsContainer = document.querySelector('.imgs-gallery-inner-container');
    const imgs = getImgsGallery();
    let strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" onclick="onImgPick(${img.id})">`
    }).join('');
    elImgsContainer.innerHTML = strHTMLs;
}

function onControlBtnClick(btnName) {
    switch (btnName) {
        case 'add': {

        }
    }
}

function clearCanvasAndKeepImg() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImg();
}