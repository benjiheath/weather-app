import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";
import { CgDarkMode } from "react-icons/cg";

const UnitSelect = () => {
  const { tempUnit, setTempUnit } = useContext(UserLocationContext);

  return (
    <div className="unit-display-wrapper flex-row-between row-80">
      <label className="lbl-circle flex-center lbl-display">
        <CgDarkMode className="dark-mode-icon" />
      </label>

      <div className="unit-select">
        <label
          className={`lbl-circle ${tempUnit === "C" ? `lbl-unit-active` : `lbl-unit-inactive`} flex-center`}
          onClick={() => setTempUnit("C")}
        >
          &deg;C
        </label>
        <label
          className={`lbl-circle ${tempUnit === "F" ? `lbl-unit-active` : `lbl-unit-inactive`} flex-center`}
          onClick={() => setTempUnit("F")}
        >
          &deg;F
        </label>
      </div>
    </div>
  );
};

export default UnitSelect;
