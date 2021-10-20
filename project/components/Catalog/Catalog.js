import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import {  all_products_show, 
          products_filter_by_type, 
          products_sort_by_price, 
          products_searched 
        } from '../../redux/CatalogAC';

import { CatalogThunkAC } from "../../redux/CatalogFetchThunk";


import './Catalog.css';

import Product from './Product/Product';

class Catalog extends React.PureComponent {

  static propTypes = {
    catalog: PropTypes.object.isRequired, // передано из Redux
  };

  componentDidMount() {
    this.props.dispatch( CatalogThunkAC(this.props.dispatch) );
  }

  handleFilter = (EO) => {
    const nextFilter = EO.target.value;
    this.props.dispatch( all_products_show() );
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
    this.props.dispatch( all_products_show() );
    (query!='')
    ? 
      this.props.dispatch( products_searched(query) )
    :
      null
  }

 
  render() {

  if ( this.props.catalog.loadingStatus<=1 )
    return "загрузка...";

  if ( this.props.catalog.loadingStatus===2 )
    return "ошибка загрузки данных";


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

export default withRouter(connect(mapStateToProps)(Catalog));
//export default connect(mapStateToProps)(Catalog);
