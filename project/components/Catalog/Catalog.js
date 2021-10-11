import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import { products_create } from '../../redux/CatalogAC';

import './Catalog.css';

class Catalog extends React.PureComponent {

  static propTypes = {
    initialListOfProducts: PropTypes.array.isRequired, //передано из родительского компонента
    products: PropTypes.object.isRequired, // передано из Redux
  };

  componentWillMount() {
    this.props.dispatch( products_create(this.props.initialListOfProducts) );
  }

  showProducts= () => {
    //this.props.dispatch( products_create(arr) );
    console.log(this.props.products);
  }

  

  render() {

    
    return (
      <div className="Catalog">
        <span>Catalog: </span>
        <button className='Catalog_btn' value='Press me' onClick={this.showProducts}>Press me</button> 
      </div>
    )
    ;
  }
}

const mapStateToProps = function (state) {
  return {
    products: state.catalog,
  };
};

export default connect(mapStateToProps)(Catalog);
//export default Catalog;

