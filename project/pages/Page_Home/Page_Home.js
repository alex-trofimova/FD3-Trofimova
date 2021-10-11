import React from 'react';
//import PropTypes from 'prop-types';
import Categories from './../../components/Categories/Categories';

import './Page_Home.css';

class Page_Home extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
      <section className="Page_Home">
        <div>
          <Categories />
        </div>
      </section>
    )
    ;
  }
}

export default Page_Home;
