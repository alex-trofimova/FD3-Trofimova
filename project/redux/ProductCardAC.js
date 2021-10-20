const SET_PRODUCT='SET_PRODUCT';

function product_view_detailes(productHash){
    return {
        type: SET_PRODUCT,
        payload: productHash, 
      }
}

export {
    product_view_detailes, SET_PRODUCT,
}
