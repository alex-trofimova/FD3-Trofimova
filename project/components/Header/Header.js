import React from 'react';
//import PropTypes from 'prop-types';

import './Header.css';
import Logo from './../../assets/logo.png';
import { Link  } from 'react-router-dom';

//components
import CartInfo from '../CartInfo/CartInfo';

class Header extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
        <header className="Header">
          <div className="Header_wrapper">
            <div className="Header_logo">
              <Link to="/">
                <img src={Logo} alt="Varta" />
              </Link>
            </div>
            <div className="Header_cartInfo">
              <CartInfo />
            </div>
          </div>
          
        </header>      
    )
    ;

  }

}

export default Header;
