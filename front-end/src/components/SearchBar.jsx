import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Fetch search results based on query
  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/search?query=${query}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Debugging log

      if (data.isSuccessful) {
        setResults(
          data.data.students.concat(data.data.courses, data.data.classes)
        );
        console.log("Results state updated:", data.data); // Debugging log
      } else {
        console.error("Search failed: ", data.message);
        setResults([]); // Clear results on failure
      }
    } catch (error) {
      console.error("Error in search request: ", error);
      setResults([]); // Clear results on error
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(query);
  };

  // Handle input change
  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    fetchSearchResults(newQuery); // Directly call fetchSearchResults here
  };

  // Handle result click and navigate to the result's path
  const handleResultClick = (result) => {
    const resultType = result.type || "unknown"; // Determine the type, default to "unknown"
    navigate(`/${resultType}/${result.id}/details`); // Navigate to the path based on type and ID
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the element
    if (ref.current && !ref.current.contains(event.target)) {
      setResults("");
    }
  };
  useEffect(() => {
    // Add event listener to detect clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-[25vh] md:h-[20vh] min-[1920px]:h-[20vh] flex flex-col items-center z-40 xxl:mt-6 mb-4">
      <form
        className="sm:w-[400px] md:w-[440px] relative top-[70%] min-[768px]:top-[45%] min-[1920px]:top-[40%] flex items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full p-4 rounded-full bg-white border border-[#628281] text-black focus:outline-none focus:border-[#43655a]"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-[#628281] text-white rounded-full hover:bg-[#43655a] focus:outline-none"
        >
          Search
        </button>
      </form>
      {/* Search Results */}
      {results.length > 0 && (
        <ul
          ref={ref}
          className="absolute top-[17%] mt-2 w-full sm:w-[400px] md:w-[440px] bg-white border border-gray-300 rounded-lg shadow-lg z-50"
        >
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleResultClick(result)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {result.title || result.name || "No Title or Name"}{" "}
              {/* Display title for courses, name for students */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
