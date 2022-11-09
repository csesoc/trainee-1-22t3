import React from "react";
import { useState } from "react";
import Papa from "papaparse";

const UploadCSV = () => {
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

        // // Get drivers and passengers
        // setDrivers(
        //   results.data
        //     .filter((person) => person.Role == "Driver")
        //     .forEach(
        //       (person) => (person.Suburb = findLatLong(`${person.Suburb} NSW`))
        //     )
        // );
        // setPassengers(
        //   results.data.filter((person) => person.Role == "Passenger")
        // );
      },
    });
  };

  const findLatLong = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    console.log(address);
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        console.log(results[0].geometry.location.lat);
        return results[0].geometry.location;
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
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
            parsedData.map((person, index) => (
              <tr key={index}>
                <td>{person.Name}</td>
                <td>{person.Suburb}</td>
                <td>{person.Role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadCSV;
