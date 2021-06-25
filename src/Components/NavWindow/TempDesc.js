import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";

const TempDesc = () => {
	const { weatherData, tempUnit, darkMode, c } = useContext(UserLocationContext);

	const todaysWeather = weatherData.consolidated_weather[0];
	const currentTemp =
		tempUnit === "C"
			? Math.round(todaysWeather.the_temp)
			: Math.round(todaysWeather.the_temp * 1.8 + 32);
	const weatherDescription = todaysWeather.weather_state_name;

	return (
		<div className="summary-temp-desc flex-column-between">
			<div className="temp-unit-container">
				<label
					style={{ color: !darkMode && c.lm.tc }}
					className="summary-temp-num"
				>
					{currentTemp}
				</label>
				<label
					style={{ color: !darkMode && c.lm.tc }}
					className="summary-temp-unit"
				>
					&deg;{tempUnit}
				</label>
			</div>
			<p style={{ color: !darkMode && c.lm.tc }}>{weatherDescription}</p>
		</div>
	);
};

export default TempDesc;
