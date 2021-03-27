'use-strict';

function makeId(length = 4) {
    let id = '';
    for (let i = 0; i < length; i++) {
        id += String.fromCharCode(Math.floor(Math.random() > 0.5 ? Math.random() * 26 + 65 : Math.random() * 26 + 97));
    }
    return id;
}