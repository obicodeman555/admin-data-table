import { useEffect, useState } from "react";

import "./admin-data-table.scss"


function AdminDataTable() {

  const url = "https://cornie-assessment.herokuapp.com/users/1aA407I1mWUc6Eg";
  const [users, setUsers] = useState(null);
  const [paymentStatusIndex, setPaymentStatusIndex] = useState(0)
  useEffect(() => {
    async function getUsers() {
      const resp = await fetch(url);
      const data = await resp.json();
      setUsers(data);
    }

    getUsers();
  }, []);

  //change payment status on user click

  const changePaymentStatus = (selectedIndex) => {
    setPaymentStatusIndex(selectedIndex)
  }

  if (users) {

    //get all status in fetched data
    const paymentStatusGroup = users?.data?.map(user => user.paymentStatus);

    //getting unique values
    const uniquePaymentStatus = ["all", ...new Set(paymentStatusGroup)]

    //getting total payable amounts in dollars
    const payableAmountsInDollars = users?.data.filter(user => user.paymentStatus !== "paid").map(payableAmount => payableAmount.amountInCents / 100)

    //converting payable amounts  to dollar by summing all cents and dividing by 100

    const totalPayableAmounts = payableAmountsInDollars.reduce((previousValue, currentValue) =>
      (previousValue + currentValue)
      , 0).toFixed(2)

    console.log(totalPayableAmounts)
    return (
      <div className="admin-data-table">
        <header className="data-table-header">
          <ul className="tabs">
            {
              uniquePaymentStatus.map((pstatus, i) => (
                <li key={pstatus}>
                  <button type="button" className={i === paymentStatusIndex ? "tab-button selected" : "tab-button"} onClick={() => changePaymentStatus(i)}>
                    {pstatus}
                  </button>
                </li>
              ))
            }
          </ul>
          <div className="total-payable">
            <span className="total-payable__text">Total payable amount: </span>
            <span className="total-payable__amount">
              <strong>${totalPayableAmounts}</strong>
              &nbsp; USD</span>
          </div>
        </header>
      </div>
    )
  }

  return (
    <div>nothing found</div>
  )
}

export default AdminDataTable;
