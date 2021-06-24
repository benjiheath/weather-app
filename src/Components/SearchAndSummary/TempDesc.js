import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";

const TempDesc = () => {
	const { weatherData, tempUnit } = useContext(UserLocationContext);

	const currentTemp =
		tempUnit === "C"
			? Math.round(weatherData.consolidated_weather[0].the_temp)
			: Math.round(weatherData.consolidated_weather[0].the_temp * 1.8 + 32);
	const currentWeather = weatherData.consolidated_weather[0].weather_state_name;

	return (
		<div className="summary-temp-desc flex-column-between">
			<div className="temp-unit-container">
				<label className="summary-temp-num">{currentTemp}</label>
				<label className="summary-temp-unit">&deg;{tempUnit}</label>
			</div>
			<p>{currentWeather}</p>
		</div>
	);
};

export default TempDesc;
