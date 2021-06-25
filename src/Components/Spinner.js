import FadeLoader from "react-spinners/FadeLoader";

const Spinner = ({ override }) => {
  return (
    <>
      <FadeLoader color={"#6e707a"} css={override} size={50} />
    </>
  );
};

export default Spinner;
