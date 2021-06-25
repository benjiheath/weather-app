import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const DateLocation = () => {
	const { weatherData, dates, darkMode, c } = useContext(UserLocationContext);
	const currentCity = weatherData.title;

	return (
		<div className="date-location-container flex-column-between">
			<div className="date flex-row-between">
				<p style={{ color: !darkMode && c.lm.tc }}>Today</p>
				<p style={{ color: !darkMode && c.lm.tc }} className="dot">
					•
				</p>
				<p style={{ color: !darkMode && c.lm.tc }}>
					{dates ? dates[0] : "no date?"}
				</p>
			</div>
			<div className="location flex-row-between">
				<FaMapMarkerAlt
					style={{ color: !darkMode && c.lm.tc }}
					className="location-icon"
				/>
				<p style={{ color: !darkMode && c.lm.tc }}>{currentCity}</p>
			</div>
		</div>
	);
};

export default DateLocation;
