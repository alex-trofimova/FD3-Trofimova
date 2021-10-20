import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'
import { Link  } from 'react-router-dom';

import {connect} from 'react-redux';

import './CartInfo.css';

class CartInfo extends React.PureComponent {

  static propTypes = {
    cart: PropTypes.object.isRequired, // передано из Redux
  };

  render() {
    let items = this.props.cart.items;
    let totalNumber=items.reduce((total, items) => total + items.quantity, 0);
    let totalPrice=items.reduce((sum, items) => sum + items.price*items.quantity,0);

    //this.props.history.push('/catalog');

    return (
      <div className="CartInfo">
        <button onClick={() => { this.props.history.push('/cart') }}>go to the Cart</button>
        <Link to="/cart">
          <span>Total price: {totalPrice}  rub.   </span>
          <span>Number of products ({totalNumber})</span>
        </Link>
        
      </div>
    )
    ;
  }

}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default withRouter(connect(mapStateToProps)(CartInfo));
//export default connect(mapStateToProps)(CartInfo);
