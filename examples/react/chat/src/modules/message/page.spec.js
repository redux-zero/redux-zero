import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';

import { identity } from 'lodash';

describe('Page container unit', () => {
  let chance = new Chance();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should redirect user if has no current user', () => {
    const pushMock = jest.fn();
    const historyStub = { push: pushMock };
    const connectMock = jest.fn(props => identity);

    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./components/message', () => () => <div />);

    const Page = require('./page').default;
    const wrapper = shallow(<Page history={historyStub} />);

    expect(pushMock).toBeCalledWith('/');
  });

  it('Should not redirect user if has current user and setInterval for prop fetchMessages', () => {
    const currentUserStub = { username: chance.name() };
    const fetchMessagesMock = jest.fn();
    const pushMock = jest.fn();
    const historyStub = { push: pushMock };
    const connectMock = jest.fn(props => identity);

    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./components/message', () => () => <div />);

    const Page = require('./page').default;
    const wrapper = shallow(<Page
      currentUser={currentUserStub}
      history={historyStub}
      fetchMessages={fetchMessagesMock}
    />);

    jest.runTimersToTime(2001);
    expect(pushMock).not.toBeCalled();
    expect(fetchMessagesMock).toBeCalled();
  });

  it.skip('Should invoke connect with correct params', () => {
    const connectMock = jest.fn(props => identity);

    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./components/message', () => () => <div />);

    const Page = require('./page').default;
    const wrapper = shallow(<Page {...mapStateToPropsStub} />);

    expect(connectMock).toBeCalledWith(expect.any(Function), expect.any(Function));
  });
});
