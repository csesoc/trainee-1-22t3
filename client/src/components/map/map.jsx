import { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap
} from "@react-google-maps/api"

import Search from "../header/search";
import '../../index.css'
import './map.css'

function Map() {
	const center = useMemo(() => ({ lat: -33.85, lng: 151 }), []);
	const [address, setAddress] = useState();
	const mapRef = useRef();
	const onLoad = useCallback((map) => (mapRef.current = map), []);
	
	return (
		<div className="container">
			<div className="map">
				<Search setAddress={(position) => {
					setAddress(position);
					mapRef.current?.panTo(position);
				}} />
				<GoogleMap 
					zoom={11}
					center={center}
					mapContainerClassName='map-container'
					onLoad={onLoad}
				>
				</GoogleMap>
			</div>
		</div>
	)
}

export default Map