import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { product_add_to_cart } from '../../../redux/CartAC'

import { Link  } from 'react-router-dom';

import './Product.css';

class Product extends React.PureComponent {

  static propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired, //передано из родительского компонента
    //cartItems: PropTypes.object.isRequired, // передано из Redux
  };


  handleAddToCart = () => {
    console.log(this.props.product);
    this.props.dispatch( product_add_to_cart(this.props.product) );
  };


  render() {

    return (
     <div className="Product">
      <Link to={`/product/${this.props.product.id}`}>
        <ul>
          <li>
            <span className="product_title">{this.props.product.title}</span>
          </li>
          <li>
            <span className="product_price">{this.props.product.price+' руб.'}</span>
          </li>
          <li>
          
          </li>
        </ul>
      </Link>
      <div className="product_addToCart">
        <button className='product__btn' 
                value='to_cart' 
                onClick={this.handleAddToCart}
        >
              В корзину
        </button>  
      </div>
  </div>
    )
    ;
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart,
});

export default connect(mapStateToProps)(Product);
//export default Product;
