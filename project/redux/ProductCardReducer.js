import { SET_PRODUCT } from './ProductCardAC';

const initState = {
    detailes:{}
}


function ProductCardReducer(state=initState, action){
    switch(action.type) {
        case SET_PRODUCT: {
            let newState={...state,
                detailes: action.payload
            }
            return newState;
        }
        
        default:
            return state;
    }
}

export default ProductCardReducer;
