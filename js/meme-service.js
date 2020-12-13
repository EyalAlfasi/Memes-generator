'use strict'


var gMeme;

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
    gMeme.lines[gMeme.selectedLineIdx].location =  locationObj ;
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

