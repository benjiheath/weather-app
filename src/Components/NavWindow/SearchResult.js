import { MdNavigateNext } from "react-icons/md";

const SearchResult = ({ name, onClick }) => {
	return (
		<div className="search-result flex-row-between" onClick={onClick}>
			<p>{name}</p>
			<MdNavigateNext className="search-result-icon" />
		</div>
	);
};

export default SearchResult;
