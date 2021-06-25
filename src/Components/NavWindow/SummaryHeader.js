import { useContext } from "react";
import { MdGpsFixed } from "react-icons/md";
import { LeftWindowContext } from "./NavContext";
import { UserLocationContext } from "../UserLocationContext";

const SummaryHeader = () => {
	const { setShowSearch, setNewLocation } = useContext(LeftWindowContext);
	const { userLocationID, darkMode, c } = useContext(UserLocationContext);

	return (
		<div className="flex-row-between row-80 sum-head">
			<button
				className="btn-open-search"
				style={{ backgroundColor: !darkMode && c.lm.tc }}
				onClick={() => setShowSearch(true)}
			>
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
