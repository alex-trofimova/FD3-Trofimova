import { SET_PRODUCT, CHANGE_QUANTITY_OF_PRODUCT_BY_ONE, ADD_PRODUCT } from './ProductCardAC';

const initState = {
    detailes:{}
}


function ProductCardReducer(state=initState, action){
    switch(action.type) {
        case SET_PRODUCT: {
            let newState={...state,
                detailes: action.payload
            }
            newState.detailes["quantity"]=1;
            return newState;
        }

        case CHANGE_QUANTITY_OF_PRODUCT_BY_ONE: {
            let initDetailes=state.detailes;
            let initQuantity=initDetailes["quantity"];
            let newState={...state, detailes: {...state.detailes, quantity: initQuantity+action.sign}};
            return newState;
        }
        
        default:
            return state;
    }
}

export default ProductCardReducer;
