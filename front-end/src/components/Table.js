import React, { useState } from "react";
import { finishTable } from "../utils/api";
import FinishButton from "./FinishButton";
import ErrorAlert from "../layout/ErrorAlert";

export default function Table({ table, loadDashboard }) {
  const [error, setError] = useState(null);
  const handleFinish = async (e) => {
    e.preventDefault();
    try {
      if (
        window.confirm(
          "Is this table ready to seat new guests? This cannot be undone."
        )
      ) {
        await finishTable(table.table_id);
        loadDashboard();
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <>
      <ErrorAlert error={error} />
      <tr>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.reservation_id}</td>
        <td data-table-id-status={table.table_id}>{table.reservation_id ? "occupied" : "free"}</td>
        <td>
          {table.reservation_id ? (
            <FinishButton table={table} handleFinish={handleFinish} />
          ) : null}
        </td>
      </tr>
    </>
  );
}