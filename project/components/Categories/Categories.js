import React from 'react';
//import PropTypes from 'prop-types';

import { Link  } from 'react-router-dom';

import './Categories.css';

class Categories extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
      <div className="Categories">
        <Link to="/cart">
          <div>В корзину</div>
        </Link>
      </div>
    )
    ;
  }
}

export default Categories;
