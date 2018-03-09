import React from 'react';

import MessageListItem from './messageListItem';

const renderItems = (messages) =>
  messages.map((it, i) => <MessageListItem {...it} key={`message_item_${i}`} />);

const MessageList = ({ className, messages = [] }) => {
  return (
    <div className={`${className} ba pa3 overflow-y-auto`}>
      { renderItems(messages) }
    </div>
  );
};

export default MessageList;
