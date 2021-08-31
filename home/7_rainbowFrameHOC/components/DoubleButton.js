import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component {

  static propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
  };

  pressBtn1 = () => {
    this.props.cbPressed(this.props.caption1); 
  }

  pressBtn2 = () => {
    this.props.cbPressed(this.props.caption2); 
  }
  
  render() {
    
    return (
      <div>
        <input type="button" value={this.props.caption1} className="btn" onClick={this.pressBtn1}></input>
        <span>{this.props.children}</span>
        <input type="button" value={this.props.caption2} className="btn" onClick={this.pressBtn2}></input>
      </div>
    );  
      
  }

}

export default DoubleButton;
