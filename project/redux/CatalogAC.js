const LOAD_INIT_DATA='LOAD_INIT_DATA',
      SHOW_LOADING_ERROR='SHOW_LOADING_ERROR',
      SET_DATA='SET_DATA',

      SHOW_ALL_PRODUCTS='SHOW_ALL_PRODUCTS',
      SHOW_PRODUCTS_FILTERED_BY_TYPE='SHOW_PRODUCTS_FILTERED_BY_TYPE',
      SHOW_PRODUCTS_SORTED_BY_PRICE='SHOW_PRODUCTS_SORTED_BY_PRICE',
      SHOW_SEARCHED_PRODUCTS='SHOW_SEARCHED_PRODUCTS',
      SHOW_IN_STOCK_PRODUCTS='SHOW_IN_STOCK_PRODUCTS';


function data_load() {
    return {
        type: LOAD_INIT_DATA,
    };
}
      
function loading_error_show() {
    return {
        type: SHOW_LOADING_ERROR,
    };
}

function data_set(data) {
    return {
      type: SET_DATA,
      data:data,
    };
}

function all_products_show(){
    return {
        type: SHOW_ALL_PRODUCTS,
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

function products_in_stock(){
    return {
        type: SHOW_IN_STOCK_PRODUCTS,
      }
}



export {
    data_load, LOAD_INIT_DATA,
    loading_error_show, SHOW_LOADING_ERROR,
    data_set, SET_DATA,
    all_products_show, SHOW_ALL_PRODUCTS,
    products_filter_by_type, SHOW_PRODUCTS_FILTERED_BY_TYPE,
    products_sort_by_price, SHOW_PRODUCTS_SORTED_BY_PRICE,
    products_searched, SHOW_SEARCHED_PRODUCTS,
    products_in_stock, SHOW_IN_STOCK_PRODUCTS
}
