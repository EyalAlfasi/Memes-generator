'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'meme-imgs-square/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs-square/2.jpg', keywords: ['sad'] },
    { id: 3, url: 'meme-imgs-square/3.jpg', keywords: ['crazy'] },
    { id: 4, url: 'meme-imgs-square/4.jpg', keywords: ['fun'] },
    { id: 5, url: 'meme-imgs-square/5.jpg', keywords: ['Music'] },
    { id: 6, url: 'meme-imgs-square/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'meme-imgs-square/7.jpg', keywords: ['sad'] },
    { id: 8, url: 'meme-imgs-square/8.jpg', keywords: ['crazy'] },
    { id: 9, url: 'meme-imgs-square/9.jpg', keywords: ['fun'] },
    { id: 10, url: 'meme-imgs-square/10.jpg', keywords: ['Music'] },
    { id: 11, url: 'meme-imgs-square/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'meme-imgs-square/12.jpg', keywords: ['sad'] },
    { id: 13, url: 'meme-imgs-square/13.jpg', keywords: ['crazy'] },
    { id: 14, url: 'meme-imgs-square/14.jpg', keywords: ['fun'] },
    { id: 15, url: 'meme-imgs-square/15.jpg', keywords: ['Music'] },
    { id: 16, url: 'meme-imgs-square/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'meme-imgs-square/17.jpg', keywords: ['sad'] },
    { id: 18, url: 'meme-imgs-square/18.jpg', keywords: ['crazy'] },
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

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function setLineLocation(locationObj) {
    gMeme.lines[gMeme.selectedLineIdx].location = { ...locationObj };
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [createLine()]
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

function toggleLineMark() {
    gMeme.lines[gMeme.selectedLineIdx].isMarked = !gMeme.lines[gMeme.selectedLineIdx].isMarked;
}

function unMarkAllLines() {
    gMeme.lines.forEach(line => {
        line.isMarked = false;
    });
}

function createLine() {
    return {
        txt: 'Caption',
        size: 40,
        location: { x: gCanvas.width / 2, y: gCanvas.height / 2, width: null, height: null },
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        strokeWidth: 2,
        isMarked: true,
    }
}

function addLine() {
    if (gMeme.lines.length > 0) gMeme.selectedLineIdx++;
    gMeme.lines.push(
        {
            txt: 'Caption',
            size: 40,
            location: { x: gCanvas.width / 2, y: gCanvas.height / 2, width: null, height: null },
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            strokeWidth: 2,
            isMarked: true,
        }
    )
}

function updateSelectedLineIdx(offset) {
    gMeme.selectedLineIdx = getLineIdxByOffset(offset);
}

function moveBetweenLines() {
    const linesLength = gMeme.lines.length;
    const nextLineIdx = (gMeme.selectedLineIdx + 1 === linesLength) ? 0 : gMeme.selectedLineIdx + 1;
    gMeme.selectedLineIdx = nextLineIdx;
    unMarkAllLines();
    toggleLineMark();
}

function getLineIdxByOffset(offset) {
    if (gMeme.lines.length === 0) return
    const memeLines = gMeme.lines;
    return memeLines.findIndex(line => {
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

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    if (gMeme.lines.length > 0) gMeme.selectedLineIdx--;
}

function strokeColorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
}

function fontColorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function strokeWidthChange(width) {
    gMeme.lines[gMeme.selectedLineIdx].strokeWidth = width;
}