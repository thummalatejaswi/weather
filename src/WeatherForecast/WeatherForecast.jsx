import React, { useState } from "react";
import "../Dashboard/WeatherDashboard.css"
// import { useEffect } from "react";
// import "./WeatherResults.css"; // Import the CSS file
import "../styles/global.css";
// import WeatherResults from "../WeatherResults/WeatherResults";
import "../styles/variables.scss";
import "../styles/utility.scss";
import "../WeatherForecast/WeatherForecast.css";
import { convertFtoC } from "../WeatherResults/WeatherResults";
import uvImage from '../assets/uv.png';
import windImage from '../assets/wind.png';

// import WeatherResults from "../Dashboard/WeatherDashboard";


const WeatherForecast = ({results, hourlyResults, showFahren}) => {
    let weekDay;
    const datetimesForDays = hourlyResults?.days;
    let divs = [];
    const convertDateTimeToWeekday = (datetime) => {
        const date = new Date(datetime + 'T00:00:00');
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];   
        let dayIndex = date.getDay();
        return weekDay = weekDays[dayIndex];
    }

       
    if(datetimesForDays) {
        for(let i=0; i<14; i++){
        const datetime = datetimesForDays[i]?.datetime;
        const condition = datetimesForDays[i]?.conditions;
        const max = datetimesForDays[i]?.tempmax;
        const min = datetimesForDays[i]?.tempmin;
        weekDay = convertDateTimeToWeekday(datetime);
        divs.push(
            <div class="column daily-weather border-bottom-white gap-lg w-100" key={i}>
                    <p>{weekDay}</p>
                    {/* <p>{temp}</p> */}
                    {!showFahren ? <p>{(max)} °F/ {min} °F</p> : <p>{convertFtoC(max)} °C/ {convertFtoC(min)} °C</p> }
                    <p>{condition}</p>
                    <div class="flex gap-lg">
                        <img src={uvImage} alt=""/>
                        <p class="mt-0">{datetimesForDays[i].uvindex}</p>
                    </div>
                    <div class="flex gap-lg">
                    <img src={windImage} alt=""/>
                    <p className="mt-0">{datetimesForDays[i].windspeed}</p>
                    </div>
                    
                   
            </div>
        );
    }
    }

    return (
        <>
            <div class=" card justify-center row" className="card">
                {divs}
            </div>
        </>
    );

}

// class WeatherForecast extends Component {
//     convertDateTimeToWeekday(datetime) {
//         const date = new Date(datetime + 'T00:00:00');
//         const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         let dayIndex = date.getDay();
//         return weekDays[dayIndex];
//     }

//     render() {
//         const { results, hourlyResults, showFahren } = this.props;
//         const datetimesForDays = hourlyResults?.days;
//         let divs = [];

//         if (datetimesForDays) {
//             for (let i = 0; i < 14; i++) {
//                 const datetime = datetimesForDays[i]?.datetime;
//                 const condition = datetimesForDays[i]?.conditions;
//                 const max = datetimesForDays[i]?.tempmax;
//                 const min = datetimesForDays[i]?.tempmin;
//                 const weekDay = this.convertDateTimeToWeekday(datetime);

//                 divs.push(
//                     <div className="column daily-weather border-bottom-white gap-lg" key={i}>
//                         <p>{weekDay}</p>
//                         <p>{(max)}/{min}</p>
//                         <p>{condition}</p>
//                         <div className="flex">
//                             <img src="../assets/uv.png" alt="" />
//                             <p>{datetimesForDays[i].uvindex}</p>
//                         </div>
//                         <p>{datetimesForDays[i].windspeed}</p>
//                         {/* Assuming Test1 is another component you want to include */}
//                         {/* <Test1 /> */}
//                     </div>
//                 );
//             }
//         }

//         return (
//             <div className="card row w-70">
//                 {divs}
//             </div>
//         );
//     }
// }

export default WeatherForecast;