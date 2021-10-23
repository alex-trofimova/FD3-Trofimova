import {    LOAD_INIT_DATA,
            SHOW_LOADING_ERROR,
            SET_DATA,
            SHOW_ALL_PRODUCTS,
            SHOW_PRODUCTS_FILTERED_BY_TYPE, 
            SHOW_PRODUCTS_SORTED_BY_PRICE,
            SHOW_SEARCHED_PRODUCTS,
            SHOW_IN_STOCK_PRODUCTS
        } from './CatalogAC';

const initState = {
    loadingStatus: 0, // 0 - ничего не началось, 1 - идёт загрузка, 2 - была ошибка, 3 - данные загружены
    initialProductsList:null,
    products: null,
}


function CatalogReducer(state=initState, action){
    switch(action.type) {
        case LOAD_INIT_DATA: {
            let newState={
                loadingStatus: 1,
                initialProductsList: null,
                products: null,
            };
            return newState;
        }

        case SHOW_LOADING_ERROR: {
            let newState={
                loadingStatus: 2,
                initialProductsList: null,
                products: null,
            };
            return newState;
        }

        case SET_DATA: {
            let newState={
                loadingStatus: 3,
                initialProductsList: action.data,
                products: action.data,
            };
            return newState;
        }


        case SHOW_ALL_PRODUCTS: {
            let newState={...state,
                products: state.initialProductsList
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
        
        case SHOW_IN_STOCK_PRODUCTS: {
            let newState={...state,
                products: state.products.filter(item => item.inStock !=0)
            }
            return newState;
        }
        
        default:
            return state;
    }
}

export default CatalogReducer;
