import React from 'react';
import PropTypes from 'prop-types';

import './IShop.css';

import Product from './Product';

class IShop extends React.Component{

    static propTypes = {
        title: PropTypes.string.isRequired, //название интернет-магазина
        products: PropTypes.arrayOf( //массив со списком товаром и их хар-ками
          PropTypes.shape({
            productName: PropTypes.string.isRequired,
            code: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            residue: PropTypes.number.isRequired,
          })
        )
    };


    state = {
          productsList: this.props.products,  //массив товаров 
          selectedProductCode: null, //артикул выделяемого товара
          deletedProductCode: null, //артикул товара, предназначенного для удаления
    }

    //описание функции для удаления товара по кнопке удалить
    productToRemove = (code) => {
        this.setState( {deletedProductCode:code} ); //запоминается в состоянии артикул
        let sureDelete = confirm('Вы уверены, что хотите удалить этот товар?');
            (sureDelete)
            ? 
            this.setState( {productsList:this.state.productsList.filter(elem => elem.code!=code)} )
            :
            this.setState( {productsList:this.state.productsList} )       
    }

    //описание функции для выделения товара по клику на строку (кроме кнопки)
    productSelected = (code) => {
        this.setState( {selectedProductCode:code} );
    }

    render () {
        var ishopTableContent=this.state.productsList.map( elem =>
            <Product key={elem.code} productName={elem.productName}
                    code={elem.code} price={elem.price} url={elem.url}
                    residue={elem.residue} 
                    cbSelected={this.productSelected}
                    cbToRemove={this.productToRemove}
                    selectedProductCode={this.state.selectedProductCode}
                    deletedProductCode={this.state.deletedProductCode}
                    productsList={this.state.productsList} 
            />
        );

        return (
            <div className='IShopProductsList'>
                <table className='IShopInfo'>
                    <caption className='IShopTitle'>{this.props.title+', ассортимент товаров'}</caption>
                    <thead className='HeaderContent'>
                        <tr className='TableHeader'>
                            <th className='HeaderProductName'>товар</th>
                            <th className='HeaderProductPrice'>цена</th>
                            <th className='HeaderProductPhoto'>ссылка</th>
                            <th className='HeaderProductResidue'>остаток</th>
                            <th className='HeaderProductControl'>управление</th>
                        </tr>        
                    </thead> 
                    <tbody className='IShopContent'>{ishopTableContent}</tbody>
                </table>     
            </div>    
        );
    }
}

export default IShop;