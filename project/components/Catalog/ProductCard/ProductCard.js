import React from 'react';
import PropTypes from 'prop-types';

import { Link  } from 'react-router-dom';

import {connect} from 'react-redux';
import { product_change_quantity_by_one } from '../../../redux/ProductCardAC'
import { item_add_to_cart, item_change_quantity_by_one, item_remove_from_cart} from '../../../redux/CartAC'

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
      this.props.dispatch( item_remove_from_cart(repeatedItem.id) );
    }
    this.props.dispatch( item_add_to_cart(productToCart) );
  };


  decreaseQuantity = () => {
    if (this.state.isNotEnoughItemsInStock) {
      this.setState( {isNotEnoughItemsInStock: false});
    }
    this.props.dispatch( product_change_quantity_by_one(-1) );
    if (this.props.productDetailes.quantity===1) {
      this.setState( {isItemBecomeOne: true});
      return;
    }
  };

  increaseQuantity = () => {
    if (this.state.isItemBecomeOne) {
      this.setState( {isItemBecomeOne: false});
    }
    if (this.props.productDetailes.quantity===this.props.productDetailes.inStock) {
      this.setState( {isNotEnoughItemsInStock: true});
      alert('Невозможно заказать больше: всего в наличии '+this.props.productDetailes.inStock+ ' штук.');
      return;
    }
    this.props.dispatch( product_change_quantity_by_one(1) );
    console.log(this.props.productDetailes.quantity);
  };

  render() {
    let cartItems = this.props.cart.items;
    let addedProduct = cartItems.find(item => (item.id === this.props.productDetailes.id));
   

    return (
      <div className="ProductCard">
        <h3 className="ProductCard_title">{this.props.productDetailes.title}</h3>
        <div className="ProductCard_description">

          <div className="ProductCard_image">
            <img src={this.props.productDetailes.image} width="280px"/>
          </div>

          <div className="ProductCard_details">
            <div className="ProductCard_price_block">
              <div className='ProductCard_price'>{this.props.productDetailes.price+' руб.'}</div>
              <div className='ProductCard_change_number ProductCard_quantity'>
                <button className='ProductCard_btn' onClick={this.decreaseQuantity} disabled={(this.state.isItemBecomeOne)}> - </button>
                  <span className='ProductCard_number'>{this.props.productDetailes.quantity}</span>
                <button className='ProductCard_btn' onClick={this.increaseQuantity} disabled={(this.state.isNotEnoughItemsInStock)}> + </button>
              </div>
                <div className="Product_addToCart">
                  <button className='ProductCard_addToCart_btn' 
                          value='to_cart'
                          disabled={(this.state.isNotEnoughItemsInStock)} 
                          onClick={this.handleAddToCart}
                  >
                        Добавить в корзину
                  </button>  
                </div>
            </div>
              
            <div className="ProductCard_characteristics">
                <div className="ProductCard_characteristics_title">Характеристики:</div>
                <div className="ProductCard_characteristics_item">
                  <span>Производитель: </span>Varta
                </div>
                <div className="ProductCard_characteristics_item">
                  <span>Емкость: </span>{this.props.productDetailes.capacity+' Ач'}
                </div>
                <div className="ProductCard_characteristics_item">
                  <span>Ток холодной прокрутки: </span>{this.props.productDetailes.current+' А'}
                </div>
                <div className="ProductCard_characteristics_item">
                  <span>Напряжение: </span>{this.props.productDetailes.voltage+' В'}
                </div>
                <div className="ProductCard_characteristics_item">
                  <span>Длина: </span>{this.props.productDetailes.length+' мм'}
                </div>
                <div className="ProductCard_characteristics_item">
                  <span>Высота: </span>{this.props.productDetailes.height+' мм'}
                </div>
                <div className="ProductCard_characteristics_item">
                  <span>Ширина: </span>{this.props.productDetailes.width+' мм'}
                </div>
                <Link to="/catalog">
                  <div className="ProductCard_back_to_catalog">Вернуться в каталог товаров</div>
                </Link>   
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
