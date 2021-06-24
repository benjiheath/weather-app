import { useContext, useState } from "react";
import { LeftWindowContext } from "./LeftWindowContext";
import SearchResult from "./SearchResult";
import Spinner from "../Spinner";
import { CgClose } from "react-icons/cg";
import { UserLocationContext } from "../UserLocationContext";
import axios from "axios";

const Search = () => {
	const { setShowSearch, setNewLocation } = useContext(LeftWindowContext);
	const [searchInput, setSearchInput] = useState("");
	const [resultsLoading, setResultsLoading] = useState(false);
	const [isNullResults, setIsNullResults] = useState(false);
	const [fieldIsEmpty, setFieldIsEmpty] = useState(false);
	const [searchResults, setSearchResults] = useState(null);

	// fetch search results
	const getSearchResponse = async () => {
		// if field empty, exit fn & alert user
		if (!searchInput) {
			setFieldIsEmpty(true);
			return;
		}

		try {
			setResultsLoading(true);
			setSearchResults(null);

			const response = await axios.get(
				`https://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/search/?query=${searchInput}`
			);

			setSearchInput("");

			// if no results are returned, exit fn & alert user
			if (!response.data[0]) {
				setIsNullResults(true);
			}
			// if results, push to state so they can be displayed
			setSearchResults(response.data);
			setResultsLoading(false);
		} catch (error) {
			console.error("Search response error:", error);
			console.log("Error response:", error.response);
			setResultsLoading(false);
		}
	};

	return (
		<div className="summary search-window">
			<div className="close-wrapper row-80">
				<CgClose
					className="close-icon"
					onClick={() => setShowSearch(false)}
				/>
			</div>
			<div className="search-input-btn-wrapper flex-row-between row-80">
				<input
					type="text"
					placeholder="search location"
					value={searchInput}
					onChange={(e) => {
						setFieldIsEmpty(false);
						setSearchInput(e.target.value);
					}}
					className={fieldIsEmpty ? "empty-input" : ""}
				></input>
				<button className="btn-search" onClick={getSearchResponse}>
					Search
				</button>
			</div>
			<div className="search-results-wrapper row-80">
				{resultsLoading && <Spinner />}
				{isNullResults && <p>No locations match your query.</p>}
				{fieldIsEmpty && <p>Please enter a search term</p>}
				{searchResults &&
					searchResults.map((result, idx) => (
						<SearchResult
							key={idx}
							name={result.title}
							onClick={() =>
								setNewLocation(result.woeid)
							}
						/>
					))}
			</div>
		</div>
	);
};

export default Search;
