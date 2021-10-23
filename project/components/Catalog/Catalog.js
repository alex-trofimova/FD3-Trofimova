import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import {  all_products_show, 
          products_filter_by_type, 
          products_sort_by_price, 
          products_searched,
          products_in_stock 
        } from '../../redux/CatalogAC';

import { CatalogThunkAC } from "../../redux/CatalogFetchThunk";


import './Catalog.css';

import Product from './Product/Product';

class Catalog extends React.PureComponent {

static propTypes = {
    catalog: PropTypes.object.isRequired, // передано из Redux
};

state = {
  //для определения какой тип аккумуляторов сейчас выбран
  isFilteredByType: 'все', //авто, грузо,  мото
  isOnlyInStock: false
};

  componentDidMount() {
    this.props.dispatch( CatalogThunkAC(this.props.dispatch) );
  }

//функции фильтрации аккумуляторов по типу
  showAvtoAkum = () => {
    this.props.dispatch( all_products_show() );
    this.props.dispatch( products_filter_by_type('автоаккумуляторы') );
    this.setState( {isFilteredByType:'автоаккумуляторы'} );    
  }
  
  showTruckAkum = () => {
    this.props.dispatch( all_products_show() );
    this.props.dispatch( products_filter_by_type('грузовые аккумуляторы') );
    this.setState( {isFilteredByType:'грузовые аккумуляторы'} );    
  }

  showMotoAkum = () => {
    this.props.dispatch( all_products_show() );
    this.props.dispatch( products_filter_by_type('мотоциклетные аккумуляторы') );
    this.setState( {isFilteredByType:'мотоциклетные аккумуляторы'} );    
  }

  //функция сортировки аккумуляторов по цене (с дешевых/с дорогих)
  handleSorter = (EO) => {
    const nextSorter = EO.target.value;
    (nextSorter==='inc') 
      ? this.props.dispatch( products_sort_by_price(1) ):
    (nextSorter==='dec') 
      ? this.props.dispatch( products_sort_by_price(-1) ):
    null
  };

  //функция отображения только тех аккумуляторов, которые есть в наличии
  showOnlyInStock = () => {
    if (!this.state.isOnlyInStock) {
      this.setState( {isOnlyInStock:true} ); 
      this.props.dispatch( products_in_stock() );
    }

    else {
      this.setState( {isOnlyInStock:false} );
      this.props.dispatch( all_products_show() );
      if (this.state.isFilteredByType!='все') {
        this.props.dispatch( products_filter_by_type(this.state.isFilteredByType) );
      }
    } 
  };

//функция фильтрации аккумуляторов по введенному в поле поиска
  searchByQuery = (EO) => {
    let query = EO.target.value;
    
    this.props.dispatch( all_products_show() );
    if (this.state.isFilteredByType!='все') {
      this.props.dispatch( products_filter_by_type(this.state.isFilteredByType) );
    }
    
    (query!='') ? this.props.dispatch( products_searched(query) ) : null
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
            <div className="Catalog_filter_type">
              <div className="Catalog_filter_type_item" onClick={this.showAvtoAkum}>
                Автоаккумуляторы
              </div>
              <div className="Catalog_filter_type_item" onClick={this.showTruckAkum}>
                Грузовые аккумуляторы
              </div>
              <div className="Catalog_filter_type_item" onClick={this.showMotoAkum}>
                Мотоциклетные аккумуляторы
              </div>
            </div>

            <div className="Catalog_filter_sort">
              <div className="Catalog_filter_sort_type">
                <h3>
                {
                  (this.state.isFilteredByType!='все') && this.state.isFilteredByType
                }
                </h3>
              </div>
              <div className="Catalog_filter_sort_search">
                <input type="text" placeholder="Введите поисковый запрос" onChange={this.searchByQuery}></input>
              </div>
              <div className="Catalog_filter_sort_inStock">
              <input type="checkbox" 
                     defaultChecked={this.state.isOnlyInStock} 
                     onClick={this.showOnlyInStock}>
              </input>Только в наличии
              </div>
              <div className="Catalog_filter_sort_byPrice">
                <select className="Catalog_filter_sort_select" onChange={this.handleSorter}>
                  <option value='none'>Сортировать</option>
                  <option value='inc'>по цене с дешевых</option>
                  <option value='dec'>по цене с дорогих</option>
                </select>
              </div>
            </div>
            
            
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
