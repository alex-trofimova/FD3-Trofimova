import React from 'react';
import renderer from 'react-test-renderer';

import Catalog from '../components/Catalog/Catalog';

let InitProducts=require('./json/initialListOfProducts.json');
let AvtoAkum=require('./json/AvtoAkum.json');
let TruckAkum=require('./json/TruckAkum.json');
let MotoAkum=require('./json/MotoAkum.json');

let InitCatalog = {
  "loadingStatus": 3,
  "initialProductsList": InitProducts,
  "products": InitProducts,
}

let AvtoCatalog = {
  "loadingStatus": 3,
  "initialProductsList": InitProducts,
  "products": AvtoAkum,
}



test('работа фильтров компонента Catalog', () => {

  // рендер компонента
  const component = renderer.create(
    <Catalog catalog= {InitCatalog}
    />
  );

  // проверка утверждений
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // нахожу в верстке компонента саму кнопку
  const buttonElem = component.root.find(  el => el.props.className == 'Catalog_filter_type_item avto' );
  // и "нажимаю" на нее
  buttonElem.props.onClick();

  // обновление с некоторыми отличающимися пропсами
  component.update(
    <Catalog catalog= {AvtoCatalog}
    />
  );

  // проверка утверждений
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
