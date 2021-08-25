import React from 'react';
import PropTypes from 'prop-types';

import './IShop.css';

import Product from './Product';
import ProductSelectedInfo from './ProductSelectedInfo';
import ProductEditORAdd from './ProductEditORAdd';

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
          productsList: this.props.products, //массив товаров

          selectedProductCode: null, //артикул выделяемого товара

          editedProductCode: null, //артикул редактируемого товара
          
          //условие в каком режиме: просмотра (=0) редактирования (=1) или добавления (=2)  
          //будет отображаться карточка товара
          usedRegime: 0, //первоначально режим просмотра

          wereChangesDone: false,
          
    }

    //описание функции для удаления товара по кнопке "удалить"
    productToRemove = (code) => {
        let sureDelete = confirm('Вы уверены, что хотите удалить этот товар?');
            (sureDelete)
            ? 
            this.setState( {productsList:this.state.productsList.filter(elem => elem.code!=code)} )
            :
            this.setState( {productsList:this.state.productsList} )       
    }

    //описание функции для редактирования товара по кнопке "редактировать"
    productToEdit = (code) => {
        this.setState( {editedProductCode:code,
                        selectedProductCode:code,
                        usedRegime: 1} );
    }

    //описание функции для добавления нового товара по кнопке "добавить новый товар"
    addNewProduct = () => {
        this.setState( {usedRegime:2, selectedProductCode:null, wereChangesDone:false} );
    }

    //описание функции для отмены действий по кнопке "отмена"
    cancelAction = () => {
        this.setState( {usedRegime:0, selectedProductCode:null} );
    }

    //описание функции для проверки были ли внесены изменения 
    //- для блокирования кнопки "редактировать" и выделения строки, если это так
    checkForChanges = (answer) => {
        this.setState( {wereChangesDone: answer} );
    }

    //описание функции для выделения товара по клику на строку (кроме кнопки)
    productSelected = (code) => {
        if (this.state.usedRegime!=2 && (this.state.wereChangesDone==false)) {
            this.setState( {selectedProductCode:code, usedRegime:0} );
        } 
    }

    //описание функции для сохранения изменений при редактировании товара по кнопке "сохранить"
    productEditedToSave = (newElem) => {
        let newProductsList = this.state.productsList.map(elem =>
            (elem.code==newElem.code)
            ? newElem
            : elem
        );
        this.setState( {productsList:newProductsList, usedRegime:0, wereChangesDone:false} );
    }

    //описание функции для добавления нового товара в таблицу по кнопке "добавить"
    productToAdd = (newElem) => {
        this.state.productsList.push(newElem);
        this.setState( {productsList:this.state.productsList, usedRegime:0 });
    }

    render () {

        let ishopTableContent=this.state.productsList.map( elem =>
            <Product key={elem.code} productName={elem.productName}
                    code={elem.code} price={elem.price} url={elem.url}
                    residue={elem.residue}
                    cbSelected={this.productSelected}
                    cbToRemove={this.productToRemove}
                    cbToEdit={this.productToEdit}
                    selectedProductCode={this.state.selectedProductCode}
                    editedProductCode={this.state.editedProductCode}
                    productsList={this.state.productsList}
                    usedRegime={this.state.usedRegime}
                    wereChangesDone={this.state.wereChangesDone} 
            />
        );

         //хэш с данными редактируемого товара
        let editedProduct = this.state.productsList.find(elem => elem.code==this.state.editedProductCode);
        //начальный (пустой фактически) хэш для добавления товара
        let addingProduct = {
            productName: '',
            code: '',
            price: '',
            url:'',
            residue: '',
        }

        let editedORaddedProduct = (this.state.usedRegime==1)?editedProduct:addingProduct;

        let ishopCardContent=this.state.productsList.find(elem => elem.code==this.state.selectedProductCode); 

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
                    (this.state.usedRegime==0) 
                    ?
                    <button className='IShopNewProductBtn' value='add' 
                        onClick={this.addNewProduct}>добавить новый товар
                    </button>
                    :
                    <ProductEditORAdd  
                        editedORaddedProduct={editedORaddedProduct}
                        editedProductCode={this.state.editedProductCode} 
                        usedRegime={this.state.usedRegime}
                        cbSaveChanges={this.productEditedToSave} 
                        cbAddProduct={this.productToAdd} 
                        cbCancelAction={this.cancelAction}
                        cbCheckForChanges={this.checkForChanges} 
                    />
                }

                {
                    (this.state.usedRegime==0 && this.state.selectedProductCode) &&
                    <ProductSelectedInfo productName={ishopCardContent.productName}
                        code={ishopCardContent.code} 
                        price={ishopCardContent.price} 
                        url={ishopCardContent.url} 
                        residue={ishopCardContent.residue}
                        usedRegime={this.state.usedRegime} 
                    />
                }     
            </div>    
        );
    }
}

export default IShop;