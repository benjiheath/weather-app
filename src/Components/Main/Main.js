import UnitSelect from "./UnitSelect";
import ForecastCards from "./Forecast";
import Highlights from "./Highlights";
import Footer from "./Footer";
import { UserLocationContext } from "../UserLocationContext";
import { useContext } from "react";

const Main = () => {
	const { darkMode, c } = useContext(UserLocationContext);

	return (
		<div className="main" style={{ backgroundColor: !darkMode && c.lm.c1 }}>
			<UnitSelect />
			<ForecastCards />
			<Highlights />
			<Footer />
		</div>
	);
};

export default Main;
