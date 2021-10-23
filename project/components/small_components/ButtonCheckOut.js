import React from 'react';
import PropTypes from 'prop-types';

import './ButtonCheckOut.css';

class ButtonCheckOut extends React.PureComponent {

static propTypes = {
    message: PropTypes.string.isRequired,
};

showMessage = ()=> {
    alert('Ваша '+this.props.message+' оформлена');
}

  render() {
    let btn_title = (this.props.message==='покупка')?'заказ':'заявку';

    return (
        <button className="Btn_check_out" onClick={this.showMessage}>
            {'Оформить '+btn_title} 
        </button>      
    )
    ;

  }
}

export default ButtonCheckOut;
