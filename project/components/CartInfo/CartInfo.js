import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'
import { Link  } from 'react-router-dom';

import { connect } from 'react-redux';

//images
import cartIcon from './../../assets/cartIcon.png';

//components
import Modal from './../Modal/Modal';
import CartContent from './../CartContent/CartContent';

import './CartInfo.css';

class CartInfo extends React.PureComponent {

  static propTypes = {
    cart: PropTypes.object.isRequired, // передано из Redux
  };

  state = {
    //для определения состояния показывается ли всплывающее окно Корзины
    isCartShown: false, 
  };

  render() {
    let items = this.props.cart.items;
    let totalNumber=items.reduce((total, items) => total + items.quantity, 0);
    let totalPrice=items.reduce((sum, items) => sum + items.price*items.quantity,0);

    return (
      <div className="CartInfo" >
        <div className="CartInfo_click" onClick={() => { this.setState( {isCartShown: true}); }}>
          <img src={cartIcon} alt={"cartIcon"}/>
          <div className="CartInfo_click_info">
            <span className="CartInfo_click_name">Корзина</span><br/>
            <span> {totalNumber} ед. товара |  {totalPrice} руб. </span>
          </div> 
        </div>
        {
          (this.state.isCartShown) && 
          <Modal title="Корзина" cbToClose={() => { this.setState( {isCartShown: false}); }}>
            <CartContent/>
          </Modal>
        }
        
        
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
