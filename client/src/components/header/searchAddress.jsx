import React from 'react';
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function SearchAddress({ setAddress }) {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	  } = usePlacesAutocomplete();

	const handleSelect = async (val) => {
		setValue(val, false);
		clearSuggestions();
	
		const results = await getGeocode({ address: val });
		const { lat, lng } = await getLatLng(results[0]);
		setAddress({ lat, lng });
	};
	
	return (
		<Combobox onSelect={handleSelect}>
		<ComboboxInput
			styles={{borderColor: "grey"}}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			disabled={!ready}
			className="combobox-input"
			placeholder="Search Address"
		/>
		<ComboboxPopover>
		  <ComboboxList>
			{status === "OK" &&
			  data.map(({ place_id, description }) => (
				<ComboboxOption key={place_id} value={description} />
			  ))}
		  </ComboboxList>
		</ComboboxPopover>
	  </Combobox>
	)
}

export default SearchAddress