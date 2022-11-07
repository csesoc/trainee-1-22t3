import { useState } from "react";
import { Marker, DirectionsService } from "@react-google-maps/api";

export default function Passengers({
  driver,
  position,
  title,
  i,
  clusterer,
  findDirection,
}) {
  const [style, setStyle] = useState(false);
  const handleClick = () => {
    setStyle((current) => !current);
    fetchDirections(position);
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

  return (
    <div>
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
