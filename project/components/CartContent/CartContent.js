import React from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'


import {connect} from 'react-redux';

import Item from './Item/Item';
import ButtonCheckOut from './../small_components/ButtonCheckOut';


import './CartContent.css';

class CartContent extends React.PureComponent {

  static propTypes = {
    cart: PropTypes.object.isRequired, // передано из Redux
  };

  render() {
    let items = this.props.cart.items;
    let totalPrice=items.reduce((sum, items) => sum + items.price*items.quantity,0);
    return (
      <div className="CartContent">
        <div className="CartContent_wrapper">
          { items.length >0 ? 
          (
          <div>
            <table className='CartContent_table'>
              <thead>
                <tr className='CartContent_tableHeader'>
                  <th className='CartContent_tableHeader_title'colSpan="2">Наименование товара</th>
                  <th className='CartContent_tableHeader_quantity'>Количество</th>
                  <th className='CartContent_tableHeader_price'>Стоимость</th>
                  <th className='CartContent_tableHeader_delete'>
                  <div className='CartContent_tableHeader_cross' >
                    <div className='CartContent_tableHeader_line CartContent_tableHeader_first_line'></div>
                    <div className='CartContent_tableHeader_line CartContent_tableHeader_second_line'></div>
                  </div>
                  </th>
                </tr>        
              </thead> 
              <tbody className='CartContent_tableContent'>
                {
                (this.props.cart.items)
                ? items.map(elem => <Item key={elem.id} item={elem} />)
                : null
                }
              </tbody>
            </table>
            <div className='CartContent_total'>
              Итого: {totalPrice} руб.
            </div>
            <div className='CartContent_order'>
              <ButtonCheckOut message='покупка'/>
            </div>
          </div>
          ) 
          : 
          (<p>В Вашей корзине нет товаров</p>)
          } 
        </div>
      </div>
    )
    ;

  }

}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

//export default withRouter(connect(mapStateToProps)(CartContent));
export default connect(mapStateToProps)(CartContent);
