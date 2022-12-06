import React, { useState } from "react";
import Papa from "papaparse";

const UploadCSV = ({ setDrivers, setPassengers }) => {
  const [parsedData, setParsedData] = useState([]);
  const [tableCols, setTableCols] = useState([]);

  const rowsArray = ["Name", "Suburb", "Role"];

  const changeHandler = async (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      complete: (results) => {
        // Filtered Column Names
        setTableCols(rowsArray);

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Add latitude/longitude and ID to people data
        const processedPeople = results.data
          .map((person, idx) => (findLatLong(`${person.Suburb} NSW`).then(results =>
            ({
              ...person,
              ID: idx,
              Group: "A",
              Suburb: {
                lat: results.results[0].geometry.location.lat(),
                lng: results.results[0].geometry.location.lng(),
              }
            })
        )))

        Promise.all(processedPeople).then(resolvedPeople => {          
          setDrivers(resolvedPeople.filter((person) => person.Role === "Driver"))
          setPassengers(resolvedPeople.filter((person) => person.Role === "Passenger"));
        })
      },
    });
  };

  const geocoder = new window.google.maps.Geocoder();

  const findLatLong = async (address) => {
    return await geocoder.geocode({ address }, (results, status) => {
      if (status !== "OK") {
        console.log("Geocode was not successful for the following reason: " + status);
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
            {tableCols.map((rows, index) => (
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
