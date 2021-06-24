import { s, c, h, hc, hr, lc, lr, sl, sn, t } from "../../resources/img/index";

import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";

const ForecastCard = ({ day, idx }) => {
	const { weatherData, dates, tempUnit } = useContext(UserLocationContext);

	const determineWeatherImg = () => {
		switch (weatherData.consolidated_weather[idx].weather_state_abbr) {
			case "c":
				return c;
			case "h":
				return h;
			case "hc":
				return hc;
			case "hr":
				return hr;
			case "lc":
				return lc;
			case "lr":
				return lr;
			case "s":
				return s;
			case "sl":
				return sl;
			case "sn":
				return sn;
			case "t":
				return t;
			default:
				return null;
		}
	};

	const minTemp =
		tempUnit === "C"
			? Math.round(weatherData.consolidated_weather[idx].min_temp)
			: Math.round(weatherData.consolidated_weather[idx].min_temp * 1.8 + 32);
	const maxTemp =
		tempUnit === "C"
			? Math.round(weatherData.consolidated_weather[idx].max_temp)
			: Math.round(weatherData.consolidated_weather[idx].max_temp * 1.8 + 32);

	return (
		<div className="forecast-card flex-column-even">
			<p>{dates[idx + 1]}</p>
			<img src={determineWeatherImg()} alt=""></img>
			<div className="temps-high-low flex-row-even">
				<p>
					{`${minTemp}`}&deg;{tempUnit}
				</p>
				<p>
					{`${maxTemp}`}&deg;{tempUnit}
				</p>
			</div>
		</div>
	);
};

export default ForecastCard;
