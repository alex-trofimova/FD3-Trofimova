import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';
let clientsArr=require('./json/clientsList.json');
let client=clientsArr[1];

test('работа MobileClient DeleteBtn', () => {

// рендер компонента
const component = renderer.create(
  <MobileClient 
  key={client.id} info={client}
  />
);

// проверка утверждений
let componentTree=component.toJSON();
expect(componentTree).toMatchSnapshot();

// найдём в вёрстке компонента саму кнопку
const buttonElem = component.root.find(  el => el.props.className == 'ClientBtn DeleteBtn' );
// и "нажмём" на неё
buttonElem.props.onClick();

// удаление (отмонтирование) компонента
component.unmount();

// проверка утверждений
componentTree=component.toJSON();
expect(componentTree).toMatchSnapshot();

    
});
