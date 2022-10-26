import { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker, Circle } from "@react-google-maps/api";

// import Search from "./search";
import UploadCSV from "./uploadCSV";
import "./map.css";

export default function Map() {
  const center = useMemo(() => ({ lat: -33.85, lng: 151 }), []);
  const [address, setAddress] = useState();
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

  return (
    <div className="container">
      <div className="map">
        <div className="map__info">
          <UploadCSV />
        </div>
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerClassName="map__container"
          onLoad={onLoad}
          options={options}
        >
          {address && (
            <>
              <Marker position={address} />
              <Circle center={address} radius={5000} options={closeOptions} />
              <Circle center={address} radius={10000} options={middleOptions} />
              <Circle center={address} radius={15000} options={farOptions} />
            </>
          )}
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
