import React from 'react';

import utils from '../../../utils';

const MessageListItem = ({ createdAt, content, userName }) => {
  return (
    <div className="w-100 bb pv1">
      <h2 className="di v-mid ma0">{ userName }</h2>
      <small className="di fr v-mid">{ utils.dateFormatter.format(createdAt) }</small>
      <p>{ content }</p>
    </div>
  );
};

export default MessageListItem;
