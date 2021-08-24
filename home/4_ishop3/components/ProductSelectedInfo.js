import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './ProductSelectedInfo.css';

class ProductSelectedInfo extends React.Component {

    static propTypes = {
        productName: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        residue: PropTypes.number.isRequired,

        usedRegime: PropTypes.number.isRequired,
    };

    render() {

        console.log(this.props.usedRegime);

        return (
            <div>
                {
                    (this.props.usedRegime!=1)&&
                    <div>
                        <h3>{this.props.productName}</h3>
                        <div>Артикул товара: <span className='ProductSelectedInfoSpan'>{this.props.code}</span></div>
                        <div>Ссылка: <span className='ProductSelectedInfoSpan'>{this.props.url}</span></div>
                        <div>Цена: <span className='ProductSelectedInfoSpan'>{this.props.price}</span></div>
                        <div>Остаток на складе: <span className='ProductSelectedInfoSpan'>{this.props.residue}</span></div>
                    </div>
                }
               
            </div>
            
        )

    }

}

export default ProductSelectedInfo;