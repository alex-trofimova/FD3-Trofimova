import React from 'react';
import PropTypes from 'prop-types';

import './Result.css';

import BR2JSX from './BR2JSX';

class Result extends React.Component {

  render() {
    let text="первый<br>второй<br/>третий<br />последний";
    return <BR2JSX text={text}/>;
  }
}

export default Result;
