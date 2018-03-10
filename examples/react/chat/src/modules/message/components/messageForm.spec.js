import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';

import MessageForm from './messageForm';

describe('Test MessageForm component unit', () => {
  const chance = new Chance();

  it('Should render send button disabled when messageContent is empty', () => {
    const wrapper = shallow(<MessageForm messageContent="" />);

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  it('Should render send button disabled when messageContent is not empty', () => {
    const messageStub = chance.string();
    const wrapper = shallow(<MessageForm messageContent={messageStub} />);

    expect(wrapper.find('button').prop('disabled')).toBeFalsy();
  });

  it('Should invoke setMessageContent function when onChange is trigged', () => {
    const eventStub = Object.freeze({ target: { value: chance.string() } });
    const setMessageContentMock = jest.fn();
    const wrapper = shallow(<MessageForm setMessageContent={setMessageContentMock} />);

    wrapper.find('textarea').simulate('change', eventStub);
    expect(setMessageContentMock).toBeCalledWith(eventStub.target.value);
  });

  it('Should invoke createMessage function when form is submitted', () => {
    const eventPreventDefaultMock = jest.fn();
    const createMessageMock = jest.fn();
    const eventStub = Object.freeze({ preventDefault: eventPreventDefaultMock });
    const wrapper = shallow(<MessageForm createMessage={createMessageMock} />);

    wrapper.find('form').simulate('submit', eventStub);
    expect(eventPreventDefaultMock).toBeCalled();
    expect(createMessageMock).toBeCalled();
  });

  it('Should render component with correct structure', () => {
    const wrapper = shallow(
      <MessageForm
        className="Teste"
        messageContent="Msg"
        clearMessageContent={jest.fn()}
        setMessageContent={jest.fn()}
        createMessage={jest.fn()}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
