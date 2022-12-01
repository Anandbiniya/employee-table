import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Form.css";

function Form({ handleEdit, data, close, inx }) {
  const [Data, setData] = useState({
    id: uuidv4(),
    name: "",
    Age: "",
    Deepartment: "",
    Blood: "",
    Contact: "",
    address: "",
  });

  const [record, setRecord] = useState(
    JSON.parse(localStorage.getItem("key")) || []
  );
  // If editable data is present then render data to form
  useEffect(() => {
    if (data && data.length != 0) {
      setData(data[inx]);
    }
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...Data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    let newData = { ...Data };
    if (data) {
      data[inx] = Data;
      localStorage.setItem("key", JSON.stringify(data));
    } else {
      setRecord([...record, newData]);
    }
    close();
  };
  localStorage.setItem("key", JSON.stringify(record));
  console.log(data, inx);

  return (
    <>
      <form
        onSubmit={!data?.id ? handleSubmit : handleEdit}
        style={{ display: "inline-block" }}
      >
        <hr />
        <div className="information">
          <label className="details_label">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={Data.name}
            placeholder="name"
            required
          />
        </div>
        <br />
        <div className="information">
          <label className="details_label">Age</label>
          <input
            type="text"
            name="Age"
            onChange={handleChange}
            value={Data.Age}
            placeholder="Age"
            required
          />
        </div>
        <br />
        <div className="information">
          <label className="details_label">Deepartment</label>
          <input
            type="text"
            name="Deepartment"
            onChange={handleChange}
            value={Data.Deepartment}
            placeholder="Deepartment"
            required
          />
        </div>
        <br />
        <div className="information">
          <label className="details_label">Blood</label>
          <input
            type="text"
            name="Blood"
            onChange={handleChange}
            value={Data.Blood}
            placeholder="Blood Group"
            required
          />
        </div>
        <br />
        <div className="information">
          <label className="details_label">Contact</label>
          <input
            type="number"
            name="Contact"
            onChange={handleChange}
            value={Data.Contact}
            placeholder="Contact"
            required
          />
        </div>
        <br />
        <div className="information">
          <label className="details_label">Address</label>
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={Data.address}
            placeholder="Address"
            required
          />
        </div>
        <br />
        <div className="submitdata">
          <button
            type="button"
            onClick={() => close()}
            style={{ backgroundColor: "silver" }}
          >
            Close
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Form;
