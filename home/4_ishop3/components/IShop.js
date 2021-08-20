import React from 'react';
import PropTypes from 'prop-types';

import './IShop.css';

import Product from './Product';
import ProductSelectedInfo from './ProductSelectedInfo';

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
          editedProductCode: null, //артикул редактируемого товара

          //условие отображения содержимого под таблицей
          //true - будет показана кнопка Добавить новый товар
          //false - режим добавления/редактирования карточки товара
          showNewProductButton: true,
          
          //условие в каком режиме: добавления (=1) или редактирования (=2)
          //будет отображаться карточка товара
          usedRegime: null, //первоначально никакой
          
    }

    //описание функции для удаления товара по кнопке удалить
    productToRemove = (code) => {
        let sureDelete = confirm('Вы уверены, что хотите удалить этот товар?');
            (sureDelete)
            ? 
            this.setState( {productsList:this.state.productsList.filter(elem => elem.code!=code)} )
            :
            this.setState( {productsList:this.state.productsList} )       
    }

    //описание функции для редактирования товара по кнопке редактировать
    productToEdit = (code) => {
        this.setState( {editedProductCode:code, usedRegime: 2} );
        console.log('перешли в режим №'+this.state.usedRegime+' для товара с кодом '+this.state.editedProductCode);
    }

    //описание функции для выделения товара по клику на строку (кроме кнопки)
    productSelected = (code) => {
        this.setState( {selectedProductCode:code, showNewProductButton:true } );
    }

    addNewProduct = () => {
        this.setState( {showNewProductButton:false } );
        console.log('давайте что-нибудь добавим');
    }

    render () {
        var ishopTableContent=this.state.productsList.map( elem =>
            <Product key={elem.code} productName={elem.productName}
                    code={elem.code} price={elem.price} url={elem.url}
                    residue={elem.residue} 
                    cbSelected={this.productSelected}
                    cbToRemove={this.productToRemove}
                    cbToEdit={this.productToEdit}
                    selectedProductCode={this.state.selectedProductCode}
                    editedProductCode={this.state.editedProductCode}
                    productsList={this.state.productsList} 
            />
        );

        var ishopCardContentArr=this.state.productsList.filter( elem => 
            elem.code==this.state.selectedProductCode )

        var ishopCardContent=ishopCardContentArr[0];
        

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
                {
                    (this.state.showNewProductButton) &&
                    <button className='IShopNewProductBtn' value='add' 
                        onClick={this.addNewProduct}>добавить новый товар
                    </button>
                }

                {
                    (this.state.selectedProductCode) &&
                    <ProductSelectedInfo productName={ishopCardContent.productName}
                        code={ishopCardContent.code} 
                        price={ishopCardContent.price} 
                        url={ishopCardContent.url} 
                        residue={ishopCardContent.residue} 
                    />
                }     
            </div>    
        );
    }
}

export default IShop;