import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {  products_create, 
          products_filter_by_type, 
          products_sort_by_price, 
          products_searched 
        } from '../../redux/CatalogAC';


import './Catalog.css';

import Product from './Product/Product';

class Catalog extends React.PureComponent {

  static propTypes = {
    initialListOfProducts: PropTypes.array.isRequired, //передано из родительского компонента
    //catalog: PropTypes.array.isRequired, // передано из Redux
    catalog: PropTypes.object.isRequired, // передано из Redux
  };

  componentWillMount() {
    this.props.dispatch( products_create(this.props.initialListOfProducts) );
  }

  showAllProducts = () => {
    this.props.dispatch( products_create(this.props.initialListOfProducts) );
    console.log(this.props.catalog.products);
  }

  handleFilter = (EO) => {
    const nextFilter = EO.target.value;
    this.props.dispatch( products_create(this.props.initialListOfProducts) );
    (nextFilter!='all')
    ? 
      this.props.dispatch( products_filter_by_type(nextFilter) )
    :
      null
  };

  sortByPriceInc = () => {
    this.props.dispatch( products_sort_by_price(1) )
  }

  sortByPriceDec = () => {
    this.props.dispatch( products_sort_by_price(-1) )
  }

  showAvtoAkum = () => {
    this.props.dispatch( products_filter_by_type('автоаккумуляторы') );    
  }
  
  showTruckAkum = () => {
    this.props.dispatch( products_filter_by_type('грузовые аккумуляторы') );    
  }

  searchByQuery = (EO) => {
    let query = EO.target.value;
    this.props.dispatch( products_create(this.props.initialListOfProducts) );
    (query!='')
    ? 
      this.props.dispatch( products_searched(query) )
    :
      null
  }

 
  render() {

  let products = this.props.catalog.products;
  
    return (
      <div className="Catalog">
        <h2>Каталог товаров</h2>
        <div className="Catalog_wrapper">
          <div className="Catalog_filter">
          <br/>
            <select onChange={this.handleFilter}>
              <option value='all'>Все</option>
              <option value='автоаккумуляторы'>Автоаккумуляторы</option>
              <option value='грузовые аккумуляторы'>Грузовые аккумуляторы</option>
            </select>
            <br/>
            <br/>
            <button className='Catalog_btn' value='sort_by_price_1' onClick={this.sortByPriceInc}>Сортировать по возрастанию</button>
            <br/>
            <button className='Catalog_btn' value='sort_by_price_1' onClick={this.sortByPriceDec}>Сортировать по убыванию</button>
            <br/>
            <br/>
            <input type="text" placeholder="Введите запрос" onChange={this.searchByQuery}></input>

            
          </div>
          <div className="Catalog_productsResults">
            {products.map(elem => <Product key={elem.id} product={elem} />)}
          </div>
        </div>
        
      </div>
    )
    ;
  }
}


const mapStateToProps = (state) => ({
  catalog: state.catalog,
});

export default connect(mapStateToProps)(Catalog);
//export default Catalog;

