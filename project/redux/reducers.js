import { combineReducers } from 'redux';

import CatalogReducer from "./CatalogReducer";

let combinedReducer=combineReducers({
    // редьюсер CatalogReducer отвечает за раздел state под именем catalog
    catalog: CatalogReducer, 
    // + другие редьюсеры
});

export default combinedReducer;