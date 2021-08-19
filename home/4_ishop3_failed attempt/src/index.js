"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import IShop from './components/IShop';

var ishopTitle='Интернет-магазин автозапчастей "500 Ампер"';
    var productsInfoArr=[ 
      {productName:'масло моторное Mannol', code:3624, price:37.1, url:'components/img/product_1.jpg', residue:10}, 
      {productName:'жидкость тормозная Motul', code:105835, price:29.4, url:'components/img/product_2.jpg', residue:6}, 
      {productName:'антифриз X-FREEZE', code:28820, price:24.7, url:'components/img/product_3.jpg', residue:1}, 
      {productName:'растворитель Сольвент', code:21862, price:5.5, url:'components/img/product_4.jpg', residue:17}, 
    ];

    ReactDOM.render(
      React.createElement(IShop, {title:ishopTitle, products:productsInfoArr}), 
      document.getElementById('container') 
    );