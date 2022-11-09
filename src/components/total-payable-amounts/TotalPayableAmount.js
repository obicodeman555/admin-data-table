const TotalPayableAmount = ({ total }) => {
  return (
    <div className="total-payable">
      <span className="total-payable__text">Total payable amount: </span>
      <span className="total-payable__amount">
        <strong>${total ?? 0}</strong>
        &nbsp; USD
      </span>
    </div>
  );
};

export default TotalPayableAmount;
