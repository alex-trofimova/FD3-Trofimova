const ADD_ITEM_TO_CART='ADD_ITEM_TO_CART',
      REMOVE_ITEM_FROM_CART='REMOVE_ITEM_FROM_CART',
      CHANGE_QUANTITY_OF_ITEM_BY_ONE='CHANGE_QUANTITY_OF_ITEM_BY_ONE';

function item_add_to_cart(item){
    return {
        type: ADD_ITEM_TO_CART,
        payload: item, 
      }
}

function item_remove_from_cart(id){
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: id, 
      }
}

function item_change_quantity_by_one(id, sign){
    return {
        type: CHANGE_QUANTITY_OF_ITEM_BY_ONE,
        id: id,
        sign: sign 
      }
}

export {
    item_add_to_cart, ADD_ITEM_TO_CART,
    item_remove_from_cart, REMOVE_ITEM_FROM_CART,
    item_change_quantity_by_one, CHANGE_QUANTITY_OF_ITEM_BY_ONE,
}
