import React, { useEffect, useState } from 'react';
import { paymentStatus } from '../utils/paymentStatus';
import './admin-data-table.scss';
import Tabs from '../components/tabs/Tabs';
import TotalPayableAmount from "../components/total-payable-amounts/TotalPayableAmount";
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import FilterButton from '../components/filter-button/FilterButton';
import Search from '../components/search/Search';
import PrimaryButton from '../components/primary-button/PrimaryButton';
function AdminDataTable() {

  const url = 'https://cornie-assessment.herokuapp.com/users/1aA407I1mWUc6Eg';


  const tabs = Object.keys(paymentStatus);
  const [users, setUsers] = useState([]);

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
            <FilterButton />
            <Search />
          </div>
          <div className="action-group__right">
            <PrimaryButton buttonText="pay dues" buttonType="button" />
          </div>
        </div>
        <div className='table-container'>
          <TableHeader />
          <TableBody users={users} />
        </div>
      </section>
    </div>
  );
}

export default AdminDataTable;

