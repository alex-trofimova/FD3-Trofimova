import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';
let clientsArr=require('./json/clientsList.json');

let companyName='Velcom';

test('работа MobileCompany AllBtn', () => {

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
  const buttonElem = component.root.find(  el => el.props.className == 'MobileCompanyFilter_btn AllBtn' );
  // и "нажмём" на неё
  buttonElem.props.onClick();

  // проверка утверждений
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // "нажмём" кнопку ещё раз
  buttonElem.props.onClick();
  
  // проверка утверждений
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
