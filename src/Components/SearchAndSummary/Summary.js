import { useContext } from "react";
import SummaryHeader from "./SummaryHeader";
import Img from "./Img";
import TempDesc from "./TempDesc";
import DateLocation from "./DateLocation";
import { UserLocationContext } from "../UserLocationContext";
import Spinner from "../Spinner";

const Summary = () => {
	const { isLoading, weatherData, dates } = useContext(UserLocationContext);

	return (
		<div className="summary flex-column-even">
			<SummaryHeader />
			<Img />
			<TempDesc />
			<DateLocation />
		</div>
	);
};

export default Summary;
