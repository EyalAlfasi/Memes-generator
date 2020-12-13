'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gCurrKeyWord;
var gImgs = [
    { id: 1, url: 'meme-imgs-square/1.jpg', keywords: ['happy', 'sad', 'fun'] },
    { id: 2, url: 'meme-imgs-square/2.jpg', keywords: ['sad'] },
    { id: 3, url: 'meme-imgs-square/3.jpg', keywords: ['crazy'] },
    { id: 4, url: 'meme-imgs-square/4.jpg', keywords: ['fun'] },
    { id: 5, url: 'meme-imgs-square/5.jpg', keywords: ['music', 'crazy'] },
    { id: 6, url: 'meme-imgs-square/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'meme-imgs-square/7.jpg', keywords: ['sad', 'programming'] },
    { id: 8, url: 'meme-imgs-square/8.jpg', keywords: ['crazy'] },
    { id: 9, url: 'meme-imgs-square/9.jpg', keywords: ['fun', 'programming'] },
    { id: 10, url: 'meme-imgs-square/10.jpg', keywords: ['music'] },
    { id: 11, url: 'meme-imgs-square/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'meme-imgs-square/12.jpg', keywords: ['sad'] },
    { id: 13, url: 'meme-imgs-square/13.jpg', keywords: ['crazy', 'music', 'fun'] },
    { id: 14, url: 'meme-imgs-square/14.jpg', keywords: ['fun'] },
    { id: 15, url: 'meme-imgs-square/15.jpg', keywords: ['music'] },
    { id: 16, url: 'meme-imgs-square/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'meme-imgs-square/17.jpg', keywords: ['sad'] },
    { id: 18, url: 'meme-imgs-square/18.jpg', keywords: ['crazy'] },
];

function getCurrImgById() {
    var imgId = gMeme.selectedImgId;
    return gImgs.find(img => img.id === imgId)
}

function getImgsGallery() {
    // if(!gCurrKeyWord) return gImgs;
    let filteredKeywords = gImgs.filter(img => {
        return (img.keywords.findIndex(keyword => {
            return gCurrKeyWord === keyword;
        }) !== -1)
    })
    return (filteredKeywords.length === 0) ? gImgs : filteredKeywords;
}

function setKeywordFilter(keyword) {
    gCurrKeyWord = keyword;
}

function getKeywords() {
    // let keywords = [];
    // gImgs.forEach(img => {
    //     keywords = [...keywords, ...img.keywords]
    // })

    let keywords = gImgs.reduce((acc, img) => {
        acc.push(...img.keywords);
        return acc;
    }, []);

    let newKeyWords = [];

    keywords.forEach(keyword => {
        // (newKeyWords.findIndex(currKeyword => {
        //     return currKeyword === keyword;
        // }) === -1) && newKeyWords.push(keyword);

        const keywordIdx = newKeyWords.findIndex(currKeyword => {
            return currKeyword === keyword;
        });
        if (keywordIdx === -1) newKeyWords.push(keyword);
    })
    return newKeyWords;
}