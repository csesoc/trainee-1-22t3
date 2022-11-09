import React from "react";
import { useState } from "react";
import Papa from "papaparse";

const UploadCSV = ({ setDrivers, setPassengers }) => {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  const rowsArray = ["Name", "Suburb", "Role"];

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: (results) => {
        console.log(results);

        // Filtered Column Names
        setTableRows(rowsArray);

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Get drivers and passengers
        setDrivers(parsedData.filter((person) => person.Role == "Driver"));
        setPassengers(
          parsedData.filter((person) => person.Role == "Passenger")
        );
      },
    });
  };

  return (
    <div className="returnedTable">
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <table>
        <thead>
          <tr id="tableHead">
            {tableRows.map((rows, index) => (
              <th key={index}>{rows}</th>
            ))}
          </tr>
        </thead>
        <tbody id="tableRow">
          {parsedData &&
            parsedData.map((parsedData, index) => (
              <tr key={index}>
                <td>{parsedData.Name}</td>
                <td>{parsedData.Suburb}</td>
                <td>{parsedData.Role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadCSV;
