import React from 'react';
import { Icon } from '@iconify/react';

const ShowMoreDetailsToggler = ({ hasDetails, id, handleClick, activeId }) => {
  return (
    <div>
      <span
        className={`hrztal-stack spacing-left-md-2 ${
          hasDetails && activeId === id ? 'rotate' : 'remove-rotate'
        }`}
        onClick={() => handleClick(id)}
      >
        <Icon
          icon="ph:caret-circle-down"
          style={{ color: '#8B83BA', fontSize: '20px' }}
        />
      </span>
    </div>
  );
};

export default ShowMoreDetailsToggler;
