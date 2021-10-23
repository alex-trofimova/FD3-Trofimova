import React from 'react';
import PropTypes from 'prop-types';

import ButtonDelete from '../small_components/ButtonDelete';

import './Modal.css';

class Modal extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired, //заголовок всплывающего окна
    cbToClose: PropTypes.func.isRequired, //callback-функция для закрытия всплывающего окна
  };

  state = {
    //для определения состояния активности/неактивности
    isShown: true, 
  };

  close =() => {
    this.props.cbToClose();
  }

  render() {

    return (
        <div className="Modal_overlay" onClick={this.close}>
          <div className="Modal_content"  onClick={e=> e.stopPropagation()}>
            <div className="Modal_header">
              <div className="Modal_title">{this.props.title}</div>
              <div className="Modal_closeButton" 
                  onClick={this.close}
              >
                <ButtonDelete classColor='cross_white'/>
              </div>
            </div>
            {this.props.children}
          </div>
        </div>      
    )
    ;

  }

}

export default Modal;
