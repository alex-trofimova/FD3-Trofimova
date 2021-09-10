import React from 'react';
import PropTypes from 'prop-types';

import {mobileCompanyEvents} from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  };

  state = {
    info: this.props.info,
  };

  componentWillReceiveProps = (newProps) => {
    this.setState( {info:newProps.info} );
  };

  delete = () => {
    mobileCompanyEvents.emit('EClientToDelete',this.state.info.id);
  }

  edit = () => {
    mobileCompanyEvents.emit('EClientToEdit',this.state.info);
  }

  render() {

    console.log("MobileClient id="+this.state.info.id+" render");
    
    return (
      <tr className='MobileClient'>
        <td className='ClientCell ClientFam'>{this.state.info.fam}</td>
        <td className='ClientCell ClientIm'>{this.state.info.im}</td>
        <td className='ClientCell ClientOtch'>{this.state.info.otch}</td>
        <td className='ClientCell ClientBalance'>{this.state.info.balance}</td>
        <td className='ClientCell ClientStatus'>{this.state.info.status}</td>
        <td className='ClientCell ClientEdit'>
          <button className='ClientBtn' onClick={this.edit}>редактировать</button>
        </td>
        <td className='ClientCell ClientDelete'>
          <button className='ClientBtn' onClick={this.delete}>удалить</button>
        </td>
      </tr>
      )
  }

}

export default MobileClient;
