import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../components/Footer/Footer';

test('работа Footer', () => {

  const component = renderer.create(
    <Footer />
  );

  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
