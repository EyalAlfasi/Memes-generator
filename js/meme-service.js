'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'meme-imgs-square/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs-square/2.jpg', keywords: ['sad'] },
    { id: 3, url: 'meme-imgs-square/3.jpg', keywords: ['crazy'] },
    { id: 4, url: 'meme-imgs-square/4.jpg', keywords: ['fun'] },
    { id: 5, url: 'meme-imgs-square/5.jpg', keywords: ['Music'] },
];
var gMeme;


function getCurrImgById() {
    var imgId = gMeme.selectedImgId;
    return gImgs.find(img => img.id === imgId)
}

function getImgsGallery() {
    return gImgs;
}

function setCurrMemeImg(imgId) {
    gMeme.selectedImgId = imgId;
}

function getCurrMeme() {
    return gMeme;
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt;
}

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Caption',
                size: 20,
                align: 'center',
                color: 'white'
            }
        ]
    }
}