import React from "react";
import { useState } from "react";
import Papa from "papaparse";

export default function UploadCSV() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: function (results) {
        console.log(results);
        const rowsArray = ["Name", "Suburb", "Role"];
        const valuesArray = [];

        const data = [];

        for (let i = 0; i < results.data.length; i++) {
          data.push(results.data[i]);
        }

        for (let i = 0; i < data.length; i++) {
          data[i] = Object.fromEntries(
            Object.entries(data[i]).filter(
              ([key]) => !key.includes("Timestamp")
            )
          );
        }
        console.log(data);

        data.map((d) => {
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  // return parsed csv stuff as data
  // data = array of objects with key-value pairs

  return (
    <div className="returnedTable">
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
