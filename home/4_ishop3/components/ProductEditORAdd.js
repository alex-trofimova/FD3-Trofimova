import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './ProductEditORAdd.css';

class ProductEditORAdd extends React.Component {
    static propTypes = {
        editedORaddedProduct: PropTypes.object,

        usedRegime: PropTypes.number.isRequired,

        cbSaveChanges: PropTypes.func.isRequired, //callback-функция для сохранения изменений о товаре
        cbAddProduct: PropTypes.func.isRequired, //callback-функция для добавления нового товара
    };

    state = {
        productName:this.props.editedORaddedProduct.productName,
        productCode:this.props.editedORaddedProduct.code,
        price:this.props.editedORaddedProduct.price,
        url:this.props.editedORaddedProduct.url,
        residue:this.props.editedORaddedProduct.residue,

        productNameError:'',
        codeError:'',
        priceError:'',
        urlError:'',
        residueError:'',
        allValid:true
    }

   

    nameChanged = (EO) => { 
        this.setState( {productName:EO.target.value} );
    }

    codeChanged = (EO) => { 
        this.setState( {productCode:Number(EO.target.value)} );
    }

    priceChanged = (EO) => { 
        this.setState( {price:Number(EO.target.value)} );
    }

    urlChanged = (EO) => { 
        this.setState( {url:EO.target.value} );
    }

    residueChanged = (EO) => { 
        this.setState( {residue:Number(EO.target.value)} );
    }

    save = () => {
        this.props.cbSaveChanges({ ...this.props.editedORaddedProduct,
            productName: this.state.productName,
            code: this.state.productCode,
            price: this.state.price,
            url: this.state.url,
            residue: this.state.residue,
        });
    }

    add = () => {
        this.props.cbAddProduct({ 
            productName: this.state.productName,
            code: this.state.productCode,
            price: this.state.price,
            url: this.state.url,
            residue: this.state.residue,
        });
    }

    validate = () => { 

        if (this.state.productName=='') {
            this.setState ( {productNameError:'ERROR!', allValid:false} );
        }
        
        else this.setState ( {productNameError:''});
        
        if ((this.state.price=='') || (this.state.price==0)) {
            this.setState ( {priceError:'ERROR!', allValid:false} );
        }
        else this.setState ( {priceError:''});

        if (this.state.url=='') {
            this.setState ( {urlError:'ERROR!', allValid:false} );
        }
        else this.setState ( {urlError:''});

        if ((this.state.residue=='') || (this.state.residue==0)) {
            this.setState ( {residueError:'ERROR!', allValid:false } );
        }
        else this.setState ( {residueError:''});

        if ((this.state.productNameError=='') && (this.state.priceError=='') && 
            (this.state.urlError=='') && (this.state.residueError=='')) {
                this.setState ( {allValid:true})
        }
    }
                        
                



    render() {

        return (
            <div>
                <h3>
                    { (this.props.usedRegime==1)
                        ? 'Редактировать выбранный товар'
                        : 'Добавить новый товар'
                    }
                </h3>

                <div>
                    <span className='ProductEditORAddTitle'>Название товара: </span>
                    <input type='text' name='productName' className='ProductEditORAddInput'
                            value={this.state.productName} 
                            onChange={this.nameChanged} onBlur={this.validate}
                    />
                    <span className='ProductEditORAddError'>{this.state.productNameError}</span>
                </div>

                <div>
                    <span className='ProductEditORAddTitle'>Артикул: </span>
                    <input type='text' name='code' className='ProductEditORAddInput' 
                            value={this.state.productCode} 
                            onChange={this.codeChanged} disabled='true'
                    />
                    <span className='ProductEditORAddError'>{this.state.codeError}</span>
                </div>

                <div>
                    <span className='ProductEditORAddTitle'>Цена: </span>
                    <input type='text' name='price' className='ProductEditORAddInput' 
                            value={this.state.price} 
                            onChange={this.priceChanged} onBlur={this.validate}
                    />
                    <span className='ProductEditORAddError'>{this.state.priceError}</span>
                </div>

                <div>
                    <span className='ProductEditORAddTitle'>Ссылка: </span>
                    <input type='text' name='url' className='ProductEditORAddInput'
                            value={this.state.url}
                            onChange={this.urlChanged} onBlur={this.validate}
                    />
                    <span className='ProductEditORAddError'>{this.state.urlError}</span>
                </div>
                
                <div>
                    <span className='ProductEditORAddTitle'>Остаток на складе: </span>
                    <input type='text' name='residue' className='ProductEditORAddInput'
                            value={this.state.residue}
                            onChange={this.residueChanged} onBlur={this.validate}
                    />
                    <span className='ProductEditORAddError'>{this.state.residueError}</span>
                </div>
                
                <div>
                    {
                        (this.props.usedRegime==1)
                        ?
                        <button className='ProductEditORAddBtn' value='save' onClick={this.save}
                                disabled={!this.state.allValid}>сохранить</button>
                        :
                        <button className='ProductEditORAddBtn' value='add' onClick={this.add}
                                disabled={!this.state.allValid}>добавить</button>
                    }
                    <button className='ProductEditORAddBtn' value='cancel' onClick={this.cancelAction}>отмена</button>
                </div>
            </div>
            
        )

    }
}

export default ProductEditORAdd;