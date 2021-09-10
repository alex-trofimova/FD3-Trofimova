import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import AddOrEditClient from './AddOrEditClient';

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
      id: 0, 
      fam: '', im: '', otch:'',
      balance: 0, status: '',
    },

    //хэш для редактирования выбранного клиента, изначально пустой
    editingClient:{},

  };

  //прием событий из потока событий mobileCompanyEvents
  componentDidMount = () => {
    mobileCompanyEvents.addListener('EClientToDelete',this.clientToRemove);
    mobileCompanyEvents.addListener('EClientToEdit',this.clientToEdit);
    mobileCompanyEvents.addListener('EClientToAdd',this.clientToAdd);
    mobileCompanyEvents.addListener('EClientToCancel',this.cancel);
    mobileCompanyEvents.addListener('EClientToSaveChanges',this.clientToSaveChanges);
    
  };

  //"отписка" от них
  componentWillUnmount = () => {
    mobileCompanyEvents.removeListener('EClientToDelete',this.clientToRemove);
    mobileCompanyEvents.removeListener('EClientToEdit',this.clientToEdit);
    mobileCompanyEvents.removeListener('EClientToAdd',this.clientToAdd);
    mobileCompanyEvents.removeListener('EClientToCancel',this.cancel);
    mobileCompanyEvents.removeListener('EClientToSaveChanges',this.clientToSaveChanges);
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
    //предварительно составляю массив из "использованных" id
    let usedId=[];
    let newClients=[...this.state.clients];
    newClients.forEach( (elem, index) => 
      usedId[index]=elem.id
    );
    //переменная с id добавляемого клиента
    let newClientId;
    do {
      //функция выбора случайного числа из некоторого диапазон [n,m]
      let getId=(m,n)=>Math.floor(Math.random()*(m-n+1))+n;

      newClientId=getId(100,130);//здесь указываю в каком диапазоне (для проверки делала узким)
    }
    while ( usedId.indexOf(newClientId)!=-1 );

    let newAddingClient={...this.state.addingClient};
    newAddingClient.id=newClientId;
    this.setState( {usedRegime:2, addingClient:newAddingClient} );
  }

  //описание функции для удаления клиента по событию EClientToDelete
  clientToRemove = (id) => {
    this.setState( {clients:this.state.clients.filter(elem => elem.id!=id)} );       
  }

   //описание функции для редактирования клиента по событию EClientToEdit
  clientToEdit = (info) => {
    this.setState( {editingClient:info, usedRegime:1} );      
  };

  //описание функции для добавления в список нового клиента по событию EClientToAdd
  clientToAdd = (hash) => {
    let newClients=[...this.state.clients];
    newClients.push(hash);
    this.setState({clients:newClients, usedRegime:0});
        
  };
  
  //описание функции для отмены действий по событию EClientToCancel
  cancel = () => {
    this.setState( {usedRegime:0} );
  };

  //описание функции для сохранения изменений редактируемого клиента по событию EClientToSaveChanges
  clientToSaveChanges = (hash) => {
    let newClients=[...this.state.clients];
    let edIndex=newClients.findIndex(elem => elem.id==hash.id);
    newClients.splice(edIndex,1,hash);
    this.setState({clients:newClients, usedRegime:0});
  };
  
  
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
          <AddOrEditClient 
            editingOrNewClient={(this.state.usedRegime==1)?this.state.editingClient:this.state.addingClient}
            usedRegime={this.state.usedRegime}
          />
        }
      </div>

    )
    ;

  }

}

export default MobileCompany;
