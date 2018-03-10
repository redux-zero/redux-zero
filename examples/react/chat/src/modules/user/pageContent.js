import React from 'react';

import { isEmpty } from 'lodash';

function setUsernameInputValue(setUsername, event) {
  setUsername(event.target.value);
}

function submitForm(createUser, event) {
  event.preventDefault();
  createUser();
}

const CreateUser = ({ createUser, setUsername, userName = '' }) => (
  <div className="w-60 center">
    <h1 className="tc">Type your username</h1>
    <form onSubmit={submitForm.bind(this, createUser)}>
      <input type="text"
        onChange={setUsernameInputValue.bind(this, setUsername)}
        value={userName}
        className="w-100 pa2"
      />
      <button type="submit" disabled={isEmpty(userName)} className="w-100 pa3 mt3">Sign In</button>
    </form>
  </div>
);

export default CreateUser;
