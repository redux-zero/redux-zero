import React from 'react';
import { shallow } from 'enzyme';

import Routes from './routes';

describe('Test route wrapper unit', () => {
  it('Should match with snapshot', () => {
    const wrapper = shallow(<Routes />);

    expect(wrapper).toMatchSnapshot();
  });
});
