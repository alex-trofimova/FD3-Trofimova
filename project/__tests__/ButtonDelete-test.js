import React from 'react';
import renderer from 'react-test-renderer';

import ButtonDelete from '../components/small_components/ButtonDelete';

test('работа ButtonDelete', () => {

  const component = renderer.create(
    <ButtonDelete classColor='cross_white'/>
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
