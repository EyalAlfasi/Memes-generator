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
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setLineLocation(locationObj) {
    gMeme.lines[gMeme.selectedLineIdx]['location'] = locationObj;
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Caption',
                size: 40,
                align: 'center',
                color: 'black',
                strokeColor: 'white',
                strokeWidth: 2,
                marked: false
            }
        ]
    }
}

function getLineClicked(offset) {
    if (!gMeme) return
    const memeLines = gMeme.lines;
    return memeLines.find(line => {
        const location = line.location;
        const alignment = line.align;
        if (alignment === 'center') {
            return (offset.x > location.x - location.width / 2 && offset.x < location.x + location.width / 2
                && offset.y > location.y && offset.y < location.y + location.height)
        } else if (alignment === 'start') {
            return ((offset.x > location.x && offset.x < location.x + location.width) &&
                offset.y > location.y && offset.y < location.y + location.height)
        } else {
            return (offset.x < location.x && offset.x > location.x - location.width) &&
                (offset.y > location.y && offset.y < location.y + location.height)
        }
    })
}

function setTextAlignment(alignVal) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignVal;
}

function toggleLineMark(isMarked) {
    gMeme.lines[gMeme.selectedLineIdx].marked = isMarked;
    console.log(gMeme.lines[gMeme.selectedLineIdx].marked);
}

function addLine() {
    gMeme.lines.push(
        {
            txt: 'Caption',
            size: 40,
            align: 'center',
            color: 'black',
            strokeColor: 'white',
            strokeWidth: 2,
            marked: false
        }
    )
}