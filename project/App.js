"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// pages
import Page_Home from './pages/Page_Home/Page_Home';
import Page_Catalog from './pages/Page_Catalog/Page_Catalog';
import Page_Product from './pages/Page_Product/Page_Product';
import Page_Cart from './pages/Page_Cart/Page_Cart';

import store  from './redux/createStore';

// store.dispatch(
//   {
//     type: 'SET_PRODUCTS',
//     payload: 'Oil',
//   }
// )

ReactDOM.render(
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>

          <Route exact path="/" render={() => (
            <div>
              <Header /> 
              <Page_Home />
              <Footer /> 
            </div> 
          )}
          />

          <Route path="/catalog" render={() => (
          <div>
            <Header />
            <Page_Catalog />
            <Footer /> 
          </div>
          )}
          />

          <Route path="/product" render={() => (
          <div>
            <Header />
            <Page_Product />
            <Footer /> 
          </div>
          )}
          />

          <Route path="/cart" render={() => (
          <div>
            <Header />
            <Page_Cart />
            <Footer /> 
          </div>
          )}
          />

        </Switch>
      </BrowserRouter>
    </Provider>
  </div> 
  
, document.getElementById('container') );
