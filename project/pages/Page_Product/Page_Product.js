import React from 'react';
//import PropTypes from 'prop-types';
import ProductCard from './../../components/ProductCard/ProductCard';

import './Page_Product.css';

class Page_Product extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
      <section className="Page_Product">
        <ProductCard />
      </section>
    )
    ;
  }
}

export default Page_Product;
