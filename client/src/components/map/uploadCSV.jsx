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
      complete: (results) => {
        console.log(results);
        const rowsArray = ["Name", "Suburb", "Role"];
        const valuesArray = [];

        let data = [];

        for (let obj of results.data) {
          let asArray = Object.entries(obj);
          asArray.shift();
          for (let pair of asArray) {
            pair.shift();
          }
          data.push(asArray);
        }

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
          {values.map((value, index) => (
            <tr key={index}>
              {value.map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
