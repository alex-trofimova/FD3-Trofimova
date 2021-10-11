import { SET_PRODUCTS } from './CatalogAC';

const initState = {
    products:[]
}

function CatalogReducer(state=initState, action){
    switch(action.type) {
        case 'SET_PRODUCTS': {
            let newState={...state,
                products: action.payload
            }
            return newState;
        }
        
        default:
            return state;
    }
}

export default CatalogReducer;
