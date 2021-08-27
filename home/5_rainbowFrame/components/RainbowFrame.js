import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  render() {
    let setOfFrames = this.props.colors.map((elem,index) => 
    <div key={index} style={{border:"solid 4px "+elem, position: 'absolute', 
                  left: 5*index+'px', top: 5*index+'px',
                  width: (400-10*index)+'px', 
                  height: (200-10*index)+'px'}}/>
    );
    
    return (
      <div className="Rainbow">
        {setOfFrames} 
        <p className='RainbowContent'>{this.props.children}</p>
      </div>
    );
  }

}

export default RainbowFrame;
