import React from 'react';

import './Product.css';

var Product = React.createClass({

    displayName: 'Product',

    propTypes: {
        productName: React.PropTypes.string.isRequired,
        code: React.PropTypes.number.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        residue: React.PropTypes.number.isRequired,
        cbSelected: React.PropTypes.func.isRequired, //callback-функция для выделения строки с товаром
        cbToRemove: React.PropTypes.func.isRequired, //callback-функция для удаления строки с товаром
        selectedProductCode: React.PropTypes.number, // может быть null, пока ни один товар не выбран
        deletedProductCode: React.PropTypes.number, // может быть null, пока ни один товар не выбран для удаления
    },

    productClicked: function(EO) {
        this.props.cbSelected(this.props.code); 
    },

    delete: function(EO){
        EO.stopPropagation(); //чтобы кнопка не реагировала на выделение строки при ее клике
        this.props.cbToRemove(this.props.code);
    },

    render: function() {
        //выделение строки с товаром, на которую кликнули, посредством "замены" класса стилей 
        //если артикул (code) совпадает с selectedProductCode, то класс ProductInfo_select
        //если не совпадает - класс ProductInfo_init
        return React.DOM.tr( {className: ((this.props.selectedProductCode!=this.props.code)?'ProductInfo_init':'ProductInfo_select') , 
                              onClick: this.productClicked},
                React.DOM.td({className:'ProductCell ProductName '+this.props.code},this.props.productName),
                React.DOM.td({className:'ProductCell ProductPrice'},this.props.price),
                React.DOM.td({className:'ProductCell ProductUrl'},
                    React.DOM.a({href:this.props.url, target:'_blank'},
                        React.DOM.img({src:this.props.url, width:'100px'}))
                    ),
                React.DOM.td({className:'ProductCell ProductResidue'},this.props.residue),
                React.DOM.td({className:'ProductCell ProductDelete'}, 
                    React.DOM.button( {value:this.props.code, onClick:this.delete}, 'удалить' )
                ),  
        );       
    },
})

export default Product;