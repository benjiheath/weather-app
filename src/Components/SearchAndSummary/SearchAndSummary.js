import { useState, useContext } from "react";
import axios from "axios";
import Summary from "./Summary";
import Search from "./Search";
import { LeftWindowContext } from "./LeftWindowContext";
import { UserLocationContext } from "../UserLocationContext";

const SearchAndSummary = () => {
	const { setWeatherData, setLoading, isLoading } = useContext(UserLocationContext);

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
