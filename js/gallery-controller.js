'use strict'

function galleryPageLink() {
    window.location = 'index.html';
}

function onImgPick(imgId) {
    createMeme(imgId);
    showEditor();
    hideImgGallery();
    drawCanvas();
}

function renderImgsGallery() {
    const elImgsContainer = document.querySelector('.imgs-gallery-inner-container');
    const imgs = getImgsGallery();
    let strHTMLs = imgs.map(img => {
        return `<img src="${img.url}" onclick="onImgPick(${img.id})">`
    }).join('');
    elImgsContainer.innerHTML = strHTMLs;
}

function renderImgsKeywords() {
    const elKeywordsContainer = document.querySelector('.keywords');
    const keywords = getKeywords();
    let strHTMLs = keywords.map(keyword => {
        return `<span class="keyword" onclick="onFilterImgs(this)">${keyword}</span>\n`
    }).join('');
    elKeywordsContainer.innerHTML = strHTMLs;
}

function onFilterImgs(elKeyword){
    const keyword = elKeyword.innerText;
    setKeywordFilter(keyword);
    renderImgsGallery();
}

function hideImgGallery() {
    document.querySelector('.imgs-gallery-container').style.display = 'none';
}