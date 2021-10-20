import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { product_add_to_cart, product_change_quantity_by_one } from '../../../redux/CartAC'


import './ProductCard.css';

class ProductCard extends React.PureComponent {

  static propTypes = {
    cart: PropTypes.object.isRequired, // передано из Redux
    productDetailes: PropTypes.object.isRequired, // передано из Redux
  };

  state = {
    //для определения состояния активности/неактивности кнопок "+" и "-"
    isNotEnoughItemsInStock: false, 
    isItemBecomeOne: true,
  };

  handleAddToCart = () => {
    let cartItems = this.props.cart.items;
    let productToCart = this.props.productDetailes;
    let repeatedItem = cartItems.find(elem => elem.id==productToCart.id);
    if (repeatedItem) {
      if (repeatedItem.quantity===this.props.productDetailes.inStock) {
          this.setState( {isNotEnoughItemsInStock: true});
          alert('Невозможно заказать больше: всего в наличии ' +this.props.productDetailes.inStock+ ' штук.');
          return;
      }
      this.props.dispatch( product_change_quantity_by_one(repeatedItem.id, 1) );
    }
    else {
      productToCart["quantity"]=1;
      this.props.dispatch( product_add_to_cart(productToCart) );
    }
    //this.props.history.push('/cart');  
  };


  // decreaseQuantity = () => {
  //   if (this.state.isNotEnoughItemsInStock) {
  //     this.setState( {isNotEnoughItemsInStock: false});
  //   }
  //   this.props.dispatch( product_change_quantity_by_one(this.props.item.id, -1) );
  //   if (this.props.item.quantity===1) {
  //     this.setState( {isItemBecomeOne: true});
  //     return;
  //   }
    
  // };

  // increaseQuantity = () => {
  //   if (this.state.isItemBecomeOne) {
  //     this.setState( {isItemBecomeOne: false});
  //   }
  //   if (this.props.item.quantity===this.props.item.inStock) {
  //     this.setState( {isNotEnoughItemsInStock: true});
  //     alert('Невозможно заказать больше: всего в наличии '+this.props.item.inStock+ ' штук.');
  //     return;
  //   }
  //   this.props.dispatch( product_change_quantity_by_one(this.props.item.id, 1) );
  // };

  render() {
    let cartItems = this.props.cart.items;
    let addedProduct = cartItems.find(item => (item.id === this.props.productDetailes.id));
    console.log(this.props.productDetailes);
    //let quantity = (addedProduct) ? '('+addedProduct.quantity+')' : null;

    return (
      // <div>
      //   <button onClick={()=>{console.log(this.props.productDetailes)}}>Нажать</button>
      // </div>
     <div className="ProductCard">
            <h3 className="productCard_title">{this.props.productDetailes.title}</h3>
            <div className="productCard_description">
              <div className="productCard_image"></div>
              <div className="productCard_details">
                <span className="productCard_price">{this.props.productDetailes.price+' руб.'}</span>
                <div className='Item_cell'>
                  <button onClick={this.decreaseQuantity} disabled={(this.state.isItemBecomeOne)}>-</button>
                    {/* {addedProduct.quantity} */}
                  <button onClick={this.increaseQuantity} disabled={(this.state.isNotEnoughItemsInStock)}>+</button>
                </div>
                <div className="product_addToCart">
                  <button className='productCard_btn' 
                          value='to_cart'
                          disabled={(this.state.isNotEnoughItemsInStock)} 
                          onClick={this.handleAddToCart}
                  >
                        Добавить в корзину
                  </button>  
                </div>
                <div className="productCard_characteristics">
                  Характеристики
                  {this.props.productDetailes.capacity}
                </div>
              </div>
            </div>
      </div>
        )
        ;
      }
    }

const mapStateToProps = (state) => ({
  cart: state.cart,
  productDetailes: state.product.detailes,
});

export default connect(mapStateToProps)(ProductCard);
