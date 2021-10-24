"use strict";
function getNumWord(number) {
    let res100=number%100;
    let res10=number%10;

    if ((res100>=11) && (res100<=19)) return 'товаров';
    if (res10==1) return 'товар';
    if ((res10>=2)&&(res10<=4)) return 'товара';

    return 'товаров'

}

export {getNumWord}
