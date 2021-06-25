import axios from "axios";
import { useContext, useState } from "react";
import { LeftWindowContext } from "./NavContext";
import SearchResult from "./SearchResult";
import Spinner from "../Spinner";
import { CgClose } from "react-icons/cg";
import { css } from "@emotion/react";

const Search = () => {
	const { setShowSearch, setNewLocation } = useContext(LeftWindowContext);
	const [searchInput, setSearchInput] = useState("");
	const [resultsLoading, setResultsLoading] = useState(false);
	const [isNullResults, setIsNullResults] = useState(false);
	const [fieldIsEmpty, setFieldIsEmpty] = useState(false);
	const [tooManyResults, setTooManyResults] = useState(false);
	const [searchResults, setSearchResults] = useState(null);

	// fetch search results
	const getSearchResponse = async () => {
		// if field empty, exit fn & alert user
		if (!searchInput) {
			setFieldIsEmpty(true);
			setIsNullResults(false);
			return;
		}

		try {
			setResultsLoading(true);
			setSearchResults(null);
			setIsNullResults(false);

			const response = await axios.get(
				`https://cors-anywhere.herokuapp.com/http://www.metaweather.com/api/location/search/?query=${searchInput}`
			);

			setSearchInput("");

			// if no results are returned, exit fn & alert user
			if (!response.data[0]) {
				setIsNullResults(true);
				return;
			}

			// if too many results returned, ask user to make query more specific
			if (response.data.length > 11) {
				setTooManyResults(true);
				setResultsLoading(false);
				return;
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

	// spinner styles
	const override = css`
		display: block;
		margin: 50% auto;
		border-color: red;
	`;

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
						setTooManyResults(false);
						setSearchInput(e.target.value);
					}}
					className={fieldIsEmpty ? "empty-input" : ""}
				></input>
				<button className="btn-search" onClick={getSearchResponse}>
					Search
				</button>
			</div>
			<div className="search-results-wrapper row-80">
				{resultsLoading && <Spinner override={override} />}
				{tooManyResults && (
					<p>
						Too many results - Please search something more
						specific
					</p>
				)}
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
