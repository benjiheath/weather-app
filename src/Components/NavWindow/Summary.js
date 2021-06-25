import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import SummaryHeader from "./SummaryHeader";
import Img from "./Img";
import TempDesc from "./TempDesc";
import DateLocation from "./DateLocation";

const Summary = () => {
	const { darkMode, c } = useContext(UserLocationContext);
	return (
		<div
			className="summary flex-column-between"
			style={{ backgroundColor: darkMode ? c.dm.c2 : c.lm.c2 }}
		>
			<SummaryHeader />
			<Img />
			<TempDesc />
			<DateLocation />
		</div>
	);
};

export default Summary;
