const ADD_PRODUCT_TO_CART='ADD_PRODUCT_TO_CART',
      REMOVE_PRODUCT_FROM_CART='REMOVE_PRODUCT_FROM_CART',
      CHANGE_QUANTITY_OF_PRODUCT_BY_ONE='CHANGE_QUANTITY_OF_PRODUCT_BY_ONE';

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

function product_change_quantity_by_one(id, sign){
    return {
        type: CHANGE_QUANTITY_OF_PRODUCT_BY_ONE,
        id: id,
        sign: sign 
      }
}

export {
    product_add_to_cart, ADD_PRODUCT_TO_CART,
    product_remove_from_cart, REMOVE_PRODUCT_FROM_CART,
    product_change_quantity_by_one, CHANGE_QUANTITY_OF_PRODUCT_BY_ONE,
}
