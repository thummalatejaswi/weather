import React, { useState } from "react";
import "../Dashboard/WeatherDashboard.css"
import { useEffect } from "react";
import "./WeatherResults.css"; // Import the CSS file

const WeatherResults = ({ results, hourlyResults }) => {
    const temp = results.main.temp;
    const celsius = (temp - 273.15).toFixed(0);
    const location = results.name;
    const weatherDescription = results.weather[0].description;
    const highest = (parseInt(results.main.temp_min) - 273.15).toFixed(2);
    const lowest = (parseInt(results.main.temp_max) - 273.15).toFixed(2);
    const [hourlyData, setHourlyData] = useState([]);
    let time;
    let hourlyTemp;

    const fetchHourlyWeather = () => {
        const tempData = [];
        hourlyResults?.days?.forEach(day => {
            day.hours.forEach(hour => {
                time = hour.datetime;
                hourlyTemp = hour.temp;
                tempData.push({ time, hourlyTemp });
            });
        });
        setHourlyData(tempData);
    };

    useEffect(() => {
        if (hourlyResults) {
            fetchHourlyWeather(hourlyResults);
        }
    }, [hourlyResults]);


    return (
        <>
            <div className="weather-card">
                <h2>{location}</h2>
                <h1>{celsius}&deg;C</h1>
                <p>{weatherDescription}</p>
                <div className="">
                    <p>H: {highest}</p>
                    <p>L: {lowest}</p>
                </div>
            </div>

            <div className="hourly-card">
                <h3>Hourly Forecast</h3>
                <div className="hourlyWeather">
                    <ul>
                        {hourlyData.map((data, index) => (
                            <li key={index}>
                                Hourly time is {data.time} - Hourly Temp is {data.hourlyTemp}°C
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

}

export default WeatherResults;