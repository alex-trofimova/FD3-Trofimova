import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { item_remove_from_cart, item_change_quantity_by_one } from '../../../redux/CartAC';

import ButtonDelete from './../../small_components/ButtonDelete';
import { getNumWord } from './../../../modules/getNumWord';

import './Item.css';

class Item extends React.PureComponent {

  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
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
    this.props.dispatch( item_remove_from_cart(this.props.item.id) );
  };

  decreaseQuantity = () => {
    if (this.state.isNotEnoughItemsInStock) {
      this.setState( {isNotEnoughItemsInStock: false});
    }
    this.props.dispatch( item_change_quantity_by_one(this.props.item.id, -1) );
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
      alert('Невозможно заказать больше: всего в наличии '+this.props.item.inStock+ ' '+getNumWord(this.props.item.inStock));
      return;
    }
    this.props.dispatch( item_change_quantity_by_one(this.props.item.id, 1) );
  };



  render() {

    return (
        <tr className= "Item_row" >
          <td className="Item_cell Item_image">
            <img src={this.props.item.image} width="40px"/>
          </td>
          <td className="Item_cell Item_title">
            <div>{this.props.item.title}</div>
          </td>
          <td className='Item_cell'>
            <div className='Item_change_number Item_quantity'>
              <button className='Item_btn' onClick={this.decreaseQuantity} disabled={(this.state.isItemBecomeOne)}> - </button>
                <span className='Item_number'>{this.props.item.quantity}</span>
              <button className='Item_btn' onClick={this.increaseQuantity} disabled={(this.state.isNotEnoughItemsInStock)}> + </button>
            </div>
          </td>
          <td className='Item_cell Item_price'>            
            {this.props.item.quantity*this.props.item.price+' руб.'}
          </td>
          <td className='Item_cell Item_delete' onClick={this.handleRemoveFromCart}>
            <div className='Item_cross'>
              <ButtonDelete classColor='cross_grey'/>
            </div>
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
