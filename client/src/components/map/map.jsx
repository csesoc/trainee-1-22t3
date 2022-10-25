import { useState, useMemo, useRef, useCallback } from "react";
import {
  GoogleMap
} from "@react-google-maps/api"

<<<<<<< HEAD
import Search from "./search";
import UploadCSV from "./uploadCSV";
import './map.css'

function Map() {
	const center = useMemo(() => ({ lat: -33.85, lng: 151 }), []);
=======
import Search from "../header/search";
import '../../index.css'
import './map.css'

function Map() {
	const center = useMemo(() => ({ lat: -33.85, lng: 151.21 }), []);
>>>>>>> 8cf0795100f6c59246c565d8eacdfe1f26011597
	const [address, setAddress] = useState();
	const mapRef = useRef();
	const onLoad = useCallback((map) => (mapRef.current = map), []);
	
	return (
		<div className="container">
			<div className="map">
<<<<<<< HEAD
                <div className="map__info">
                    <Search setAddress={(position) => {
                        setAddress(position);
                        mapRef.current?.panTo(position);
                    }} />
                    <UploadCSV />
                </div>
				<GoogleMap 
					zoom={11}
					center={center}
					mapContainerClassName='map__container'
=======
				<Search setAddress={(position) => {
					setAddress(position);
					mapRef.current?.panTo(position);
				}} />
				<GoogleMap 
					zoom={11}
					center={center}
					mapContainerClassName='map-container'
>>>>>>> 8cf0795100f6c59246c565d8eacdfe1f26011597
					onLoad={onLoad}
				>
				</GoogleMap>
			</div>
<<<<<<< HEAD
=======

>>>>>>> 8cf0795100f6c59246c565d8eacdfe1f26011597
		</div>
	)
}

export default Map