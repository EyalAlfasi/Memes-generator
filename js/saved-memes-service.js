'use strict'

var gSavedMemes = [];
var gSavedMemeNextId = 101;

function saveMeme(memeImgURL) {
    const memeData = getCurrMeme();
    gSavedMemes.push({ memeId: gSavedMemeNextId++, url: memeImgURL, memeData: {...memeData} });
}

function getSavedMemes() {
    return gSavedMemes;
}

function getCurrSavedMemeById(memeId) {
    return gSavedMemes.find(meme => meme.memeId === parseInt(memeId))
}