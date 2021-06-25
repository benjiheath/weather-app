import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import { CgDarkMode } from "react-icons/cg";

const UnitSelect = () => {
	const { tempUnit, setTempUnit, darkMode, setDarkMode, c } = useContext(UserLocationContext);

	return (
		<div className="unit-display-wrapper flex-row-between row-80">
			<label
				className="lbl-circle flex-center lbl-display"
				onClick={() => setDarkMode(!darkMode)}
			>
				<CgDarkMode className="dark-mode-icon" />
			</label>

			<div className="unit-select">
				<label
					style={{
						backgroundColor:
							!darkMode &&
							tempUnit === "C" &&
							c.lm.c2,
					}}
					className={`lbl-circle ${
						tempUnit === "C"
							? `lbl-unit-active`
							: `lbl-unit-inactive`
					} flex-center`}
					onClick={() => setTempUnit("C")}
				>
					&deg;C
				</label>
				<label
					style={{
						backgroundColor:
							!darkMode &&
							tempUnit === "C" &&
							c.lm.ic,
					}}
					className={`lbl-circle ${
						tempUnit === "F"
							? `lbl-unit-active`
							: `lbl-unit-inactive`
					} flex-center`}
					onClick={() => setTempUnit("F")}
				>
					&deg;F
				</label>
			</div>
		</div>
	);
};

export default UnitSelect;
