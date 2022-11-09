import React, { useState } from 'react';

const Tabs = ({ group, handleActiveTab }) => {
  const [paymentStatusIndex, setPaymentStatusIndex] = useState(0);


  const handleClick = (index) => {
    setPaymentStatusIndex(index);
    handleActiveTab(index);
  };


  return (
    <ul className="tabs">
      {group.map((tab, i) => (
        <li key={tab}>
          <button
            type="button"
            className={
              i === paymentStatusIndex ? 'tab-button selected' : 'tab-button'
            }
            name={tab}
            onClick={() => handleClick(i)}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
