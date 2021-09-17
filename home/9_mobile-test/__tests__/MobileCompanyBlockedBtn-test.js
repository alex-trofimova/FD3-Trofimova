import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';
let clientsArr=require('./json/clientsList.json');
let clientsArrBlocked=require('./json/clientsListBlocked.json');

let companyName='Velcom';

test('работа MobileCompany BlockedBtn', () => {

// рендер компонента
const component = renderer.create(
  <MobileCompany 
  name={companyName}
  clients={clientsArr}
  />
);

// проверка утверждений
let componentTree=component.toJSON();
expect(componentTree).toMatchSnapshot();

// найдём в вёрстке компонента саму кнопку
const buttonElem = component.root.find(  el => el.props.className == 'MobileCompanyFilter_btn BlockedBtn' );
// и "нажмём" на неё
buttonElem.props.onClick();

// обновление с некоторыми отличающимися пропсами
component.update(<MobileCompany name={companyName}
clients={clientsArrBlocked}/>);

// проверка утверждений
componentTree=component.toJSON();
expect(componentTree).toMatchSnapshot();

    
});
