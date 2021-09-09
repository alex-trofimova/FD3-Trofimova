import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import {mobileCompanyEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,//имя мобильной компании
    clients:PropTypes.arrayOf( //массив данных о ее клиентах
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: this.props.name, 
    clients: this.props.clients,

    //условие в каком режиме: просмотра (=0) редактирования (=1) или добавления (=2)  
    //будет отображаться страница
    usedRegime: 0, //первоначально режим просмотра

    //хэш для добавления нового клиента, изначально пустой
    addingClient: {
      id: '', 
      fam: '', im: '', otch:'',
      balance: '', status: '',
    },

    //хэш для редактирования выбранного клиента, изначально пустой
    editingClient:{},

  };

  //прием событий из потока событий mobileCompanyEvents
  componentDidMount = () => {
    mobileCompanyEvents.addListener('EClientToDelete',this.clientToRemove);
    mobileCompanyEvents.addListener('EClientToEdit',this.clientToEdit);
  };

  //"отписка" от них
  componentWillUnmount = () => {
    mobileCompanyEvents.removeListener('EClientToDelete',this.clientToRemove);
    mobileCompanyEvents.removeListener('EClientToEdit',this.clientToEdit);
  };

  //изменение имени компании по кнопке
  setName1 = () => {
    this.setState({name:'MTS'});
  };

  setName2 = () => {
    this.setState({name:'Velcom'});
  };

  //описание функции для отображения всех клиентов
  showAllClients = () => {
    let newClients=this.props.clients; //создаю новый массив и кладу в него пропс - первоначальный массив клиентов
    this.setState( {clients:newClients} );//для перерендера MobileCompany в стейт ссылку на новый массив
  }

  //описание функции для отображения только активных клиентов
  //использую метод filter - он сам создает новый массив, поэтому MobileCompany перерендерится
  showActiveClients = () => {
    this.setState( {clients:this.state.clients.filter(elem => elem.status==="active")} );
  }

  //аналогично
  showBlockedClients = () => {
    this.setState( {clients:this.state.clients.filter(elem => elem.status==="blocked")} );
  }

  //описание функции отображения карточки добавления клиента при нажатии кнопки "Добавить нового клиента"
  showAddClientCard = () => {
    this.setState( {usedRegime:2} )
  }

  //описание функции для удаления клиента по событию EClientToDelete
  clientToRemove = (id) => {
    this.setState( {clients:this.state.clients.filter(elem => elem.id!=id)} );       
  }

   //описание функции для удаления клиента по событию EClientToEdit
  clientToEdit = (id) => {
        this.setState( {
          usedRegime:1, 
          editingClient:this.state.clients.find(elem => elem.id==id)
        } );      
  }
  
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
      newAddingClient.id=Number(this.idTextRef.value);
      newAddingClient.fam=this.famTextRef.value;
      newAddingClient.im=this.imTextRef.value;
      newAddingClient.otch=this.otchTextRef.value;
      newAddingClient.balance=Number(this.balanceTextRef.value);

      if (newAddingClient.balance>0){
        newAddingClient.status='active';
      }
      else newAddingClient.status='blocked';

      let newClients=[...this.state.clients];
      newClients.push(newAddingClient);
      this.setState({clients:newClients, usedRegime:0});
  }

  //описание функции для сохранения изменений выбранного для редактирования клиента по кнопке "сохранить изменения"
  saveEditedClient = () => {
    let changed=false;
    let EditedClient={};
      EditedClient.id=Number(this.idTextRef.value);
      EditedClient.fam=this.famTextRef.value;
      EditedClient.im=this.imTextRef.value;
      EditedClient.otch=this.otchTextRef.value;
      EditedClient.balance=Number(this.balanceTextRef.value);
      if (EditedClient.balance>0){
        EditedClient.status='active';
      }
      else EditedClient.status='blocked';

      let newClients=[...this.state.clients];
      let edClient=newClients.find(elem => elem.id==EditedClient.id);

      //если ничего не поменяли в полях, то не нужно рендериться MobileClient
      if (EditedClient.fam!=edClient.fam || EditedClient.im!=edClient.im || EditedClient.otch!=edClient.otch
        || EditedClient.balance!=edClient.balance || EditedClient.status!=edClient.status) {
          let edIndex=newClients.findIndex(elem => elem.id==EditedClient.id);
          newClients.splice(edIndex,1,EditedClient);
          changed=true;
        }
      
      if ( changed ) {
        this.setState({clients:newClients});
      }
      this.setState({usedRegime:0});  
  }

  //описание функции для отмены действий по кнопке "Отмена"
  cancelAction = () => {
    this.setState( {usedRegime:0} );
  }
  
  render() {

    console.log("MobileCompany render");

    var clientsCode=this.state.clients.map( client => {
        return <MobileClient key={client.id} info={client}/>;
      }
    );

    return (
      <div className='MobileCompany'>
        <input type="button" value="Velcom" onClick={this.setName2} />
        <input type="button" value="MTS" onClick={this.setName1} />
        <div className='MobileCompanyName'>Компания: {this.state.name}</div>
        
        <div>
          <button className='MobileCompanyFilter_btn' value='all' 
          onClick={this.showAllClients}
          >Все</button>
          <button className='MobileCompanyFilter_btn' value='active' 
          onClick={this.showActiveClients}
          >Активные</button>
          <button className='MobileCompanyFilter_btn' value='blocked' 
          onClick={this.showBlockedClients}
          >Заблокированные</button>
        </div>

        <table className='MobileCompanyClientsList'>
          <thead className='HeaderContent'>
            <tr className='TableHeader'>
              <th className='HeaderCell'>Фамилия</th>
              <th className='HeaderCell'>Имя</th>
              <th className='HeaderCell'>Отчество</th>
              <th className='HeaderCell'>Баланс</th>
              <th className='HeaderCell'>Статус</th>
              <th className='HeaderCell'>Редактировать</th>
              <th className='HeaderCell'>Удалить</th>
            </tr>        
          </thead> 
            <tbody className='ClientsListContent'>{clientsCode}</tbody>
        </table>
        {
          (this.state.usedRegime==0) 
          ?
          <button className='MobileCompanyNewClient_btn' value='add' onClick={this.showAddClientCard}>
            Добавить клиента
          </button>
          :
          <div className="AddOrEditClient_card">
            <h3>
                { (this.state.usedRegime==1)
                  ? 'Редактировать выбранного клиента'
                  : 'Добавить нового клиента'
                }
              </h3>
            <div>
              <span className='AddOrEditClient_title'>ID клиента: </span>
              <input type='text' name='clientId' className='AddOrEditClient_input'
                    ref={this.setIdTextRef}
                    defaultValue={(this.state.usedRegime==1)?this.state.editingClient.id:''}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Фамилия: </span>
              <input type='text' name='clientFam' className='AddOrEditClient_input'
                    ref={this.setFamTextRef}
                    defaultValue={(this.state.usedRegime==1)?this.state.editingClient.fam:''}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Имя: </span>
              <input type='text' name='clientIm' className='AddOrEditClient_input'
                    ref={this.setImTextRef}
                    defaultValue={(this.state.usedRegime==1)?this.state.editingClient.im:''}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Отчество: </span>
              <input type='text' name='clientOtch' className='AddOrEditClient_input'
                    ref={this.setOtchTextRef}
                    defaultValue={(this.state.usedRegime==1)?this.state.editingClient.otch:''}
              />
            </div>
            <div>
              <span className='AddOrEditClient_title'>Баланс: </span>
              <input type='text' name='clientBalance' className='AddOrEditClient_input'
                    ref={this.setBalanceTextRef}
                    defaultValue={(this.state.usedRegime==1)?this.state.editingClient.balance:''}
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
        }
      </div>

    )
    ;

  }

}

export default MobileCompany;
