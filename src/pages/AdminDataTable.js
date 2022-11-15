import React, { useEffect, useState } from 'react';
import { paymentStatus } from '../utils/paymentStatus';
import './admin-data-table.scss';
import Tabs from '../components/tabs/Tabs';
import TotalPayableAmount from '../components/total-payable-amounts/TotalPayableAmount';
import TableHeader from '../components/table/TableHeader';
import TableBody from '../components/table/TableBody';
import FilterButton from '../components/filter-button/FilterButton';
import Search from '../components/search/Search';
import PrimaryButton from '../components/primary-button/PrimaryButton';
function AdminDataTable() {
  const url = 'https://cornie-assessment.herokuapp.com/users/1aA407I1mWUc6Eg';

  const tabs = Object.values(paymentStatus);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");


  //data fetching
  useEffect(() => {
    async function getUsers() {
      const resp = await fetch(url);
      const result = await resp.json();

      setUsers(result.data);
    }

    getUsers();
  }, []);

  const handleActiveTab = (index) => {
    setActiveTab(index);


  };





  const filteredUsers =
    activeTab === 0
      ? users
      : users?.filter((user) => user.paymentStatus === paymentStatus[activeTab]);

  const payableAmountsInDollars = filteredUsers?.filter((user) => user.paymentStatus !== 'paid').map((payableAmount) => payableAmount.amountInCents / 100);

  const totalPayableAmounts = payableAmountsInDollars
    ?.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    .toFixed(2);

  const searchUsers = () => {
    const keys = users?.map(user => Object.keys(user)).flat();
    const uniqueKeys = [...new Set(keys)]
    return filteredUsers?.filter(user => uniqueKeys.some(key => `${user[key]}`.toLowerCase().includes(query)));
  }



  return (
    <div className="admin-data-table">
      <header className="data-table-header">
        <Tabs group={tabs} handleActiveTab={handleActiveTab}
          activeTab={activeTab} />
        <TotalPayableAmount total={totalPayableAmounts} />
      </header>
      <section className="data-table__content">
        <div className="data-table__header">
          <div className="action-group__left">
            <FilterButton />
            <Search searching={setQuery} />
          </div>
          <div className="action-group__right">
            <PrimaryButton buttonText="pay dues" buttonType="button" />
          </div>
        </div>
        <div className="table-container">
          <TableHeader />
          <TableBody users={query.length !== 0 ? searchUsers() : filteredUsers} />
        </div>
      </section>
    </div>
  );
}

export default AdminDataTable;
