import React from 'react';

import './IShop.css';

import Product from './Product';

var IShop = React.createClass({

    displayName: 'IShop',

    propTypes: {
        title: React.PropTypes.string.isRequired, //название интернет-магазина
        products:React.PropTypes.arrayOf( //массив со списком товаром и их хар-ками
          React.PropTypes.shape({
            productName: React.PropTypes.string.isRequired,
            code: React.PropTypes.number.isRequired,
            price: React.PropTypes.number.isRequired,
            url: React.PropTypes.string.isRequired,
            residue: React.PropTypes.number.isRequired,
          })
        )
    },


    getInitialState: function() {
        return {
          productsList: this.props.products,  //массив товаров 
          selectedProductCode: null, //артикул выделяемого товара
          deletedProductCode: null, //артикул товара, предназначенного для удаления
        };
    },

    //описание функции для удаления товара по кнопке удалить
    productToRemove: function(code) {
        this.setState( {deletedProductCode:code} ); //запоминается в состоянии артикул
        var sureDelete = confirm('Вы уверены, что хотите удалить этот товар?');
        if (sureDelete) {
            this.setState( {productsList:this.state.productsList.filter(elem => elem.code!=code)} ); //массив обрезается минус товар с таким артикулом
        }
        else {
            this.setState( {productsList:this.state.productsList} );
        }        
    },

    //описание функции для выделения товара по клику на строку (кроме кнопки)
    productSelected: function(code){
        this.setState( {selectedProductCode:code} );
    },

    render: function() {
        var ishopTableContent=this.state.productsList.map( elem =>
          React.createElement(Product, {key:elem.code, productName:elem.productName, code:elem.code,
                                        price:elem.price, url:elem.url, residue:elem.residue,
                                        cbSelected:this.productSelected,
                                        cbToRemove:this.productToRemove,
                                        selectedProductCode:this.state.selectedProductCode,
                                        deletedProductCode:this.state.deletedProductCode,
                                        productsList:this.state.productsList} )
        );

        return React.DOM.div( {className:'IShopProductsList'},  
            React.DOM.table( {className:'IShopInfo'}, 
                React.DOM.caption( {className:'IShopTitle'}, this.props.title+', ассортимент товаров'),
                React.DOM.thead( {className:'HeaderContent'}, 
                    React.DOM.tr({className:'TableHeader'},
                        React.DOM.th({className:'HeaderProductName'}, 'товар'),
                        React.DOM.th({className:'HeaderProductPrice'}, 'цена'),
                        React.DOM.th({className:'HeaderProductPhoto'}, 'ссылка'),
                        React.DOM.th({className:'HeaderProductResidue'}, 'остаток'),
                        React.DOM.th({className:'HeaderProductControl'}, 'управление')
                    )
                ),
                React.DOM.tbody( {className:'IShopContent'}, ishopTableContent),
            )
        );
    },
})

export default IShop;