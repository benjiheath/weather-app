import ForecastCard from "./ForecastCard";
import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";

export const ForecastCards = () => {
	const { weatherData } = useContext(UserLocationContext);
	const next5Days = weatherData.consolidated_weather.filter((_, idx) => idx !== 0);

	return (
		<div className="flex-row-between row-80">
			{next5Days.map((day, idx) => (
				<ForecastCard day={day} idx={idx} key={idx} />
			))}
		</div>
	);
};

export default ForecastCards;
