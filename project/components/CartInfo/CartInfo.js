import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import { product_add_to_cart, product_remove_from_cart } from '../../redux/CartAC';

import './CartInfo.css';

class CartInfo extends React.PureComponent {

  static propTypes = {
    cart: PropTypes.object.isRequired, // передано из Redux
  };

  render() {
    let items = this.props.cart.items;
    let totalNumber=items.length;
    let totalPrice=items.reduce((total, items) => total+items.price,0)

    return (
      <div className="CartInfo">
        <span>Total price: {totalPrice}  rub.   </span>
        <span>Number of products ({totalNumber})</span>
      </div>
    )
    ;

  }

}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(CartInfo);
