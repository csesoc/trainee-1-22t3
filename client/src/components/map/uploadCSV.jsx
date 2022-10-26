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
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        // const rowsArray = ["Name", "Address", "Role"];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      {/* Table */}
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

// export default function UploadCSV() {
//   const { CSVReader } = useCSVReader();

//   const changeHandler = (event) => {
//     console.log("CHANGE HANDLER");
//     console.log(event.target.files[0]);
//   };

//   return (
//     <CSVReader
//       onUploadAccepted={(results) => {
//         console.log("---------------------------");
//         console.log(results);
//         console.log("---------------------------");
//       }}
//     >
//       {({ getRootProps, acceptedFile, getRemoveFileProps }) => (
//         <>
//           <div style={styles.csvReader}>
//             <button type="button" {...getRootProps()} style={styles.browseFile}>
//               Browse file
//             </button>
//             <div style={styles.acceptedFile}>
//               {acceptedFile && acceptedFile.name}
//             </div>
//             <button {...getRemoveFileProps()} style={styles.remove}>
//               Remove
//             </button>
//           </div>
//         </>
//       )}
//     </CSVReader>
//   );
// }

// const styles = {
//   csvReader: {
//     display: "flex",
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   browseFile: {
//     width: "40%",
//   },
//   acceptedFile: {
//     border: "1px solid #ccc",
//     height: 45,
//     lineHeight: 2.5,
//     paddingLeft: 10,
//     width: "80%",
//   },
//   remove: {
//     borderRadius: 0,
//     padding: "0 20px",
//   },
// };
