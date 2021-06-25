import { MdNavigation } from "react-icons/md";

const HighlightCard = ({
  windDirection,
  weatherData,
  className,
  title,
  value,
  unit,
  footerText,
  footerIcon,
  footerBar,
}) => {
  const determineNavIconDirection = () => {
    switch (windDirection) {
      case "N":
        return "rotate(0deg)";
      case "E":
        return "rotate(90deg)";
      case "S":
        return "rotate(180deg)";
      case "W":
        return "rotate(-90deg)";
      case "WSW":
      case "SW":
      case "SSW":
        return "rotate(-135deg)";
      case "NNW":
      case "NW":
      case "WNW":
        return "rotate(-45deg)";
      case "NNE":
      case "NE":
      case "ENE":
        return "rotate(45deg)";
      case "ESE":
      case "SE":
      case "SSE":
        return "rotate(135deg)";
      default:
        return null;
    }
  };

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
      <div className={footerIcon ? "flex-row-between highlight-footer" : "flex-row-between"}>
        {footerIcon && (
          <label className="lbl-circle lbl-dir flex-center">
            <MdNavigation
              className="dir-icon"
              style={{
                transform: determineNavIconDirection(),
              }}
            />
          </label>
        )}
        <p>{footerText}</p>
      </div>
    </div>
  );
};

export default HighlightCard;
