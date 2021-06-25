import HighlightCard from "./HighlightCard";
import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";

const Highlights = () => {
	const { weatherData } = useContext(UserLocationContext);
	const todaysData = weatherData.consolidated_weather[0];

	// Card 1: Wind
	const windStatus = Math.round(todaysData.wind_speed * 1.609);
	const windDirection = todaysData.wind_direction_compass;
	// Card 2: Humidity
	const humidity = todaysData.humidity;
	// Card 3: Visibility
	const visibility = (todaysData.visibility * 1.609).toFixed(1);
	// Card 4: Air Pressure
	const airPressure = Math.round(todaysData.air_pressure);

	return (
		<div className="highlights row-80">
			<h3>Today's Highlights</h3>
			<div className="highlight-cards-row-1 flex-row-between">
				<HighlightCard
					className="highlight-card highlight-card-l flex-column-even"
					title={"Wind status"}
					value={windStatus}
					unit={"kmph"}
					footerText={windDirection}
					footerIcon={true}
				/>
				<HighlightCard
					className="highlight-card highlight-card-l flex-column-even"
					title={"Humidity"}
					value={humidity}
					unit={"%"}
					footerBar={true}
				/>
			</div>
			<div className="highlight-cards-row-2 flex-row-between">
				<HighlightCard
					className="highlight-card highlight-card-s flex-column-even"
					title={"Visibility"}
					value={visibility}
					unit={"km"}
				/>
				<HighlightCard
					className="highlight-card highlight-card-s flex-column-even"
					title={"Air Pressure"}
					value={airPressure}
					unit={"mb"}
				/>
			</div>
		</div>
	);
};

export default Highlights;
