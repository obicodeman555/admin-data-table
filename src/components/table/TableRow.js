import React, { useState } from 'react';
import ShowMoreDetailsToggler from '../show-more-details-toggler/ShowMoreDetailsToggler';
import UserActivityDetails from '../user-activity-details/UserActivityDetails';
import { Icon } from '@iconify/react';
import { dateFormat } from '../../utils/dateFormat';
import threeDotsIcon from '../../assets/svg/vertical-three-dots.svg';

const TableRow = ({ user }) => {
  const [hasDetails, setHasDetails] = useState(false);
  const [activeId, setActiveId] = useState();

  const handleClick = (id) => {
    setActiveId(id);
    setHasDetails((has) => !has);
  };
  return (
    <main>
      <article
        className={`${
          hasDetails && activeId === user.id
            ? 'table__row greyish-background'
            : 'table__row'
        }`}
      >
        <div className="flex-1 hrztal-stack">
          <span className="hrztal-stack checkbox">
            <input type="checkbox" />
          </span>
          <ShowMoreDetailsToggler
            handleClick={handleClick}
            id={user.id}
            hasDetails={hasDetails}
            activeId={activeId}
          />
        </div>
        <div className="vertical-stack flex-3">
          <span>{`${user.firstName} ${user.lastName}`}</span>
          <span className="text-sm-grey fw-300">{user.email}</span>
        </div>
        <div className="vertical-stack flex-3">
          <span
            className={`pill-tag ${
              user.userStatus === 'active'
                ? 'active'
                : user.userStatus === 'inactive' && 'in-active'
            }`}
          >
            <Icon icon="ci:dot-04-l" />
            <span className="text-xs text-capitalize">{user.userStatus}</span>
          </span>
          <span>
            <span className="text-xs-grey">Last login:</span>
            <span className="text-sm-grey"> {dateFormat(user.lastLogin)}</span>
          </span>
        </div>
        <div className="vertical-stack flex-2">
          <span
            className={`pill-tag ${
              user.paymentStatus === 'paid'
                ? 'paid'
                : user.paymentStatus === 'unpaid'
                ? 'unpaid'
                : user.paymentStatus === 'overdue' && 'overdue'
            }`}
          >
            <Icon icon="ci:dot-04-l" />
            <span className="text-xs text-capitalize">
              {user.paymentStatus}
            </span>
          </span>
          <span className="text-sm">
            {user?.paymentStatus === 'paid'
              ? `Paid on ${dateFormat(user.paidOn)}`
              : user?.paymentStatus === 'unpaid'
              ? `Dues on ${dateFormat(user.paidOn)}`
              : user?.paymentStatus === 'overdue' &&
                `Dued on ${dateFormat(user.paidOn)}`}
          </span>
        </div>
        <div className="vertical-stack flex-1">
          <span>${(user.amountInCents / 100).toFixed(2)}</span>
          <span className="text-sm-grey spacing-left-md fw-300">USD</span>
        </div>
        <div className="flex-1 hrztal-stack place-at-end">
          <span className="text-xs-grey spacing-right-md">View More</span>
          <span className="">
            <img src={threeDotsIcon} alt="three vertical dots icon" />
          </span>
        </div>
      </article>
      <article>
        {activeId === user.id && hasDetails && (
          <UserActivityDetails user={user} />
        )}
      </article>
    </main>
  );
};

export default TableRow;
