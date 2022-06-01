import React from "react";
import { Link } from "react-router-dom";

export default function Reservation({ reservation }) {
  return (
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
    </tr>
  );
}