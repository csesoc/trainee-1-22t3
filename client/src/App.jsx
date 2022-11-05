import React from "react";
import { useLoadScript } from "@react-google-maps/api";

import Map from "./components/map/map";
import Header from "./components/header/header";
import "./index.css";
import Details from "./components/details/details";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBvChWmi1hl5drsquInQ-ag3OLpylkQC2E",
    libraries: ["places", "directions"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Details
        body={
          <>
            <Header />
            <Map />
          </>
        }
      />
    </>
  );
}

export default App;
