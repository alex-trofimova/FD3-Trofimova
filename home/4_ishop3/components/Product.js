import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {

    static propTypes = {
        productName: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        residue: PropTypes.number.isRequired,
        cbSelected: PropTypes.func.isRequired, //callback-функция для выделения строки с товаром
        cbToRemove: PropTypes.func.isRequired, //callback-функция для удаления строки с товаром
        selectedProductCode: PropTypes.number, // может быть null, пока ни один товар не выбран
        deletedProductCode: PropTypes.number, // может быть null, пока ни один товар не выбран для удаления
    };

    productClicked = (EO) => {
        this.props.cbSelected(this.props.code); 
    }

    delete = (EO) => {
        EO.stopPropagation(); //чтобы кнопка не реагировала на выделение строки при ее клике
        this.props.cbToRemove(this.props.code);
    }

    render() {
        //выделение строки с товаром, на которую кликнули, посредством "замены" класса стилей 
        //если артикул (code) совпадает с selectedProductCode, то класс ProductInfo_select
        //если не совпадает - класс ProductInfo_init
        
        return (
            <tr className={
                    (this.props.selectedProductCode!=this.props.code)
                    ?'ProductInfo_init'
                    :'ProductInfo_select'
                } 
            onClick={this.productClicked} >
                <td className={'ProductCell ProductName '+this.props.code}>{this.props.productName}</td>
                <td className='ProductCell ProductPrice'>{this.props.price}</td>
                <td className='ProductCell ProductUrl'>
                    <a href={this.props.url} target='_blank'>
                        <img src={this.props.url} width='100px'/> 
                    </a>
                </td>
                <td className='ProductCell ProductResidue'>{this.props.residue}</td>
                <td className='ProductCell ProductDelete'>
                    <button value={this.props.code} onClick={this.delete}>удалить</button>
                </td>
            </tr>
        )   
    }
}

export default Product;