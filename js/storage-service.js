'use-strict'

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, val) {
    const valToSave = JSON.stringify(val)
    return localStorage.setItem(key, valToSave);
}