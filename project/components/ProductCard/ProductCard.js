import React from 'react';
//import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
      <div className="ProductCard">
        Product
      </div>
    )
    ;
  }
}

export default ProductCard;
