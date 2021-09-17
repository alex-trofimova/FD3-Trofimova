import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';
import AddOrEditClient from '../components/AddOrEditClient';
let clientsArr=require('./json/clientsList.json');
let emptyclient=require('./json/emptyclient.json');
let newclient=require('./json/newclient.json');
let renewclientsArr=require('./json/renewclientsList.json');

let companyName='Velcom';

function createNodeMock(el) {
  if (el.type === 'input') {
    return {};
  }
  return null;
}

test('работа MobileCompany AddNewClient', () => {

// рендер компонента MobileCompany
const component1 = renderer.create(
  <MobileCompany 
  name={companyName}
  clients={clientsArr}
  />
);

// проверка утверждений
let component1Tree=component1.toJSON();
expect(component1Tree).toMatchSnapshot();

// находим в верстке компонента MobileCompany кнопку Добавить клиента 
const buttonElem1 = component1.root.find(  el => el.props.className == 'MobileCompanyNewClient_btn AddNewClientBtn' );
// и "нажмём" на неё
buttonElem1.props.onClick();

const options = {createNodeMock};
// обновление: рендер компонента AddOrEditClient
const component2 = renderer.create(
  <AddOrEditClient 
  editingOrNewClient={emptyclient}
  usedRegime={2}
  />, options
);

// проверка утверждений
component1Tree=component1.toJSON();
expect(component1Tree).toMatchSnapshot();
let component2Tree=component2.toJSON();
expect(component2Tree).toMatchSnapshot();

// обновление компонента AddOrEditClient
component2.update(<AddOrEditClient 
  editingOrNewClient={newclient}
  usedRegime={2}
  />);

// проверка утверждений
component1Tree=component1.toJSON();
expect(component1Tree).toMatchSnapshot();
component2Tree=component2.toJSON();
expect(component2Tree).toMatchSnapshot();

// находим в верстке компонента AddOrEditClient кнопку Добавить 
const buttonElem2 = component2.root.find(  el => el.props.className == 'AddOrEditClient_btn AddClientBtn' );
// и "нажмём" на неё
buttonElem2.props.onClick();

// обновление компонента MobileCompany
component1.update(<MobileCompany name={companyName}
clients={renewclientsArr}/>);

// удаление (отмонтирование) компонента AddOrEditClient
component2.unmount();

// проверка утверждений
component1Tree=component1.toJSON();
expect(component1Tree).toMatchSnapshot();

    
});
