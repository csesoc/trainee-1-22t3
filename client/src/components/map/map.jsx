import { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";

import UploadCSV from "./uploadCSV";
import "./map.css";

const Map = () => {
  const center = useMemo(() => ({ lat: -33.85, lng: 151 }), []);
  //   const [drivers, setDrivers] = useState();
  //   const [passengers, setPassengers] = useState();
//   const [directions, setDirections] = useState();
//   const [style, setStyle] = useState(false);
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const options = useMemo(
    () => ({
      //   mapId: "b181cac70f27f5e6", // dark map
      mapId: "2ca571bbe60acfd2", // light map
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  //   const fetchDirections = async (position) => {
  //     if (!driver) return;
  //     const service = new window.google.maps.DirectionsService();
  //     service.route(
  //       {
  //         origin: driver,
  //         destination: position,
  //         travelMode: window.google.maps.TravelMode.DRIVING,
  //       },
  //       (result, status) => {
  //         if (status === "OK" && result) {
  //           setDirections(result);
  //         }
  //       }
  //     );
  //   };

//   const iconStyle = style
//     ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
//     : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  const passengers = [
    { Name: "MJ", Suburb: { lat: -33.8234, lng: 151.1939 }, Group: "A" },
    { Name: "Raiyan", Suburb: { lat: -33.7961, lng: 151.178 }, Group: "B" },
    { Name: "Rachel", Suburb: { lat: -33.8368, lng: 151.2073 }, Group: "B" },
    { Name: "Oscar", Suburb: { lat: -33.7457, lng: 151.1432 }, Group: "A" },
    { Name: "James", Suburb: { lat: -33.7201, lng: 151.117 }, Group: "A" },
  ];

  const drivers = [
    { Name: "Sally", Suburb: { lat: -33.82, lng: 151.19 }, Group: "A" },
    { Name: "Hellen", Suburb: { lat: -33.9646, lng: 151.101 }, Group: "B" },
  ];

  return (
    <div className="container">
      <div className="map">
        <div className="map__info">
          <UploadCSV
          //   setDrivers={setDrivers} setPassengers={setPassengers}
          />
        </div>
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName="map__container"
          onLoad={onLoad}
          options={options}
        >
          {/* {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polyLineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976d2",
                  strokeWeight: 5,
                },
              }}
            />
          )} */}
          <MarkerClusterer>
            {(clusterer) =>
              passengers.map((person, i) => (
                <Marker
                  key={i}
                  position={person.Suburb}
                  title={`${i + 1}. ${person.Name}`}
                  label={person.Group}
                //   icon={iconStyle}
                  clusterer={clusterer}
                //   onClick={() => {
                    // setStyle((current) => !current);
                    // fetchDirections(position);
                //   }}
                />
              ))
            }
          </MarkerClusterer>
          <MarkerClusterer>
            {(clusterer) =>
              drivers.map((person, i) => (
                <>
                  <Marker
                    key={i}
                    position={person.Suburb}
                    title={`${i + 1}. ${person.Name}`}
                    // icon={
                    //   "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    // }
                    label={person.Group}
                    clusterer={clusterer}
                  />
                  <Circle
                    center={person.Suburb}
                    radius={5000}
                    options={closeOptions}
                  />
                  <Circle
                    center={person.Suburb}
                    radius={10000}
                    options={middleOptions}
                  />
                  <Circle
                    center={person.Suburb}
                    radius={15000}
                    options={farOptions}
                  />
                </>
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

// Map circle options
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
