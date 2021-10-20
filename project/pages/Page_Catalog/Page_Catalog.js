import React from 'react';

import Catalog from './../../components/Catalog/Catalog';

import './Page_Catalog.css';

class Page_Catalog extends React.PureComponent {

  render() {

    return (
      <section className="Page_Catalog">
        <div>
          <Catalog />
        </div>
      </section>
    )
    ;
  }
}

export default Page_Catalog;
