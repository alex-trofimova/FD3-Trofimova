import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  render() {

    let z=this.props.children;
    this.props.colors.forEach( elem => {
      z = <div style={{border:"solid 4px "+elem, textAlign:'center', 
                        fontSize:'24px', fontWeight:'bold'}} 
                className={(elem!=this.props.colors[0])?'oneFrame_all':'oneFrame_last'} 
          >{z}</div>
    } );
    
    return (
      <div className="Rainbow">
        {z}
      </div>
    );
  }

}

export default RainbowFrame;
