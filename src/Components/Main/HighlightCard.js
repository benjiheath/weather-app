import { MdNavigation } from "react-icons/md";
import { useContext } from "react";
import { UserLocationContext } from "../UserLocationContext";

const HighlightCard = ({ className, title, value, unit, footerText, footerIcon, footerBar }) => {
	const { darkMode, c } = useContext(UserLocationContext);

	return (
		<div
			className={className}
			style={{
				backgroundColor: darkMode ? c.dm.c2 : c.lm.c2,
				boxShadow: !darkMode && "0px 0px 10px 1px #c7e9ff",
			}}
		>
			<p style={{ color: !darkMode && c.lm.tc }}>{title}</p>
			<div className="value-and-unit flex-row-between">
				<span style={{ color: !darkMode && c.lm.tc }}>{value}</span>
				<p style={{ color: !darkMode && c.lm.tc }}>{unit}</p>
			</div>
			{footerBar && (
				<div className="bar-wrapper row-80">
					<div className="bar" style={{ width: `${value}%` }}></div>
				</div>
			)}
			<div
				className={
					footerIcon
						? "flex-row-between highlight-footer"
						: "flex-row-between"
				}
			>
				{footerIcon && (
					<label className="lbl-circle lbl-dir flex-center">
						<MdNavigation className="dir-icon" />
					</label>
				)}
				<p style={{ color: !darkMode && c.lm.tc }}>{footerText}</p>
			</div>
		</div>
	);
};

export default HighlightCard;
