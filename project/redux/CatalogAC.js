const SET_PRODUCTS='SET_PRODUCTS',
      SHOW_PRODUCTS_FILTERED_BY_TYPE='SHOW_PRODUCTS_FILTERED_BY_TYPE',
      SHOW_PRODUCTS_SORTED_BY_PRICE='SHOW_PRODUCTS_SORTED_BY_PRICE',
      SHOW_SEARCHED_PRODUCTS='SHOW_SEARCHED_PRODUCTS';

function products_create(productsArr){
    return {
        type: SET_PRODUCTS,
        payload: productsArr, 
      }
}

function products_filter_by_type(productType){
    return {
        type: SHOW_PRODUCTS_FILTERED_BY_TYPE,
        productType: productType, 
      }
}

function products_sort_by_price(sign){
    return {
        type: SHOW_PRODUCTS_SORTED_BY_PRICE,
        sign: sign, 
      }
}

function products_searched(query){
    return {
        type: SHOW_SEARCHED_PRODUCTS,
        payload: query, 
      }
}



export {
    products_create, SET_PRODUCTS,
    products_filter_by_type, SHOW_PRODUCTS_FILTERED_BY_TYPE,
    products_sort_by_price, SHOW_PRODUCTS_SORTED_BY_PRICE,
    products_searched, SHOW_SEARCHED_PRODUCTS,
}
