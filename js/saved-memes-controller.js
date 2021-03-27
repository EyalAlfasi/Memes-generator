'use strict'

function renderSavedMemes() {
    const elMemesInnerContainer = document.querySelector('.saved-memes-inner-container');
    const elMemesContainerTitle = document.querySelector('.saved-memes-container h2');
    const memes = getSavedMemes();
    elMemesContainerTitle.innerText = !memes.length ? 'No saved memes yet!' : 'Edit or download your saved memes!'
    let strHTMLs = memes.map(meme => {
        return `<div class="saved-meme-preview">
                    <img src="${meme.url}" onclick="loadSavedMeme('${meme.memeId}')">
                    <span onclick="onDeleteSavedMeme('${meme.memeId}')">Delete</span>
                </div>`
    }).join('');
    elMemesInnerContainer.innerHTML = strHTMLs;
}


function loadSavedMeme(memeId) {
    const meme = getCurrSavedMemeById(memeId);
    console.log(meme);
    setCurrMeme(meme.memeData);
    hideSavedMemes();
    showEditor();
    drawCanvas();
}

function onSavedMemesClick() {
    hideEditor();
    hideImgGallery();
    showSavedMemes();
    renderSavedMemes();
}

function onDeleteSavedMeme(memeId) {
    deleteSavedMeme(memeId);
    renderSavedMemes();
}

function hideSavedMemes() {
    document.querySelector('.saved-memes-container').style.display = 'none';
}

function showSavedMemes() {
    document.querySelector('.saved-memes-container').style.display = 'block';
}