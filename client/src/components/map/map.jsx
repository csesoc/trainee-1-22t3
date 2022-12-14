import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";

import UploadCSV from "./uploadCSV";
import "./map.css";


const Map = () => {
  const center = useMemo(() => ({ lat: -33.85, lng: 151 }), []);
  const [drivers, setDrivers] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [directions, setDirections] = useState();
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  console.log(passengers)
  console.log(drivers)

  // useEffect(() => {
  //   setPassengers([
  //     { ID: 1, Name: "MJ", Suburb: { lat: -33.8234, lng: 151.1939 }, Group: "A" },
  //     {
  //       ID: 2,
  //       Name: "Raiyan",
  //       Suburb: { lat: -33.7961, lng: 151.178 },
  //       Group: "B",
  //     },
  //     {
  //       ID: 3,
  //       Name: "Rachel",
  //       Suburb: { lat: -33.8368, lng: 151.2073 },
  //       Group: "B",
  //     },
  //     {
  //       ID: 4,
  //       Name: "Oscar",
  //       Suburb: { lat: -33.7457, lng: 151.1432 },
  //       Group: "A",
  //     },
  //     {
  //       ID: 5,
  //       Name: "James",
  //       Suburb: { lat: -33.7201, lng: 151.117 },
  //       Group: "A",
  //     },
  //   ]);
  
  //   setDrivers([
  //     { ID: 6, Name: "Sally", Suburb: { lat: -33.82, lng: 151.19 }, Group: "A" },
  //     {
  //       ID: 7,
  //       Name: "Hellen",
  //       Suburb: { lat: -33.9646, lng: 151.101 },
  //       Group: "B",
  //     },
  //   ]);
  // }, [])

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

  const fetchDirections = async (person) => {
    const driver = drivers.filter((d) => d.Group === person.Group)[0];
    if (!driver) return;

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: driver.Suburb,
        destination: person.Suburb,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="container">
      <div className="map">
        <div className="map__info">
          <UploadCSV setDrivers={setDrivers} setPassengers={setPassengers}/>
        </div>
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName="map__container"
          onLoad={onLoad}
          options={options}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polyLineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976d2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          <MarkerClusterer>
            {(clusterer) =>
              passengers.map((person, i) => (
                <Marker
                  key={i}
                  position={person.Suburb}
                  title={`${i + 1}. ${person.Name}`}
                  label={{
                    text: person.Group,
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/micons/pink.png",
                    labelOrigin: new window.google.maps.Point(16, 10),
                  }}
                  onClick={() => {
                    fetchDirections(person);
                    handleActiveMarker(person.ID);
                  }}
                >
                  {activeMarker === person.ID ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <div>{person.Name}</div>
                    </InfoWindow>
                  ) : null}
                </Marker>
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
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/micons/purple.png",
                      labelOrigin: new window.google.maps.Point(16, 10),
                    }}
                    label={{
                      text: person.Group,
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: "12px",
                    }}
                    clusterer={clusterer}
                    onClick={() => {
                      handleActiveMarker(person.ID);
                    }}
                  >
                    {activeMarker === person.ID ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div>{person.Name}</div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
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
