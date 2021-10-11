const SET_PRODUCTS='SET_PRODUCTS';

function products_create(productsArr){
    return {
        type: 'SET_PRODUCTS',
        payload: productsArr, 
      }
}

export {
    products_create, SET_PRODUCTS,

}
