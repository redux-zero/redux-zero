import React from 'react';

import { isEmpty } from 'lodash';

const onSubmitForm = (action, event) => {
  event.preventDefault();
  action();
}

const MessageForm = ({ className, clearMessageContent, messageContent, setMessageContent, createMessage }) => {
  return (
    <div className={className}>
      <form className="h-100" onSubmit={onSubmitForm.bind(this, createMessage)}>
        <textarea
          value={messageContent}
          onChange={event => setMessageContent(event.target.value)}
          className="w-80 h-100 v-top pa3"
        />
        <button disabled={isEmpty(messageContent)} className="w-20 h-100 v-top">Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
