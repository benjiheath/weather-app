import ForecastCard from "./ForecastCard";
import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import Spinner from "../Spinner";

export const ForecastCards = () => {
	const { weatherData, reloading } = useContext(UserLocationContext);
	const next5Days = weatherData.consolidated_weather.filter((_, idx) => idx !== 0);

	return (
		<div className={`${reloading ? "flex-center" : "flex-row-between"} row-80`}>
			{reloading ? (
				<Spinner />
			) : (
				next5Days.map((day, idx) => (
					<ForecastCard day={day} idx={idx} key={idx} />
				))
			)}
		</div>
	);
};

export default ForecastCards;
