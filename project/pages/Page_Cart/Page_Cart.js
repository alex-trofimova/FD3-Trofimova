import React from 'react';
//import PropTypes from 'prop-types';
import CartContent from './../../components/CartContent/CartContent';

import './Page_Cart.css';

class Page_Cart extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
      <section className="Page_Cart">
        <div>
          <CartContent />
        </div>
      </section>
    )
    ;
  }
}

export default Page_Cart;
