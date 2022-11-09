import React from 'react';
import threeDotsIcon from '../../assets/svg/vertical-three-dots.svg';

const TableHeader = () => {
  return (
    <div className="table-header">
      <header className="table-header__row table__row">
        <div className="flex-1 checkbox">
          <input type="checkbox" />
        </div>
        <div className="flex-3">name</div>
        <div className="flex-3">user status</div>
        <div className="flex-2">payment status</div>
        <div className="flex-1">amount</div>
        <div className="table-head__icon flex-1">
          <img src={threeDotsIcon} alt="three vertical dots icon" />
        </div>
      </header>
    </div>
  );
};

export default TableHeader;
