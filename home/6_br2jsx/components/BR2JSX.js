import React from 'react';
import PropTypes from 'prop-types';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };
  
  render() {

    let textRe=/<br\s*\/?>/;
    let words = this.props.text.split(textRe);

    let parts = [];
    words.forEach( (word, index) => 
      {
        if (index) parts.push(<br key={index}/>);
        parts.push(word);
      }
    )

    return ( 
      <div className="br2jsx">{parts}</div>
    );
  }

}

export default BR2JSX;
