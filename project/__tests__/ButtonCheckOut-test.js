import React from 'react';
import renderer from 'react-test-renderer';

import ButtonCheckOut from '../components/small_components/ButtonCheckOut';

test('работа ButtonCheckOut', () => {

  const component = renderer.create(
    <ButtonCheckOut message='покупка'/>
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  //нажатие на кнопку
  const buttonElem = component.root.find(  el => el.props.className == 'Btn_check_out' );
  buttonElem.props.onClick();

  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
