import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './ProductEditORAdd.css';

class ProductEditORAdd extends React.Component {
    static propTypes = {
        editedORaddedProduct: PropTypes.object,
        editedProductCode: PropTypes.number,

        usedRegime: PropTypes.number.isRequired,

        cbSaveChanges: PropTypes.func.isRequired, //callback-функция для сохранения изменений о товаре
        cbAddProduct: PropTypes.func.isRequired, //callback-функция для добавления нового товара
        cbCancelAction: PropTypes.func.isRequired, //callback-функция для отмены действий
        cbCheckForChanges: PropTypes.func.isRequired //callback-функция для "извещения" о любых изменениях
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
        allValid:true,

        addBtnDisable:true,

        wereAnyChages:false
    }

    componentDidUpdate(prevProps) {
        if (this.props.editedORaddedProduct !== prevProps.editedORaddedProduct) {
          this.setState( {  productName:this.props.editedORaddedProduct.productName,
                            productCode:this.props.editedORaddedProduct.code,
                            price:this.props.editedORaddedProduct.price,
                            url:this.props.editedORaddedProduct.url,
                            residue:this.props.editedORaddedProduct.residue
                         }   );
        }
      }

    nameChanged = (EO) => { 
        this.setState( {productName:EO.target.value, wereAnyChages:true}, () => {
            this.validate();
        } );
    }

    codeChanged = (EO) => { 
        this.setState( {productCode:EO.target.value, wereAnyChages:true}, () => {
            this.validate();
        } );
    }

    priceChanged = (EO) => { 
        this.setState( {price:EO.target.value, wereAnyChages:true}, () => {
            this.validate();
        } );
    }

    urlChanged = (EO) => { 
        this.setState( {url:EO.target.value, wereAnyChages:true}, () => {
            this.validate();
        } );
    }

    residueChanged = (EO) => { 
        this.setState( {residue:EO.target.value, wereAnyChages:true}, () => {
            this.validate();
        } );
    }

    save = () => {
        this.props.cbSaveChanges({ ...this.props.editedORaddedProduct,
            productName: this.state.productName,
            code: Number(this.state.productCode),
            price: Number(this.state.price),
            url: this.state.url,
            residue: Number(this.state.residue),
        });
    }

    add = () => {
        this.props.cbAddProduct({ 
            productName: this.state.productName,
            code: Number(this.state.productCode),
            price: Number(this.state.price),
            url: this.state.url,
            residue: Number(this.state.residue),
        });
    }

    cancelAction = () => {
        this.setState( {wereAnyChages:false});
        this.props.cbCancelAction();
    }

    validate = () => {
    
        if (this.props.usedRegime==1) {
            this.props.cbCheckForChanges(this.state.wereAnyChages);
        }      

        let allValid = true;

        if (this.state.productName=='') {
            this.setState( {productNameError:'Поле не должно быть пустым!'} );
            allValid=false;
        }
        else this.setState( {productNameError:''} );

        
        if (this.state.productCode=='') {
            this.setState( {codeError:'Поле не должно быть пустым!'} );
            allValid=false;
        }
        else this.setState( {codeError:''});

        if ((this.state.price=='') || (this.state.price==0)) {
            this.setState( {priceError:'Поле не должно быть пустым!'} );
            allValid=false;
        }
        else this.setState( {priceError:''});

        if (this.state.url=='') {
            this.setState( {urlError:'Поле не должно быть пустым!'} );
            allValid=false;
        }
        else this.setState( {urlError:''});

        if ((this.state.residue=='')) {
            this.setState( {residueError:'Поле не должно быть пустым!'} );
            allValid=false;
        }
        else this.setState( {residueError:''});

        if (allValid==true) {
            this.setState( {allValid:true, addBtnDisable:false} );
        }
        else this.setState( {allValid:false, addBtnDisable:true} );
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
                            onChange={this.nameChanged} 
                    />
                    <span className='ProductEditORAddError'>{this.state.productNameError}</span>
                </div>

                <div>
                    <span className='ProductEditORAddTitle'>Артикул: </span>
                    {
                        (this.props.usedRegime==1)
                        ?
                        <input type='text' name='code' className='ProductEditORAddInput' 
                            value={this.state.productCode} disabled='false'
                        />
                        :
                        <input type='text' name='code' className='ProductEditORAddInput' 
                            value={this.state.productCode} 
                            onChange={this.codeChanged}
                        />
                    }
                    
                    <span className='ProductEditORAddError'>{this.state.codeError}</span>
                </div>

                <div>
                    <span className='ProductEditORAddTitle'>Цена: </span>
                    <input type='text' name='price' className='ProductEditORAddInput' 
                            value={this.state.price} 
                            onChange={this.priceChanged}
                    />
                    <span className='ProductEditORAddError'>{this.state.priceError}</span>
                </div>

                <div>
                    <span className='ProductEditORAddTitle'>Ссылка: </span>
                    <input type='text' name='url' className='ProductEditORAddInput'
                            value={this.state.url}
                            onChange={this.urlChanged}
                    />
                    <span className='ProductEditORAddError'>{this.state.urlError}</span>
                </div>
                
                <div>
                    <span className='ProductEditORAddTitle'>Остаток на складе: </span>
                    <input type='text' name='residue' className='ProductEditORAddInput'
                            value={this.state.residue}
                            onChange={this.residueChanged}
                    />
                    <span className='ProductEditORAddError'>{this.state.residueError}</span>
                </div>
                
                <div>
                    {
                        (this.props.usedRegime==1)
                        ?
                        <button className='ProductEditORAddBtn' value='save' onClick={this.save}
                                disabled={this.state.allValid==false}>сохранить</button>
                        :
                        <button className='ProductEditORAddBtn' value='add' onClick={this.add}
                                disabled={this.state.addBtnDisable}>добавить</button>
                    }
                    <button className='ProductEditORAddBtn' value='cancel' onClick={this.cancelAction}>отмена</button>
                </div>
            </div>
            
        )

    }
}

export default ProductEditORAdd;