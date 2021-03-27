'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gCurrKeyWord;
var gImgs = [
    { id: '101', url: 'meme-imgs-square/1.jpg', keywords: ['happy', 'sad', 'fun'] },
    { id: '102', url: 'meme-imgs-square/2.jpg', keywords: ['sad'] },
    { id: '103', url: 'meme-imgs-square/3.jpg', keywords: ['crazy'] },
    { id: '104', url: 'meme-imgs-square/4.jpg', keywords: ['fun'] },
    { id: '105', url: 'meme-imgs-square/5.jpg', keywords: ['music', 'crazy'] },
    { id: '106', url: 'meme-imgs-square/6.jpg', keywords: ['happy'] },
    { id: '107', url: 'meme-imgs-square/7.jpg', keywords: ['sad', 'programming'] },
    { id: '108', url: 'meme-imgs-square/8.jpg', keywords: ['crazy'] },
    { id: '109', url: 'meme-imgs-square/9.jpg', keywords: ['fun', 'programming'] },
    { id: '110', url: 'meme-imgs-square/10.jpg', keywords: ['music'] },
    { id: '111', url: 'meme-imgs-square/11.jpg', keywords: ['happy'] },
    { id: '112', url: 'meme-imgs-square/12.jpg', keywords: ['sad'] },
    { id: '113', url: 'meme-imgs-square/13.jpg', keywords: ['crazy', 'music', 'fun'] },
    { id: '114', url: 'meme-imgs-square/14.jpg', keywords: ['fun'] },
    { id: '115', url: 'meme-imgs-square/15.jpg', keywords: ['music'] },
    { id: '116', url: 'meme-imgs-square/16.jpg', keywords: ['happy'] },
    { id: '117', url: 'meme-imgs-square/17.jpg', keywords: ['sad'] },
    { id: '118', url: 'meme-imgs-square/18.jpg', keywords: ['crazy'] },
];

function getCurrImgById() {
    return gImgs.find(img => img.id === gMeme.selectedImgId)
}

function getImgsGallery() {
    if (!gCurrKeyWord) return gImgs;
    let filteredKeywords = gImgs.filter(img => {
        return (img.keywords.findIndex(keyword => {
            return gCurrKeyWord === keyword;
        }) !== -1)
    })
    return filteredKeywords;
}

function setKeywordFilter(keyword) {
    gCurrKeyWord = keyword;
}

function getKeywords() {
    let keywords = gImgs.reduce((acc, img) => {
        acc.push(...img.keywords);
        return acc;
    }, []);

    let newKeyWords = [];

    keywords.forEach(keyword => {
        const keywordIdx = newKeyWords.findIndex(currKeyword => {
            return currKeyword === keyword;
        });
        if (keywordIdx === -1) newKeyWords.push(keyword);
    })
    return newKeyWords;
}