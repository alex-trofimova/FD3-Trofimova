import React from 'react';
import PropTypes from 'prop-types';

import {mobileCompanyEvents} from './events';

import './AddOrEditClient.css';

class AddOrEdiClient extends React.PureComponent {
    static propTypes = {
        editingOrNewClient: PropTypes.shape({
          id: PropTypes.number.isRequired,
          fam: PropTypes.string.isRequired,
          im: PropTypes.string.isRequired,
          otch: PropTypes.string.isRequired,
          balance: PropTypes.number.isRequired,
          status: PropTypes.string.isRequired,
        }),
        usedRegime: PropTypes.number.isRequired,
    };

    state = {
        editingOrNewClient: this.props.editingOrNewClient,
        usedRegime: this.props.usedRegime,
    };

    componentWillReceiveProps = (newProps) => {
        this.setState( {editingOrNewClient:newProps.editingOrNewClient, usedRegime:newProps.usedRegime} );
    };

    //использование ref для работы с полями формы
    idTextRef = null;
    famTextRef = null;
    imTextRef = null;
    otchTextRef = null;
    balanceTextRef = null;

    setIdTextRef = (ref) => {
        this.idTextRef=ref;
    };
    setFamTextRef = (ref) => {
        this.famTextRef=ref;
    };
    setImTextRef = (ref) => {
        this.imTextRef=ref;
    };
    setOtchTextRef = (ref) => {
        this.otchTextRef=ref;
    };
    setBalanceTextRef = (ref) => {
        this.balanceTextRef=ref;
    };
    
    //описание функции для добавления клиента по кнопке "Добавить"
    addNewClient = () => {
        let newAddingClient={};
        newAddingClient.id=this.state.editingOrNewClient.id;
        newAddingClient.fam=this.famTextRef.value;
        newAddingClient.im=this.imTextRef.value;
        newAddingClient.otch=this.otchTextRef.value;
        newAddingClient.balance=Number(this.balanceTextRef.value);

        if (newAddingClient.balance>0){
            newAddingClient.status='active';
        }
        else newAddingClient.status='blocked';

        mobileCompanyEvents.emit('EClientToAdd',newAddingClient);
    }

    cancelAction = () => {
        mobileCompanyEvents.emit('EClientToCancel');
    }

    //описание функции для сохранения изменений выбранного для редактирования клиента по кнопке "Сохранить изменения"
    saveEditedClient = () => {
        let EditedClient={};
        EditedClient.id=Number(this.state.editingOrNewClient.id)
        EditedClient.fam=this.famTextRef.value;
        EditedClient.im=this.imTextRef.value;
        EditedClient.otch=this.otchTextRef.value;
        EditedClient.balance=Number(this.balanceTextRef.value);
        if (EditedClient.balance>0){
            EditedClient.status='active';
        }
        else EditedClient.status='blocked';

        mobileCompanyEvents.emit('EClientToSaveChanges',EditedClient);
    }

    render() {

        console.log("AddOrEditClient id="+this.state.editingOrNewClient.id+" render");
        
        return (
            <div className="AddOrEditClient_card">
            <h3>
                { (this.state.usedRegime===1)
                  ? 'Редактировать выбранного клиента'
                  : 'Добавить нового клиента'
                }
              </h3>
            <div>
              <span className='AddOrEditClient_title'>Фамилия: </span>
              <input type='text' name='clientFam' className='AddOrEditClient_input'
                    ref={this.setFamTextRef}
                    defaultValue={this.state.editingOrNewClient.fam}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Имя: </span>
              <input type='text' name='clientIm' className='AddOrEditClient_input'
                    ref={this.setImTextRef}
                    defaultValue={this.state.editingOrNewClient.im}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Отчество: </span>
              <input type='text' name='clientOtch' className='AddOrEditClient_input'
                    ref={this.setOtchTextRef}
                    defaultValue={this.state.editingOrNewClient.otch}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Баланс: </span>
              <input type='text' name='clientBalance' className='AddOrEditClient_input'
                    ref={this.setBalanceTextRef}
                    defaultValue={this.state.editingOrNewClient.balance}
              />
            </div>
            
            { (this.state.usedRegime==1)
              ? <button className='AddOrEditClient_btn' value='add' onClick={this.saveEditedClient}>
                    Сохранить изменения
                  </button>
              : <button className='AddOrEditClient_btn' value='add' onClick={this.addNewClient}>
                    Добавить
                </button>
            }
            
            <button className='AddOrEditClient_btn' value='cancel' onClick={this.cancelAction}>Отмена</button>
          </div>
          
          )
      }
}

export default AddOrEdiClient;