import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

const Spinner = () => {
	const override = css`
		display: block;
		margin: 30% auto;
		border-color: red;
	`;

	return (
		<>
			<FadeLoader color={"#6e707a"} css={override} size={50} />
		</>
	);
};

export default Spinner;
