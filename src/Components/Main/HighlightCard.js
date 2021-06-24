const HighlightCard = ({ className, title, value, unit, footer }) => {
	return (
		<div className={className}>
			<p>{title}</p>
			<div className="value-and-unit flex-row-between">
				<span>{value}</span>
				<p>{unit}</p>
			</div>
			<p>{footer}</p>
		</div>
	);
};

export default HighlightCard;
