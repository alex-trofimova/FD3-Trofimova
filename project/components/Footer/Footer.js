import React from 'react';
//import PropTypes from 'prop-types';

import './Footer.css';

class Footer extends React.PureComponent {

  static propTypes = {
    //name: PropTypes.string.isRequired,
  };

  render() {

    return (
        <footer className="Footer">
          <div className="Footer_wrapper">
            @Trofimova 2021
          </div>
          
        </footer>      
    )
    ;

  }

}

export default Footer;
