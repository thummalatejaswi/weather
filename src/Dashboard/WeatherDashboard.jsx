import React, { useState } from "react";
import WeatherResults from "../WeatherResults/WeatherResults";
import "./WeatherDashboard.css"; // Import the CSS file
import { UseWeather } from "../hooks/UseWeather";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import "../styles/global.css";
import "../styles/variables.scss";
import "../styles/utility.scss";
// import FutureWeatherData from "../FutureWeatherData/FutureWeatherData";

function UserInput({ input, onSearch, onChange, onTabChange, OnToggleChange, showFahren, activeTab}) {
  return (
    <>
      <div className="flex justify-end w-95">
        <label class="toggle-switch">
          <input onClick={()=>OnToggleChange(!showFahren)} type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
      <div>
        <div class="tabs" className="flex flex-row-reverse gap-lg">
          <div className={`tab ${activeTab === 'current'? 'active': ''}`} onClick={() => onTabChange('current')}>Today</div>
          <div className={`tab ${activeTab === 'future'? 'active': ''}`} onClick={() => onTabChange('future')} >14-Day Forecast</div>
        </div>

      </div>
      <div className="search-container">
        <input className="border-radius-xxl"
          type="text"
          value={input}
          onChange={onChange} // Use the correct prop name
          placeholder="Enter city..."
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </>

  );
}

function App() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState('current');
  const { results, hourlyResults, iconResponse, loading, error, fetchWeather } = UseWeather();
  const [showFahren, setShowFahren] = useState(true);
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(input); // Call fetchWeather with the input
  };

  const handleFutureWeatherData = (tab) => {
    setActiveTab(tab);
  }

  const handleToggleChange = (Boolean) => {
    setShowFahren(!showFahren);
  }

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div className="weather-app">
      <UserInput input={input} onChange={handleInputChange} onSearch={handleSearch} onTabChange={handleFutureWeatherData} OnToggleChange={handleToggleChange} showFahren={showFahren} activeTab={activeTab}/>
      <div>
        {loading && <p>LOADING ...</p>}
        {error && <p>{error}</p>} {/* Display error directly */}
        {!results && !loading && !error && <p>There are no results</p>} {/* Only show when no results and no errors */}
      </div>
      {results && (
        <div>
          {activeTab === 'current' ? <WeatherResults results={results} hourlyResults={hourlyResults}  showFahren={showFahren}/> : null}
          {activeTab === 'future' ? <WeatherForecast results={results} hourlyResults={hourlyResults} showFahren={showFahren} /> : null}
          {/* {activeTab === 'future' ? <FutureWeatherData hourlyResults={hourlyResults}/> : null} */}
        </div>

      )}
    </div>
  );
}

export default App;



// import React, { Component } from "react";
// import WeatherResults from "../WeatherResults/WeatherResults";
// import "./WeatherDashboard.css"; // Import the CSS file
// import  UseWeather  from "../hooks/UseWeather";
// import WeatherForecast from "../WeatherForecast/WeatherForecast";
// import "../styles/global.css";
// import "../styles/variables.scss";
// import "../styles/utility.scss";
// import {fetchWeather} from "../hooks/UseWeather";
// // import FutureWeatherData from "../FutureWeatherData/FutureWeatherData";


// class WeatherDashboard extends Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//           input: "",
//           activeTab: "current",
//           showFahren: true,
//           results: null,
//           hourlyResults: null,
//           loading: false,
//           error: null,
//       };
//   }

//   handleSearch = async (e) => {
//       e.preventDefault();
//       const weatherData = await fetchWeather(this.state.input);
//       this.setState({
//           results: weatherData.results,
//           hourlyResults: weatherData.hourlyResults,
//           loading: weatherData.loading,
//           error: weatherData.error,
//       });
//   };

//   handleInputChange = (event) => {
//       this.setState({ input: event.target.value });
//   };

//   handleFutureWeatherData = (tab) => {
//       this.setState({ activeTab: tab });
//   };

//   handleToggleChange = (value) => {
//       this.setState({ showFahren: value });
//   };

//   render() {
//       const { input, activeTab, showFahren, results, hourlyResults, loading, error } = this.state;

//       return (
//           <div className="weather-app">
//               <UserInput
//                   input={input}
//                   onChange={this.handleInputChange}
//                   onSearch={this.handleSearch}
//                   onTabChange={this.handleFutureWeatherData}
//                   OnToggleChange={this.handleToggleChange}
//                   showFahren={showFahren}
//               />
//               <div>
//                   {loading && <p>LOADING ...</p>}
//                   {error && <p>{error}</p>}
//                   {!results && !loading && !error && <p>There are no results</p>}
//               </div>
//               {results && (
//                   <div>
//                       {activeTab === 'current' ? (
//                           <WeatherResults results={results} hourlyResults={hourlyResults} showFahren={showFahren} />
//                       ) : (
//                           <WeatherForecast hourlyResults={hourlyResults} showFahren={showFahren} />
//                       )}
//                   </div>
//               )}
//           </div>
//       );
//   }
// }

// export default WeatherDashboard;