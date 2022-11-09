import React, { useEffect, useState } from 'react';
import { paymentStatus } from '../utils/paymentStatus';
import funnelIcon from '../assets/svg/funnel.svg';
import searchIcon from '../assets/svg/search.svg';
import threeDotsIcon from "../assets/svg/vertical-three-dots.svg";
import { Icon } from '@iconify/react';
import { dateFormat } from '../utils/dateFormat';
import './admin-data-table.scss';
import Tabs from '../components/tabs/Tabs';
import TotalPayableAmount from "../components/total-payable-amounts/TotalPayableAmount"
function AdminDataTable() {

  const url = 'https://cornie-assessment.herokuapp.com/users/1aA407I1mWUc6Eg';


  const tabs = Object.keys(paymentStatus);
  const [users, setUsers] = useState([]);
  const [hasDetails, setHasDetails] = useState(false)
  // const [statusGroup, setStatusGroup] = useState("");
  //data fetching
  useEffect(() => {
    async function getUsers() {
      const resp = await fetch(url);
      const result = await resp.json();
      setUsers(result.data);
    }

    getUsers();
  }, []);


  const payableAmountsInDollars = users?.filter((user) => user.paymentStatus !== 'paid')
    .map((payableAmount) => payableAmount.amountInCents / 100);

  const totalPayableAmounts = payableAmountsInDollars
    ?.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);





  return (
    <div className="admin-data-table">
      <header className="data-table-header">
        <Tabs group={tabs} />
        <TotalPayableAmount total={totalPayableAmounts} />
      </header>
      <section className="data-table__content">
        <div className="data-table__header">
          <div className="action-group__left">
            <div className="action-group__item data-table__filter">
              <button>
                <span className="item__icon item__icon--funnel">
                  <img src={funnelIcon} alt="funnel icon" />
                </span>
                <span>Filter</span>
              </button>
            </div>
            <div className="action-group__item data-table__search">
              <span className="item__icon item__icon--search">
                <img src={searchIcon} alt="search icon" />
              </span>
              <input
                type="text"
                placeholder="Search Users by Name, Email or Date"
              />
            </div>
          </div>
          <div className="action-group__right">
            <button type="submit" className="button-pay">
              pay dues
            </button>
          </div>
        </div>
        <div className='table-container'>
          <div className='table-header'>
            <header className='table-header__row table__row'>
              <div className='flex-1 checkbox'>
                <input type="checkbox" />
              </div>
              <div className='flex-3'>name</div>
              <div className='flex-3'>user status</div>
              <div className='flex-2'>payment status</div>
              <div className='flex-1'>amount</div>
              <div className='table-head__icon flex-1'>
                <img src={threeDotsIcon} alt="three vertical dots icon" />
              </div>
            </header>
          </div>
          <div className='table-body'>

            {
              users?.length === 0 ? (<div className='loading'>
                <span className="loader"></span>
                <span>Processing...</span>
              </div>) :
                users?.map((user) => {

                  return (
                    <React.Fragment>
                      <main className='table__row' key={user.id}>
                        <div className='flex-1 hrztal-stack'>
                          <span className='hrztal-stack checkbox'>
                            <input type="checkbox" />

                          </span>
                          <span className='hrztal-stack spacing-left-md-2' onClick={() => setHasDetails(has => !has)}>
                            <Icon icon="ph:caret-circle-down" style={{ color: "#8B83BA", fontSize: '20px' }} />
                          </span>
                        </div>
                        <div className='vertical-stack flex-3'>
                          <span>{`${user.firstName} ${user.lastName}`}</span>
                          <span className='text-sm-grey fw-300'>{user.email}</span>
                        </div>
                        <div className='vertical-stack flex-3'>
                          <span className={`pill-tag ${user.userStatus === "active" ? "active" : user.userStatus === "inactive" && "in-active"}`}>
                            <Icon icon="ci:dot-04-l" />
                            <span className='text-xs text-capitalize'>{user.userStatus}</span>
                          </span>
                          <span>
                            <span className='text-xs-grey'>Last login:</span>
                            <span className="text-sm-grey"> {dateFormat(user.lastLogin)}</span>
                          </span>
                        </div>
                        <div className='vertical-stack flex-2'>
                          <span className={`pill-tag ${user.paymentStatus === "paid" ? "paid" : user.paymentStatus === "unpaid" ? "unpaid" : user.paymentStatus === "overdue" && "overdue"}`}>
                            <Icon icon="ci:dot-04-l" />
                            <span className='text-xs text-capitalize'>{user.paymentStatus}</span>
                          </span>
                          <span className='text-sm'>
                            {user?.paymentStatus === "paid" ? `Paid on ${dateFormat(user.paidOn)}` : user?.paymentStatus === "unpaid" ? `Dues on ${dateFormat(user.paidOn)}` : user?.paymentStatus === "overdue" && `Dued on ${dateFormat(user.paidOn)}`}
                          </span>
                        </div>
                        <div className='vertical-stack flex-1'>
                          <span>
                            ${((user.amountInCents) / 100).toFixed(2)}
                          </span>
                          <span className="text-sm-grey spacing-left-md fw-300">
                            USD
                          </span>
                        </div>
                        <div className='flex-1 hrztal-stack place-at-end'>
                          <span className="text-xs-grey spacing-right-md">
                            View More
                          </span>
                          <span className=''>
                            <img src={threeDotsIcon} alt="three vertical dots icon" />
                          </span>
                        </div>
                      </main>
                      {
                        hasDetails && (<div className='table-row__details'>
                          <div className='table-activity__head'>
                            <div className='table-activity__row'>
                              <div className='flex-1'>date</div>
                              <div className='flex-2'>user activity</div>
                              <div className='flex-3 hrztal-stack'>
                                <span>details</span>
                                <Icon icon="charm:circle-warning" style={{ color: "#8B83BA", fontSize: '18px', marginLeft: "5px" }} />
                              </div>
                            </div>
                          </div>
                          <div className='table-activity__body'>
                            {
                              user.activities?.map((activity, i) => (
                                <div className='table-activity__row table-activity__row--background-grey'>
                                  <span className='flex-1 text-md-grey '>
                                    {dateFormat(activity.date)}
                                  </span>
                                  <span className='flex-2 text-sm fw-300'>{activity.userActivity}</span>
                                  <span className='flex-3 text-sm fw-300'>{activity.details}</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>)
                      }
                    </React.Fragment>
                  )
                })
            }


          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDataTable;

