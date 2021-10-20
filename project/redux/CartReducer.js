import { ADD_PRODUCT_TO_CART, 
         REMOVE_PRODUCT_FROM_CART, 
         CHANGE_QUANTITY_OF_PRODUCT_BY_ONE, 
        } from './CartAC';

const initState = {
    items:[
        // {
        //     "id": 9537,
        //     "title": "Аккумулятор Varta Blue 44",
        //     "type": "автоаккумуляторы",
        //     "price": 159,
        //     "quantity": 2,
        //     "capacity": 44
        // }
    ]
}



function CartReducer(state=initState, action){
    switch(action.type) {

        case ADD_PRODUCT_TO_CART: {            
            let newState={...state,
                items: [...state.items, action.payload]
            };

            return newState;
        }

        case REMOVE_PRODUCT_FROM_CART: {
            let newState={...state,
                items: state.items.filter(item => !(item.id === action.payload))
            }
            return newState;
        }

        case CHANGE_QUANTITY_OF_PRODUCT_BY_ONE: {
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
