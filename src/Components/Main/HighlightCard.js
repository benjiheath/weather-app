import { MdNavigation } from "react-icons/md";

const HighlightCard = ({ className, title, value, unit, footerText, footerIcon, footerBar }) => {
	return (
		<div className={className}>
			<p>{title}</p>
			<div className="value-and-unit flex-row-between">
				<span>{value}</span>
				<p>{unit}</p>
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
				<p>{footerText}</p>
			</div>
		</div>
	);
};

export default HighlightCard;
