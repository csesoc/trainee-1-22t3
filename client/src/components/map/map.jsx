import { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Search from "./search";
import UploadCSV from "./uploadCSV";
import "./map.css";

export default function Map() {
  const center = useMemo(() => ({ lat: -33.85, lng: 151 }), []);
  const [driver, setDriver] = useState();
  const [directions, setDirections] = useState();
  const [style, setStyle] = useState(false);
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const options = useMemo(
    () => ({
      // mapId: "b181cac70f27f5e6", // dark map
      mapId: "2ca571bbe60acfd2", // light map
      //   disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const fetchDirections = async (position) => {
    if (!driver) return;
    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: driver,
        destination: position,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  const iconStyle = style
    ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  const stops = [
    [{ lat: -33.8234, lng: 151.1939 }, "MJ"],
    [{ lat: -33.7961, lng: 151.178 }, "Raiyan"],
    [{ lat: -33.8368, lng: 151.2073 }, "Rachel"],
    [{ lat: -33.7457, lng: 151.1432 }, "Oscar"],
    [{ lat: -33.7201, lng: 151.117 }, "James"],
  ];

  return (
    <div className="container">
      <div className="map">
        <div className="map__info">
          <Search
            setDriver={(position) => {
              setDriver(position);
              mapRef.current?.panTo(position);
            }}
          />
          <UploadCSV />
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
                polyLineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976d2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {driver && (
            <>
              <Marker
                position={driver}
                title={"Sally"}
                // icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
              />
              <Circle center={driver} radius={5000} options={closeOptions} />
              <Circle center={driver} radius={10000} options={middleOptions} />
              <Circle center={driver} radius={15000} options={farOptions} />
            </>
          )}
          <MarkerClusterer>
            {(clusterer) =>
              stops.map(([position, title], i) => (
                <Marker
                  key={i}
                  position={position}
                  title={`${i + 1}. ${title}`}
                  //   icon={iconStyle}
                  clusterer={clusterer}
                  onClick={() => {
                    setStyle((current) => !current);
                    fetchDirections(position);
                  }}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </div>
  );
}

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
