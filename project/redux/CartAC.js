const ADD_PRODUCT_TO_CART='ADD_PRODUCT_TO_CART',
      REMOVE_PRODUCT_FROM_CART='REMOVE_PRODUCT_FROM_CART';

function product_add_to_cart(item){
    return {
        type: ADD_PRODUCT_TO_CART,
        payload: item, 
      }
}

function product_remove_from_cart(id){
    return {
        type: REMOVE_PRODUCT_FROM_CART,
        payload: id, 
      }
}

export {
    product_add_to_cart, ADD_PRODUCT_TO_CART,
    product_remove_from_cart, REMOVE_PRODUCT_FROM_CART,
}
