import React from 'react';
import PropTypes from 'prop-types';

import './Rainbow.css';

import RainbowFrame from './RainbowFrame';

class Rainbow extends React.Component {

  render() {
  let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
    
  return (
    <div className="Rainbow">
        <RainbowFrame colors={colors}>
          Hello!
        </RainbowFrame>
    </div>
    )
    ;

  }

}

export default Rainbow;
