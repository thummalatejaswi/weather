import React, { useState } from "react";
import WeatherResults from "../WeatherResults/WeatherResults";
import "./WeatherDashboard.css"; // Import the CSS file
import { UseWeather } from "../hooks/UseWeather";

function UserInput({ input, onSearch, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={onChange} // Use the correct prop name
        placeholder="Enter city..."
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

function App() {
  const [input, setInput] = useState("");
  const { results, hourlyResults, loading, error, fetchWeather } = UseWeather();
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(input); // Call fetchWeather with the input
  };


  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="weather-app">
      <UserInput input={input} onChange={handleInputChange} onSearch={handleSearch} />
      <div>
        {loading && <p>LOADING ...</p>}
        {error && <p>{error}</p>} {/* Display error directly */}
        {!results && !loading && !error && <p>There are no results</p>} {/* Only show when no results and no errors */}
      </div>
      {results && (
        <div>
          <WeatherResults results={results} hourlyResults={hourlyResults.data}/>
        </div>
      )}
    </div>
  );
}

export default App;