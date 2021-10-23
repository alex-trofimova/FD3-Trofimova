import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { item_add_to_cart, item_change_quantity_by_one } from '../../../redux/CartAC';
import { product_view_detailes } from '../../../redux/ProductCardAC';

import { withRouter } from 'react-router-dom'
import { Link  } from 'react-router-dom';

import './Product.css';

class Product extends React.PureComponent {

  static propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inStock: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired, //передано из родительского компонента
    cart: PropTypes.object.isRequired, // передано из Redux
  };

  state = {
    //для определения состояния активности/неактивности кнопки "Добавить в корзину"
    isNotEnoughItemsInStock: false, 
  };

  viewDetails = () => {
    this.props.dispatch( product_view_detailes(this.props.product) );
    //this.props.history.push('/product/'+this.props.product.id+'');
  }

  handleAddToCart = () => {
    let cartItems = this.props.cart.items;
    let productToCart = this.props.product;
    let repeatedItem = cartItems.find(elem => elem.id==productToCart.id);
    if (repeatedItem) {
      if (repeatedItem.quantity===this.props.product.inStock) {
          this.setState( {isNotEnoughItemsInStock: true});
          alert('Невозможно заказать больше: всего в наличии '+this.props.product.inStock+ ' штук.');
          return;
        }
      this.props.dispatch( item_change_quantity_by_one(repeatedItem.id, 1) );
    }
    else  
     {
      productToCart["quantity"]=1;
      this.props.dispatch( item_add_to_cart(productToCart) );
    }
    //this.props.history.push('/cart');  
  };


  render() {
    let cartItems = this.props.cart.items;
    let addedProduct = cartItems.find(item => (item.id === this.props.product.id));
    let quantity = (addedProduct) ? '('+addedProduct.quantity+')' : '';

    let btnTitle = (this.props.product.inStock!=0) ? 'Добавить в корзину ' : 'Оставить заявку';

  return (
    <div className="Product">
      <Link to={'/product/'+this.props.product.id}>
        <div className="Product_wrapper" onClick={this.viewDetails}>
          <div className="Product_title">
            {this.props.product.title}
          </div>
          <div className="Product_image">
            <img src={this.props.product.image} width="200px"/>
          </div>
          <div className="Product_price">
            <span>{this.props.product.price+' руб.'}</span>
          </div>
        </div>
      </Link>
      <div className="Product_addToCart">
        <button className={(this.props.product.inStock!=0)?"Product_btn":"Product_btn Product_btn_disable"} 
                value='to_cart'
                disabled={((this.state.isNotEnoughItemsInStock)|| (this.props.product.inStock===0))} 
                onClick={this.handleAddToCart}
        >
             {
               (this.props.product.inStock!=0)?
                btnTitle+' '+quantity:
                btnTitle
             }
        </button>  
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

//export default withRouter(connect(mapStateToProps)(Product));
export default connect(mapStateToProps)(Product);
