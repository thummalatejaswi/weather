import React, { useState } from "react";
import "../Dashboard/WeatherDashboard.css"
import { useEffect } from "react";
import "./WeatherResults.css"; // Import the CSS file
import "../styles/global.css";
import "../styles/variables.scss";
import "../styles/utility.scss";
// import App from "../Dashboard/WeatherDashboard";
// import WeatherDashboard from "../Dashboard/WeatherDashboard";
// import clearDay from "./assets/clear-day.png";

export const convertFtoC = (temp) => {
    return ((temp - 32) * 5 / 9).toFixed(0);
}

const WeatherResults = ({ results, hourlyResults, showFahren}) => {
    const [temp, setTemp] = useState([]);
    const celsius = ((temp - 32) * 5 / 9).toFixed(0);
    const location = results.name;
    const [weatherDescription, setWeatherDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    let hourlyImageUrl;
    const [highest, setHighest] = useState([]);
    // (parseInt(results.main.temp_min) - 273.15).toFixed(2);
    const [lowest, setLowest] = useState([]);
    // (parseInt(results.main.temp_max) - 273.15).toFixed(2);
    const [hourlyData, setHourlyData] = useState([]);
    const [hourlytempInF, setHourlytempInF] = useState([]);
    let currentHours = new Date().getHours();
    const [currentUVIndex, setCurrentUVIndex] = useState([]);
    let time;
    let hourlyTemp;
    const sunrise = hourlyResults?.days[0].sunrise;
    const sunset = hourlyResults?.days[0].sunset;
    const windSpeed = hourlyResults?.days[0].windspeed;
    const precipitation = hourlyResults?.days[0].precip;
    const humidity = hourlyResults?.days[0].humidity;
    const images = {
        "clear-day": require('../assets/clear-day.png'),
        "clear-night": require('../assets/clear-night.png'),
        "cloudy": require('../assets/cloudy.png'),
        "fog": require('../assets/fog.png'),
        "hail": require('../assets/hail.png'),
        "partly-cloudy-day": require('../assets/partly-cloudy-day.png'),
        "partly-cloudy-night": require('../assets/partly-cloudy-night.png'),
        "rain-snow-showers-day": require('../assets/rain-snow-showers-day.png'),
        "rain-snow-showers-night": require('../assets/rain-snow-showers-night.png'),
        "rain": require('../assets/rain.png'),
        "showers-day": require('../assets/showers-day.png'),
        "showers-night": require('../assets/showers-night.png'),
        "sleet": require('../assets/sleet.png'),
        "snow-showers-day": require('../assets/snow-showers-day.png'),
        "snow-showers-night": require('../assets/snow-showers-night.png'),
        "snow": require('../assets/snow.png'),
        "thunder-rain": require('../assets/thunder-rain.png'),
        "thunder-showers-day": require('../assets/thunder-showers-day.png'),
        "thunder-showers-night": require('../assets/thunder-showers-night.png'),
        "thunder": require('../assets/thunder.png'),
        "wind": require('../assets/wind.png')
    };

    

    const getPngFileName = (name) => {
        return images[name] ? images[name] : null;
    }

    const fetchHourlyWeather = () => {
        const tempData = [];
        const hours = hourlyResults?.days[0]?.hours;
        const index = hours.findIndex(hour => {
            time = hour.datetime;
            const [hourPart] = time.split(':');
            currentHours = currentHours > 12 ? currentHours : currentHours.toString().padStart(2, '0');
            return hourPart === currentHours.toString();

        });
        if (index !== -1) {
            setCurrentUVIndex(hourlyResults?.days[0].hours[index].uvindex);
            setWeatherDescription(convertToCamelCase(hourlyResults?.days[0].hours[index].conditions));
            setHighest(hourlyResults?.days[0].tempmax);
            setLowest(hourlyResults?.days[0].tempmin);
            let iconName = (hourlyResults?.days[0].hours[index].icon).toLowerCase();
            const baseUrl = getPngFileName(iconName);
            setImageUrl(baseUrl);
            console.log('imageUrl', imageUrl);
            for (let i = index; i < hours.length && tempData.length < 25; i++) {
                time = convertTo12HourFormat(hours[i].datetime);
                console.log(time);
                setHourlytempInF(hours[i].temp);
                console.log(hourlytempInF);
                setTemp(hourlyResults?.days[0].hours[index].temp);
                let hourlyIconName = (hours[i].icon).toLowerCase();
                const hourlyConditions = convertToCamelCase(hours[i].conditions);
                console.log('hourlyIconName', hourlyIconName);
                let baseHourlyUrl = getPngFileName(hourlyIconName);
                console.log('hourlyimageurl, hourlyIconName', hourlyImageUrl, hourlyIconName);
                hourlyTemp = convertFtoC(hours[i].temp);
                tempData.push({ time, hourlyTemp, hourlytempInF: hours[i].temp, hourlyImageUrl: baseHourlyUrl, hourlyConditions: hourlyConditions });
            }
            if (tempData.length < 25) {
                const secondhours = hourlyResults?.days[1]?.hours;
                for (let i = 0; i < secondhours.length && tempData.length < 25; i++) {
                    time = convertTo12HourFormat(secondhours[i].datetime);
                    setHourlytempInF(secondhours[i].temp);
                    let hourlyIconName = (secondhours[i].icon).toLowerCase();
                    console.log('hourlyIconName', hourlyIconName);
                    let baseHourlyUrl = getPngFileName(hourlyIconName);
                    console.log('hourlyimageurl, hourlyIconName', hourlyImageUrl, hourlyIconName);
                    hourlyTemp = convertFtoC(secondhours[i].temp);
                    tempData.push({ time, hourlyTemp, hourlyImageUrl: baseHourlyUrl });
                }
            }
            setHourlyData(tempData);
            console.log('final HourlyData', hourlyData);
        }
    };

    const convertTo12HourFormat = (time) => {
        const [hours, minutes, seconds] = time.split(':');
        const hoursIn12Format = (hours % 12) || 12; // Convert 0 to 12 for midnight
        const ampm = hours < 12 ? 'AM' : 'PM'; // Check the original hours for am/pm
        return time = hours ? `${hoursIn12Format}:${minutes} ${ampm}` : 'null';
    };

    function convertToCamelCase(str) {
        return str
            .toUpperCase()
            .split('')
            .map((word, index) => index === 0 ? word : word.charAt(0).toLowerCase() + word.slice(1))
            .join('');
    };

    useEffect(() => {
        if (hourlyResults && hourlyResults.days && hourlyResults.days.length) {
            fetchHourlyWeather(hourlyResults);
        }
    }, [hourlyResults]);

    return (
        <>
            <div className="card m-left m-right m-top">
                <h2>{location}</h2>
                {showFahren?<h2>{celsius} &deg;C</h2>: null}
                {!showFahren? <h2>{temp} &deg;F</h2>: null}
                <img src={imageUrl} alt='' />
                <p>{weatherDescription}</p>
                <div className="flex justify-centre gap-lg">
                    {!showFahren ? <p>H: {highest} &deg;F</p>: <p>H: {convertFtoC(highest)} &deg;C</p> }
                    {!showFahren ? <p>L: {lowest} &deg;F</p>: <p>L: {convertFtoC(lowest)} &deg;C</p>}


                </div>
            </div>

            <div>
                <ul className="flex list-none overflow-x gap-lg scroll">
                    {hourlyData.map((data, index) => (
                        <div key={index}>
                            <li className="flex-column">
                                <p className="w-max-content">{data.time}</p>
                                <img className="ml-normal" src={data.hourlyImageUrl} />
                                {/* <p className="font-sm font-wt-smd">{data.hourlyConditions}</p> */}
                                {!showFahren? <p> {hourlytempInF}°F</p>: <p> {data.hourlyTemp}°C</p>}   
                            </li>
                        </div>

                    ))}
                </ul>
            </div>

            <div className="grid grid-template-columns m-right m-left gap-lg w-50">
                <div className="card">
                    <p>UV index</p>
                    <p>{currentUVIndex}</p>
                </div>
                <div className="card">
                    <p>SUNRISE</p>
                    <p>{sunrise} AM</p>
                </div>
                <div className="card">
                    <p>SUNSET</p>
                    <p>{sunset} PM</p>
                </div>
                <div className="card">
                    <p>HUMIDITY</p>
                    <p>{humidity}</p>
                </div>
                <div className="card">
                    <p>PRECIPITATION</p>
                    <p>{precipitation}</p>
                </div>
                <div className="card">
                    <p>WIND</p>
                    <p>{windSpeed}</p>
                </div>
            </div>


        </>
    );

}

// class WeatherResults extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             temp: [],
//             weatherDescription: '',
//             imageUrl: '',
//             highest: [],
//             lowest: [],
//             hourlyData: [],
//             hourlytempInF: [],
//             currentUVIndex: [],
//         };
//     }

//     images = {
//         "clear-day": require('../assets/clear-day.png'),
//         "clear-night": require('../assets/clear-night.png'),
//         "cloudy": require('../assets/cloudy.png'),
//         "fog": require('../assets/fog.png'),
//         "hail": require('../assets/hail.png'),
//         "partly-cloudy-day": require('../assets/partly-cloudy-day.png'),
//         "partly-cloudy-night": require('../assets/partly-cloudy-night.png'),
//         "rain-snow-showers-day": require('../assets/rain-snow-showers-day.png'),
//         "rain-snow-showers-night": require('../assets/rain-snow-showers-night.png'),
//         "rain": require('../assets/rain.png'),
//         "showers-day": require('../assets/showers-day.png'),
//         "showers-night": require('../assets/showers-night.png'),
//         "sleet": require('../assets/sleet.png'),
//         "snow-showers-day": require('../assets/snow-showers-day.png'),
//         "snow-showers-night": require('../assets/snow-showers-night.png'),
//         "snow": require('../assets/snow.png'),
//         "thunder-rain": require('../assets/thunder-rain.png'),
//         "thunder-showers-day": require('../assets/thunder-showers-day.png'),
//         "thunder-showers-night": require('../assets/thunder-showers-night.png'),
//         "thunder": require('../assets/thunder.png'),
//         "wind": require('../assets/wind.png')
//     };

//     convertFtoC(temp) {
//         return ((temp - 32) * 5 / 9).toFixed(0);
//     }

//     getPngFileName(name) {
//         return this.images[name] ? this.images[name] : null;
//     }

//     fetchHourlyWeather() {
//         const tempData = [];
//         const { hourlyResults } = this.props;
//         const hours = hourlyResults?.days[0]?.hours;
//         const currentHours = new Date().getHours();
//         const index = hours.findIndex(hour => {
//             const time = hour.datetime;
//             const [hourPart] = time.split(':');
//             return hourPart === currentHours.toString().padStart(2, '0');
//         });

//         if (index !== -1) {
//             const currentHourData = hourlyResults.days[0].hours[index];
//             this.setState({
//                 currentUVIndex: currentHourData.uvindex,
//                 weatherDescription: this.convertToCamelCase(currentHourData.conditions),
//                 highest: hourlyResults.days[0].tempmax,
//                 lowest: hourlyResults.days[0].tempmin,
//                 imageUrl: this.getPngFileName(currentHourData.icon.toLowerCase()),
//             });

//             for (let i = index; i < hours.length && tempData.length < 25; i++) {
//                 const time = this.convertTo12HourFormat(hours[i].datetime);
//                 const hourlyTemp = this.convertFtoC(hours[i].temp);
//                 const hourlyIconName = hours[i].icon.toLowerCase();
//                 const hourlyConditions = this.convertToCamelCase(hours[i].conditions);
//                 const baseHourlyUrl = this.getPngFileName(hourlyIconName);
//                 tempData.push({ time, hourlyTemp, hourlytempInF: hours[i].temp, hourlyImageUrl: baseHourlyUrl, hourlyConditions });
//             }

//             if (tempData.length < 25) {
//                 const secondHours = hourlyResults?.days[1]?.hours;
//                 for (let i = 0; i < secondHours.length && tempData.length < 25; i++) {
//                     const time = this.convertTo12HourFormat(secondHours[i].datetime);
//                     const hourlyTemp = this.convertFtoC(secondHours[i].temp);
//                     const hourlyIconName = secondHours[i].icon.toLowerCase();
//                     const baseHourlyUrl = this.getPngFileName(hourlyIconName);
//                     tempData.push({ time, hourlyTemp, hourlyImageUrl: baseHourlyUrl });
//                 }
//             }
//             this.setState({ hourlyData: tempData });
//         }
//     }

//     convertTo12HourFormat(time) {
//         const [ hours, minutes] = time.split(':');
//         const hoursIn12Format = (hours % 12) || 12; // Convert 0 to 12 for midnight
//         const ampm = hours < 12 ? 'AM' : 'PM'; // Check the original hours for am/pm
//         return `${hoursIn12Format}:${minutes} ${ampm}`;
//     }

//     convertToCamelCase(str) {
//         return str
//             .toUpperCase()
//             .split('')
//             .map((word, index) => index === 0 ? word : word.charAt(0).toLowerCase() + word.slice(1))
//             .join('');
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.hourlyResults !== this.props.hourlyResults) {
//             this.fetchHourlyWeather();
//         }
//     }

//     render() {
//         const { results, showFahren } = this.props;
//         const { temp, weatherDescription, imageUrl, highest, lowest, hourlyData, hourlytempInF, currentUVIndex } = this.state;
//         const location = results.name;

//         return (
//             <>
//                 <div className="card m-left m-right m-top">
//                     <h2>{location}</h2>
//                     {showFahren ? <h2>{this.convertFtoC(temp)} &deg;C</h2> : <h2>{temp} &deg;F</h2>}
//                     <img src={imageUrl} alt={weatherDescription} />
//                     <p>{weatherDescription}</p>
//                     <div className="flex justify-centre gap-lg">
//                         {!showFahren ? <p>H: {highest} &deg;C</p> : <p>H: {this.convertFtoC(highest)} &deg;C</p>}
//                         {!showFahren ? <p>L: {lowest} &deg;C</p> : <p>L: {this.convertFtoC(lowest)} &deg;C</p>}
//                     </div>
//                 </div>

//                 <div>
//                     <ul className="flex list-none overflow-x gap-lg scroll">
//                         {hourlyData.map((data, index) => (
//                             <div key={index}>
//                                 <li className="flex-column">
//                                     <p className="w-max-content">{data.time}</p>
//                                     <img src={data.hourlyImageUrl} alt={data.hourlyConditions} />
//                                     {!showFahren ? <p>{data.hourlytempInF}°F</p> : <p>{data.hourlyTemp}°C</p>}
//                                 </li>
//                             </div>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="grid grid-template-columns m-right m-left gap-lg w-50">
//                     <div className="card">
//                         <p>UV index</p>
//                         <p>{currentUVIndex}</p>
//                     </div>
//                     <div className="card">
//                         <p>SUNRISE</p>
//                         <p>{this.props.hourlyResults?.days[0]?.sunrise} AM</p>
//                     </div>
//                     <div className="card">
//                         <p>SUNSET</p>
//                         <p>{this.props.hourlyResults?.days[0]?.sunset} PM</p>
//                     </div>
//                     <div className="card">
//                         <p>HUMIDITY</p>
//                         <p>{this.props.hourlyResults?.days[0]?.humidity}</p>
//                     </div>
//                     <div className="card">
//                         <p>PRECIPITATION</p>
//                         <p>{this.props.hourlyResults?.days[0]?.precip}</p>
//                     </div>
//                     <div className="card">
//                         <p>WIND</p>
//                         <p>{this.props.hourlyResults?.days[0]?.windspeed}</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

export default WeatherResults;