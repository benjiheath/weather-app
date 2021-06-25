import axios from "axios";
import { useState, useContext } from "react";
import { LeftWindowContext } from "./NavContext";
import { UserLocationContext } from "../UserLocationContext";
import Summary from "./Summary";
import Search from "./Search";

const SearchAndSummary = () => {
	const { setWeatherData, setLoading } = useContext(UserLocationContext);
	const [showSearch, setShowSearch] = useState(false);

	const setNewLocation = async (locationID) => {
		// get weather info using cityID
		try {
			setLoading(true);
			const responseWeather = await axios.get(
				`https://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/${locationID}`
			);
			setWeatherData(responseWeather.data);
			setLoading(false);
		} catch (error) {
			console.error("Error with selected location:", error);
		}
	};

	return (
		<>
			<LeftWindowContext.Provider
				value={{ setShowSearch, showSearch, setNewLocation }}
			>
				{!showSearch && <Summary />}
				{showSearch && <Search />}
			</LeftWindowContext.Provider>
		</>
	);
};

export default SearchAndSummary;
