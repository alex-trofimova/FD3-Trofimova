import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from './CartAC';

const initState = {
    items:[]
}



function CartReducer(state=initState, action){
    switch(action.type) {
        case ADD_PRODUCT_TO_CART: {
            let newState={...state,
                cart: state.items.push(action.payload)
            }
            
            return newState;
        }

        case REMOVE_PRODUCT_FROM_CART: {
            let newState={...state,
                items: state.items.filter(item => !(item.id === action.payload))
            }
            return newState;
        }

        default:
            return state;
    }
}

export default CartReducer;
