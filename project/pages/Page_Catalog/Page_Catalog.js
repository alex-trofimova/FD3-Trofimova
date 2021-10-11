import React from 'react';
//import PropTypes from 'prop-types';
import Catalog from './../../components/Catalog/Catalog';

import './Page_Catalog.css';

class Page_Catalog extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    let newProducts = [
      {
        id:22,
        productName: 'varta_akum'
      }
    ]

    return (
      <section className="Page_Catalog">
        <div>
          <Catalog initialListOfProducts={newProducts}/>
        </div>
      </section>
    )
    ;
  }
}

export default Page_Catalog;
