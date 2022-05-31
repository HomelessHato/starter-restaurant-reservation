import React from "react";
import { useHistory, Link } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import "./DataList.css";

const DataList = ({ reservations, date, tables }) => {
  const history = useHistory();
  //console.log(date)
  function todayClick() {
    history.push(`/dashboard?date=${today()}`);
  }

  function previousClick() {
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function nextClick() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <div>
      <div className="button-section">
        <button
          className="btn btn-secondary previous"
          onClick={previousClick}
        >
          Previous
        </button>
        <button className="btn btn-primary today" onClick={todayClick}>
          Today
        </button>
        <button className="btn btn-secondary next" onClick={nextClick}>
          Next
        </button>
      </div>
      <div className="row">
        <div className="table-section column">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">NAME</th>
                <th scope="col">PHONE</th>
                <th scope="col">DATE</th>
                <th scope="col">TIME</th>
                <th scope="col">PEOPLE</th>
                <th scope="col">STATUS</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((val, idx) => (
                <tr key={idx}>
                  <td>{val.reservation_id}</td>
                  <td>{`${val.last_name} ${val.first_name}`}</td>
                  <td>{val.mobile_number}</td>
                  <td>{val.reservation_date}</td>
                  <td>{val.reservation_time}</td>
                  <td>{val.people}</td>
                  <td>booked</td>
                  <td>
                    <Link className="btn btn-secondary" to={`/reservations/${val.reservation_id}/seat`}>Seat</Link>
                  </td>
                  <td>
                    <button className="btn btn-secondary">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="table-section column">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">TABLE NAME</th>
                  <th scope="col">CAPACITY</th>
                  <th scope="col">FREE?</th>
                  <th scope="col"></th>
                </tr>
              </thead>
                <tbody>
                  {tables.map((table) => (
                    <tr key={table.table_id}>
                      <td>{table.table_id}</td>
                      <td>{table.table_name}</td>
                      <td>{table.capacity}</td>
                      <td>{table.reservation_id ? "Occupied" : "Open"}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataList;
