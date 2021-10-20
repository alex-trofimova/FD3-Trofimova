import React from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'


import {connect} from 'react-redux';

import Item from './Item/Item';

import './CartContent.css';

class CartContent extends React.PureComponent {

  static propTypes = {
    cart: PropTypes.object.isRequired, // передано из Redux
  };

  render() {
    let items = this.props.cart.items;

    return (
      <div className="CartContent">
        <h2>Корзина</h2>
        <div className="CartContent_wrapper">
          { items.length >0 ? 
          (
            <table className='CartContent_table'>
            <thead>
              <tr className='CartContent_tableHeader'>
                <th>Наименование товара</th>
                <th>Количество</th>
                <th>Стоимость</th>
                <th>x</th>
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
          ) 
          : 
          (<p>В Вашей корзине нет товаров</p>)
          }
          
        </div>
        <Link to="/catalog">
          <div>Продолжить покупки </div>
          {/* <button onClick={() => { this.props.history.push('/catalog') }}>Продолжить покупки</button> */}
        </Link>
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
