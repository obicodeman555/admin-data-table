import React from 'react';

const PrimaryButton = ({ buttonText, buttonType }) => {
  return (
    <div className="primary-button">
      <button type={buttonType} className="button-pay">
        {buttonText}
      </button>
    </div>
  );
};

export default PrimaryButton;
