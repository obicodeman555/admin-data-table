import './table-body.scss';
import TableRow from './TableRow';

const TableBody = ({ users }) => {


  return (
    <div className="table-body">
      {users?.length === 0 ? (
        <div className="loading">
          <span className="loader"></span>
          <span>Processing...</span>
        </div>
      ) : (
        users?.map((user) => <TableRow key={user.id} user={user} />)
      )}
    </div>
  );
};

export default TableBody;
