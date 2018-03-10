import React from 'react';

import MessageForm from './messageForm';
import MessageList from './messageList';

export default ({ messages = [], createMessage, setMessageContent, messageContent }) => (
  <div className="vh-100">
    <MessageList messages={messages} className="w-100 h-75"/>
    <MessageForm
      createMessage={createMessage}
      setMessageContent={setMessageContent}
      messageContent={messageContent}
      className="w-100 h-25"
    />
  </div>
)
