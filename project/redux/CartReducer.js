import { ADD_ITEM_TO_CART, 
         REMOVE_ITEM_FROM_CART, 
         CHANGE_QUANTITY_OF_ITEM_BY_ONE, 
        } from './CartAC';

const initState = {
    items:[]
}



function CartReducer(state=initState, action){
    switch(action.type) {

        case ADD_ITEM_TO_CART: {            
            let newState={...state,
                items: [...state.items, action.payload]
            };

            return newState;
        }

        case REMOVE_ITEM_FROM_CART: {
            let newState={...state,
                items: state.items.filter(item => !(item.id === action.payload))
            }
            return newState;
        }

        case CHANGE_QUANTITY_OF_ITEM_BY_ONE: {
            function addQuantity (elem) {
                if (elem.id === action.id) {
                    elem.quantity+=action.sign;
                }
                return elem;
            }

            let newState={...state,
                items: state.items.map(addQuantity)
            }
            return newState;
        }

        default:
            return state;
    }
}

export default CartReducer;
