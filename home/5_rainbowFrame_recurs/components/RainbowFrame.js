import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.array.isRequired,
  };
  
  render() {

    if (this.props.colors.length==0) 
      return (this.props.children);
    
    else {
      return (
        <div style={{border:"solid 4px "+this.props.colors[0], textAlign:'center',
                      fontSize:'24px', fontWeight:'bold'}}
              className={(this.props.colors.length==1)?'oneFrame_last':'oneFrame_all'}>

          <RainbowFrame colors={this.props.colors.slice(1)}>
            {this.props.children}
          </RainbowFrame>
          
        </div>
      );
    } 
  }

}

export default RainbowFrame;
