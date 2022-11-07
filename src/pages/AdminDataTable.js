import { useEffect, useState } from 'react';
import { paymentStatus } from '../utils/paymentStatus';
import funnelIcon from '../assets/svg/funnel.svg';
import searchIcon from '../assets/svg/search.svg';
import './admin-data-table.scss';

function AdminDataTable() {
  const url = 'https://cornie-assessment.herokuapp.com/users/1aA407I1mWUc6Eg';
  const [users, setUsers] = useState(null);
  const [paymentStatusIndex, setPaymentStatusIndex] = useState(0);
  //data fetching
  useEffect(() => {
    async function getUsers() {
      const resp = await fetch(url);
      const data = await resp.json();
      setUsers(data);
    }

    getUsers();
  }, []);

  const changePaymentStatus = (selectedIndex) => {
    setPaymentStatusIndex(selectedIndex);
  };

  const tabs = Object.keys(paymentStatus).map((key) => paymentStatus[key]);

  const payableAmountsInDollars = users?.data
    ?.filter((user) => user.paymentStatus !== 'paid')
    .map((payableAmount) => payableAmount.amountInCents / 100);

  const totalPayableAmounts = payableAmountsInDollars
    ?.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  return (
    <div className="admin-data-table">
      <header className="data-table-header">
        <ul className="tabs">
          {tabs.map((pstatus, i) => (
            <li key={pstatus}>
              <button
                type="button"
                className={
                  i === paymentStatusIndex
                    ? 'tab-button selected'
                    : 'tab-button'
                }
                onClick={() => changePaymentStatus(i)}
              >
                {pstatus}
              </button>
            </li>
          ))}
        </ul>
        <div className="total-payable">
          <span className="total-payable__text">Total payable amount: </span>
          <span className="total-payable__amount">
            <strong>${totalPayableAmounts ?? 0}</strong>
            &nbsp; USD
          </span>
        </div>
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
      </section>
    </div>
  );
}

export default AdminDataTable;
