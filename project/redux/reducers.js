import { combineReducers } from 'redux';

import CatalogReducer from "./CatalogReducer";
import CartReducer from "./CartReducer";
import ProductCardReducer from "./ProductCardReducer";

let combinedReducer=combineReducers({
    catalog: CatalogReducer,
    cart: CartReducer,
    product: ProductCardReducer, 
});

export default combinedReducer;
