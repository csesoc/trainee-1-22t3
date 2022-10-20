import React from 'react'
import { useLoadScript } from "@react-google-maps/api"

import Map from './components/map/map'
import Header from './components/header/header'
import './index.css'

function App() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: "AIzaSyBvChWmi1hl5drsquInQ-ag3OLpylkQC2E",
		libraries: ["places"],
	});
	
	if (!isLoaded) return <div>Loading...</div>;
	return (
		<>
			<Header />
			<Map />
		</>
	)
}

export default App