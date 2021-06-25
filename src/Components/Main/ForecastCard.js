import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import { s, c, h, hc, hr, lc, lr, sl, sn, t } from "../../resources/img/index";

const ForecastCard = ({ day, idx }) => {
	const { weatherData, dates, tempUnit, darkMode, c } = useContext(UserLocationContext);

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
		<div
			className="forecast-card flex-column-even"
			style={{
				backgroundColor: darkMode ? c.dm.c2 : c.lm.c2,
				boxShadow: !darkMode && "0px 0px 10px 1px #c7e9ff",
			}}
		>
			<p style={{ color: !darkMode && c.lm.tc }}>{dates[idx + 1]}</p>
			<img src={determineWeatherImg()} alt=""></img>
			<div className="temps-high-low flex-row-even">
				<p style={{ color: !darkMode && c.lm.tc }}>
					{`${minTemp}`}&deg;{tempUnit}
				</p>
				<p style={{ color: !darkMode && c.lm.tc }}>
					{`${maxTemp}`}&deg;{tempUnit}
				</p>
			</div>
		</div>
	);
};

export default ForecastCard;
