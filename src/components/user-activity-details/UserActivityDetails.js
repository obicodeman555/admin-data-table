import React from 'react';
import { Icon } from '@iconify/react';
import { dateFormat } from '../../utils/dateFormat';

const UserActivityDetails = ({ user }) => {
  return (
    <div className="table-row__details">
      <div className="table-activity__head">
        <div className="table-activity__row">
          <div className="flex-1">date</div>
          <div className="flex-2">user activity</div>
          <div className="flex-3 hrztal-stack">
            <span>details</span>
            <Icon
              icon="charm:circle-warning"
              style={{ color: '#8B83BA', fontSize: '18px', marginLeft: '5px' }}
            />
          </div>
        </div>
      </div>
      <div className="table-activity__body">
        {user?.activities?.map((activity, i) => (
          <div
            className="table-activity__row table-activity__row--background-grey"
            key={i}
          >
            <span className="flex-1 text-md-grey ">
              {dateFormat(activity.date)}
            </span>
            <span className="flex-2 text-sm fw-300">
              {activity.userActivity}
            </span>
            <span className="flex-3 text-sm fw-300">{activity.details}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserActivityDetails;
