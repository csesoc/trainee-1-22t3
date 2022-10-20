import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api"

import SearchAddress from "../header/searchAddress";
import '../../index.css'
import './map.css'

function Map() {
	const center = useMemo(() => ({ lat: -33.85, lng: 151.21 }), []);
	const [address, setAddress] = useState();
	const mapRef = useRef();
	
	return (
		<div className="container">
			<div className="map">
				<SearchAddress setAddress={(position) => {
					setAddress(position);
					mapRef.current?.panTo(position);
				}} />
				<GoogleMap 
					zoom={11}
					center={center}
					mapContainerClassName='map-container'
				>
				</GoogleMap>
			</div>

		</div>
	)
}

export default Map