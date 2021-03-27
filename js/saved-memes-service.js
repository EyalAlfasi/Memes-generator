'use strict'

var gSavedMemes = [];
const savedMemesKey = "SAVED_MEMES_DB"

function saveMeme(memeImgURL) {
    const memeData = getCurrMeme();
    console.log(memeData);
    const newMemeData = JSON.stringify(memeData);
    gSavedMemes.push({ memeId: makeId(), url: memeImgURL, memeData: JSON.parse(newMemeData) });
    saveToStorage(savedMemesKey, gSavedMemes)
}

function getSavedMemes() {
    return gSavedMemes;
}

function loadSavedMemes() {
    gSavedMemes = loadFromStorage(savedMemesKey) ? loadFromStorage(savedMemesKey) : [];
}

function getCurrSavedMemeById(memeId) {
    return gSavedMemes.find(meme => meme.memeId === memeId)
}

function deleteSavedMeme(memeId) {
    console.log(memeId);
    gSavedMemes = gSavedMemes.filter(meme => meme.memeId !== memeId)
    saveToStorage(savedMemesKey, gSavedMemes)
}