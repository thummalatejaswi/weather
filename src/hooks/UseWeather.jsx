import { useState } from "react";
import axios from "axios";

export const UseWeather = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hourlyResults, setHourlyResults] = useState(null);

  const fetchWeather = async (input) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch current weather data
      const response1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=caf423eea1b73c5d7b4b04ceb8e98b3a`);
      setResults(response1.data); // Set results from the response
      const hourlyData = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=us&key=M4KYF73YL3J4KA6CTWWEC2U7P&contentType=json`);
      setHourlyResults(hourlyData); // Set hourly results
      console.log(hourlyResults);
    } catch (err) {
      setError(err.message); // Set error message from the caught error
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return { results, hourlyResults, loading, error, fetchWeather }; // Return all necessary values test
};