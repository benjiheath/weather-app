import SummaryHeader from "./SummaryHeader";
import Img from "./Img";
import TempDesc from "./TempDesc";
import DateLocation from "./DateLocation";

const Summary = () => {
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
