import React from 'react';
import PropTypes from 'prop-types';

import './Rainbow.css';

//import RainbowFrame from './RainbowFrame';
import DoubleButton from './DoubleButton';

import { withRainbowFrame } from './withRainbowFrame';

class Rainbow extends React.Component {

  render() {
  let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
   
  let DoubleButtonWithFrame=withRainbowFrame(colors)(DoubleButton);
  
  return (
    <div className="Rainbow">
      <DoubleButton caption1="однажды" caption2="пору" cbPressed={ num => alert(num) } >
        в студёную зимнюю
      </DoubleButton>
      <br/>
      <DoubleButtonWithFrame caption1="однажды" caption2="пору" 
        cbPressed={ (num) => alert(num) } 
      >
      в студёную зимнюю
      </DoubleButtonWithFrame>
    </div>
    
    )
    ;

  }

}

export default Rainbow;
