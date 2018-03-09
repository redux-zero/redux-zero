import React from 'react';
import { mount } from 'enzyme';
import Chance from 'chance';

import { lifecycle } from 'recompose';

describe('Page container unit', () => {
  let chance = new Chance();

  beforeEach(() => {
    jest.resetModules();
  });

  it.skip('Render without currentUser', () => {
    const currentUserStub = {};
    const connectMock = jest.fn((props) => (args) => {
      return class extends React.Component {
        render() {
          return new args();
        };
      };
    });

    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./pageContent', () => <div />);

    const Page = require('./page');
    const wrapper = mount(<Page />);

    expect(wrapper.find(lifecycle).componentDidMount).toBeCalled();
  });
});
