import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { product_remove_from_cart, product_change_quantity_by_one } from '../../../redux/CartAC';

import './Item.css';

class Item extends React.PureComponent {

  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      inStock: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired, //передано из родительского компонента
    cart: PropTypes.object.isRequired, // передано из Redux
  };


  state = {
    //для определения состояния активности/неактивности кнопок "+" и "-"
    isNotEnoughItemsInStock: false, 
    isItemBecomeOne: true,
  };

  componentWillMount() {
    if (this.props.item.quantity===1) {
      this.setState( {isItemBecomeOne: true});
    }
    else this.setState( {isItemBecomeOne: false});
  }

  handleRemoveFromCart = () => {
    this.props.dispatch( product_remove_from_cart(this.props.item.id) );
  };

  decreaseQuantity = () => {
    if (this.state.isNotEnoughItemsInStock) {
      this.setState( {isNotEnoughItemsInStock: false});
    }
    this.props.dispatch( product_change_quantity_by_one(this.props.item.id, -1) );
    if (this.props.item.quantity===1) {
      this.setState( {isItemBecomeOne: true});
      return;
    }
    
  };

  increaseQuantity = () => {
    if (this.state.isItemBecomeOne) {
      this.setState( {isItemBecomeOne: false});
    }
    if (this.props.item.quantity===this.props.item.inStock) {
      this.setState( {isNotEnoughItemsInStock: true});
      alert('Невозможно заказать больше: всего в наличии '+this.props.item.inStock+ ' штук.');
      return;
    }
    this.props.dispatch( product_change_quantity_by_one(this.props.item.id, 1) );
  };



  render() {

    return (
        <tr className= "Item_row" >
          <td className="Item_cell">{this.props.item.title}</td>
          <td className='Item_cell'>
            <button onClick={this.decreaseQuantity} disabled={(this.state.isItemBecomeOne)}>-</button>
            {this.props.item.quantity}
            <button onClick={this.increaseQuantity} disabled={(this.state.isNotEnoughItemsInStock)}>+</button>
          </td>
          <td className='Item_cell'>            
            {this.props.item.quantity*this.props.item.price}
          </td>
          <td className='Item_cell'>
            <button className='Item_btn' 
                    value={'delete_'+this.props.item.id} 
                    onClick={this.handleRemoveFromCart}>
              удалить
            </button>
          </td>
        </tr>
    )
    ;
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Item);
