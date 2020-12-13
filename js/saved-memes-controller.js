'use strict'

function renderSavedMemes() {
    const elMemesContainer = document.querySelector('.saved-memes-inner-container');
    const memes = getSavedMemes();
    let strHTMLs = memes.map(meme => {
        return `<img src="${meme.url}" onclick="loadSavedMeme('${meme.memeId}')">`
    }).join('');
    elMemesContainer.innerHTML = strHTMLs;
}


function loadSavedMeme(memeId) {
    const meme = getCurrSavedMemeById(memeId);
    setCurrMeme(meme.memeData);
    drawCanvas();
}