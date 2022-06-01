import { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

const TableForm = () => {
  const initialFormState = {
    table_name: "",
    capacity: "",
    reservation_id: null,
  };

  let history = useHistory();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "capacity" ? Number(target.value) : target.value,
    });
  };

  const handleCancel = () => {
    history.go(-1);
  };

  const handleSubmit = async (e) => {
    const abortController = new AbortController();
    try {
      e.preventDefault();
      await createTable(formData, abortController.signal);
      history.push("/dashboard");
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  return (
    <>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit}>
        <h2>Create Table</h2>
        <label htmlFor="table_name">
          Table Name
          <input
          name="table_name"
          id="table_name"
          className="form-control"
          value={formData.table_name}
          onChange={handleChange}
          required={true}
          />
        </label>
        <label htmlFor="capacity">
          Capacity
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="Capacity"
            required
            min="1"
            onChange={handleChange}
            value={formData.capacity}
          />
        </label>
        <button type="submit">Submit</button>
        <button onClick={handleCancel} type="cancel">
          Cancel
        </button>
      </form>
    </>
  );
};

export default TableForm;
