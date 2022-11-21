import React from 'react';
import "./primary-button.scss"

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
