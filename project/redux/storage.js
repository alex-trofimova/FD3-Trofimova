"use strict";
function saveState(state) {
    try {
        const {cart, product} = state;
        localStorage.setItem('reduxCartState', JSON.stringify({cart, product}))
        //localStorage.setItem('reduxCartState', JSON.stringify(state))
    } 
    catch (err) {
    }
}

function loadState() {
    try {
        const data = localStorage.getItem('reduxCartState')
        if (data === null) {
          return undefined;
        }
        return JSON.parse(data);
    } 
    catch (err) {
        return undefined;
    }
}

export {
    saveState, loadState
}
