import { useState } from "react";
import { Marker, DirectionsService, InfoWindow } from "@react-google-maps/api";

export default function Passengers({
  driver,
  position,
  title,
  i,
  clusterer,
  findDirection,
}) {
  const [style, setStyle] = useState(
    (selectedPlace = position),
    (activeMarker = {}),
    (showingInfoWindow = false)
  );

  const handleClick = () => {
    fetchDirections(position);
    setStyle({
      selectedPlace: position,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  const iconStyle = style
    ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
    : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  const fetchDirections = async (position) => {
    if (!driver) return;
    const service = new DirectionsService();
    service.route(
      {
        origin: driver,
        destination: position,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK" && result) {
          findDirection = result;
        }
      }
    );
  };

  const onInfoWindowClose = () => {
    setStyle({
      activeMarker: null,
      showingInfoWindow: false,
    });
  };

  return (
    <div>
      {/* <InfoWindow
        marker={activeMarker}
        onClose={onInfoWindowClose}
        visible={showingInfoWindow}
      ></InfoWindow> */}
      <Marker
        key={i}
        position={position}
        title={`${i + 1}. ${title}`}
        icon={iconStyle}
        clusterer={clusterer}
        onClick={handleClick}
      />
    </div>
  );
}
