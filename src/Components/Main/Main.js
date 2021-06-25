import UnitSelect from "./UnitSelect";
import ForecastCards from "./Forecast";
import Highlights from "./Highlights";
import Footer from "./Footer";

const Main = () => {
  return (
    <div className="main">
      <UnitSelect />
      <ForecastCards />
      <Highlights />
      <Footer />
    </div>
  );
};

export default Main;
