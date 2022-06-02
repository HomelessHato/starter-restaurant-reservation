import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function Reservation({ reservation }) {
  const history = useHistory();
  const [error, setError] = useState(null);
  const handleReservationCancel = async (e) => {
    e.preventDefault();
    try {
      if (
        window.confirm(
          "Do you want to cancel this reservation? This cannot be undone."
        )
      ) {
        const status = "cancelled";
        await cancelReservation(reservation, status);
        history.go(0);
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>
    <ErrorAlert error={error} />
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>
         {reservation.last_name}, {reservation.first_name}
      </td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
      <td>
        {reservation.status === "booked" ? 
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          Seat
        </Link>
        : null
      }
      </td>
      <td>
          {reservation.status === "booked" ? (
            <Link to={`/reservations/${reservation.reservation_id}/edit`}>
              Edit
            </Link>
          ) : null}
        </td>
        <td>
        <button
            className="btn btn-link"
            type="button"
            name="cancel"
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={handleReservationCancel}
          >
            Cancel
          </button>
        </td>
    </tr>
    </>
  );
}