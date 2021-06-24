import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const DateLocation = () => {
	const { weatherData, dates } = useContext(UserLocationContext);

	const currentCity = weatherData.title;

	return (
		<div className="date-location-container flex-column-between">
			<div className="date flex-row-between">
				<p>Today</p>
				<p className="dot">•</p>
				<p>{dates ? dates[0] : "no date?"}</p>
			</div>
			<div className="location flex-row-between">
				<FaMapMarkerAlt className="location-icon" />
				<p>{currentCity}</p>
			</div>
		</div>
	);
};

export default DateLocation;
