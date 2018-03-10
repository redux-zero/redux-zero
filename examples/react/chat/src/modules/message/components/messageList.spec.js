import React from 'react';
import { shallow } from 'enzyme';

import MessageList from './messageList';

describe('Test MessageList component unit', () => {
  it('Should render component with correct structure', () => {
    const messagesStub1 = [];
    const wrapper1 = shallow(<MessageList className="Teste 1" messages={messagesStub1} />);

    expect(wrapper1).toMatchSnapshot();

    const messagesStub2 = [{}];
    const wrapper2 = shallow(<MessageList className="Teste 2" messages={messagesStub2} />);

    expect(wrapper2).toMatchSnapshot();

    const messagesStub3 = [{}, {}, {}];
    const wrapper3 = shallow(<MessageList className="Teste 3" messages={messagesStub3} />);

    expect(wrapper3).toMatchSnapshot();
  })

  it('Should render component with correct with correct structure, even when messages undefined', () => {
    const wrapper = shallow(<MessageList />);

    expect(wrapper).toMatchSnapshot();
  });
});
