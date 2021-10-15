import {    SET_PRODUCTS, 
            SHOW_PRODUCTS_FILTERED_BY_TYPE, 
            SHOW_PRODUCTS_SORTED_BY_PRICE,
            SHOW_SEARCHED_PRODUCTS
        } from './CatalogAC';

const initState = {
    products:[]
}


function CatalogReducer(state=initState, action){
    switch(action.type) {
        case SET_PRODUCTS: {
            let newState={...state,
                products: action.payload
            }
            return newState;
        }
        
        case SHOW_PRODUCTS_FILTERED_BY_TYPE: {
            let newState={...state,
                products: state.products.filter(item => item.type === action.productType)
            }
            return newState;
        }

        case SHOW_PRODUCTS_SORTED_BY_PRICE: {
            let newState={...state,
                products: state.products.sort((a,b) => action.sign*(a.price-b.price))
            }
            return newState;
        }

        case SHOW_SEARCHED_PRODUCTS: {
            let newState={...state,
                products: state.products.filter(item => !(item.title.toLowerCase().indexOf(action.payload.toLowerCase()) ==-1))
            }
            return newState;
        }
        
        default:
            return state;
    }
}

export default CatalogReducer;
