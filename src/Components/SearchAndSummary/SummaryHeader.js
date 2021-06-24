import { useContext } from "react";
import { MdGpsFixed } from "react-icons/md";
import { LeftWindowContext } from "./LeftWindowContext";
import { UserLocationContext } from "../UserLocationContext";

const SummaryHeader = () => {
	const { setShowSearch, setNewLocation } = useContext(LeftWindowContext);
	const { userLocationID } = useContext(UserLocationContext);

	return (
		<div className="flex-row-between row-80">
			<button className="btn-open-search" onClick={() => setShowSearch(true)}>
				Search for places
			</button>
			<label className="lbl-circle flex-center lbl-circle-gps">
				<MdGpsFixed
					className="gps-icon"
					onClick={() => setNewLocation(userLocationID)}
				></MdGpsFixed>
			</label>
		</div>
	);
};

export default SummaryHeader;
