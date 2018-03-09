import React from 'react';
import { shallow } from 'enzyme';
import Chance from 'chance';

import CreateUser from './pageContent';

describe('CreateUserPage unit', () => {
  let chance = new Chance();

  it('Should render with success', () => {
    const wrapperWithUserName = shallow(<CreateUser
      userName="User Test"
      setUsername={() => {}}
      createUser={() => {}}
    />);

    const wrapperWithoutUserName = shallow(<CreateUser
      setUsername={() => {}}
      createUser={() => {}}
    />);

    expect(wrapperWithUserName).toMatchSnapshot();
    expect(wrapperWithoutUserName).toMatchSnapshot();
  });

  it('Should call onChange correctly', () => {
    const setUsernameMock = jest.fn();

    const nameStub = chance.name();
    const event = { target: { name: 'change', value: nameStub } };

    const wrapper = shallow(<CreateUser
      setUsername={setUsernameMock}
    />);

    wrapper.find('input').simulate('change', event);
    expect(setUsernameMock).toBeCalledWith(nameStub);
  })

  it('Should call onSubmit correctly', () => {
    const createUserMock = jest.fn();
    const preventDefaultMock = jest.fn();

    const event = { target: { name: 'submit' }, preventDefault: preventDefaultMock };

    const wrapper = shallow(<CreateUser createUser={createUserMock}/>);

    wrapper.find('form').simulate('submit', event);

    expect(preventDefaultMock).toBeCalled();
    expect(createUserMock).toBeCalled();
  });

  it('Should render submitButton in disabled state when username is empty', () => {
    const wrapper = shallow(<CreateUser userName="" />);
    expect(wrapper.find("button[type='submit']").prop('disabled')).toBeTruthy();
  });

  it('Should render submitButton in enabled state when username is not empty', () => {
    const wrapper = shallow(<CreateUser userName={chance.name()} />);
    expect(wrapper.find("button[type='submit']").prop('disabled')).toBeFalsy();
  });
});
