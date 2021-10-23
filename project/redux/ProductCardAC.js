const SET_PRODUCT='SET_PRODUCT',
      CHANGE_QUANTITY_OF_PRODUCT_BY_ONE='CHANGE_QUANTITY_OF_PRODUCT_BY_ONE';

function product_view_detailes(productHash){
    return {
        type: SET_PRODUCT,
        payload: productHash, 
      }
}

function product_change_quantity_by_one(sign){
    return {
        type: CHANGE_QUANTITY_OF_PRODUCT_BY_ONE,
        sign: sign, 
      }
}

export {
    product_view_detailes, SET_PRODUCT,
    product_change_quantity_by_one, CHANGE_QUANTITY_OF_PRODUCT_BY_ONE,
}
