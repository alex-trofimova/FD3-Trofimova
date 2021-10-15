import { combineReducers } from 'redux';

import CatalogReducer from "./CatalogReducer";
import CartReducer from "./CartReducer";

let combinedReducer=combineReducers({
    // редьюсер CatalogReducer отвечает за раздел state под именем catalog
    catalog: CatalogReducer,
    cart: CartReducer, 
    // + другие редьюсеры
});

export default combinedReducer;