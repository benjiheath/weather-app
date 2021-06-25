import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import { s, c, h, hc, hr, lc, lr, sl, sn, t } from "../../resources/img/index";

const Img = () => {
	const { weatherData } = useContext(UserLocationContext);

	const determineWeatherImg = () => {
		switch (weatherData.consolidated_weather[0].weather_state_abbr) {
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

	return (
		<div className="summary-img-container flex-center">
			<img src={determineWeatherImg()} alt=""></img>
		</div>
	);
};

export default Img;
