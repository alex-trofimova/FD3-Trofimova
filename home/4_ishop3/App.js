"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/IShop';

let ishopTitle='Интернет-магазин автозапчастей "500 Ампер"';
let productsInfoArr=require('./productlist.json');

ReactDOM.render(
  <IShop
    title={ishopTitle}
    products={productsInfoArr}
  />
  , document.getElementById('container') 
);

