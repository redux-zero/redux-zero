import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';

import { lifecycle } from 'recompose';

describe('Page container unit', () => {
  let chance = new Chance();

  beforeEach(() => {
    jest.resetModules();
  });

  it('Connect should map props correctly', () => {
    const currentUserStub = { name: '' };
    const userNameStub = ' ';
    const propsStub = { currentUser: currentUserStub, userName: userNameStub };
    const PageContent = () => (<div />);

    const connectMock = jest.fn((props) => (args) => args);
    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./pageContent', () => PageContent);

    const Page = require('./page').default;
    expect(connectMock.mock.calls[0][0](propsStub)).toMatchSnapshot();
  });

  it('Should Render component without currentUser', () => {
    const currentUserStub = { };
    const userNameStub = chance.name();

    const historyPushMock = jest.fn();
    const historyStub = { push: historyPushMock };
    const connectMock = jest.fn((props) => (args) => args);

    const PageContent = () => (<div />);

    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./pageContent', () => PageContent);

    const Page = require('./page').default;
    const wrapper = shallow(<Page
      history={historyStub}
      currentUser={currentUserStub}
      userName={userNameStub}
    />);

    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({ currentUser: currentUserStub });

    expect(historyPushMock).not.toBeCalled();
    expect(connectMock).toBeCalledWith(expect.any(Function), expect.any(Function));
  });

  it('Should Render component with currentUser', () => {
    const currentUserStub = { name: chance.name() };
    const userNameStub = chance.name();

    const historyPushMock = jest.fn();
    const historyStub = { push: historyPushMock };
    const connectMock = jest.fn((props) => (args) => args);

    const PageContent = () => (<div />);

    jest.doMock('redux-zero/react', () => ({ connect: connectMock }));
    jest.doMock('./pageContent', () => PageContent);

    const Page = require('./page').default;
    const wrapper = shallow(<Page
      history={historyStub}
      currentUser={currentUserStub}
      userName={userNameStub}
    />);


    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({
      history: historyStub,
      currentUser: currentUserStub
    });

    expect(historyPushMock).toBeCalledWith('/chat');
    expect(connectMock).toBeCalledWith(expect.any(Function), expect.any(Function));
  });
});
