import React from 'react';
import PropTypes from 'prop-types';

import './ButtonDelete.css';

class ButtonDelete extends React.PureComponent {

static propTypes = {
    classColor: PropTypes.string.isRequired,
};

  render() {
    
    return (
    <div className='ButtonDelete_cross' >
        <div className={this.props.classColor+' ButtonDelete_line ButtonDelete_first_line'}></div>
        <div className={this.props.classColor+' ButtonDelete_line ButtonDelete_second_line'}></div>
    </div>     
    )
    ;

  }
}

export default ButtonDelete;
