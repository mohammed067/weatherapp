import React from 'react';
import sunnyIcon from "../icons/sunny.png";
import fogIcon from "../icons/fog.png";
import rainIcon from "../icons/rain.png";

function WeatherCard({ data, userType }) {
  const { name, main, weather, dt } = data;
  
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date(dt * 1000);
  const currentDay = daysOfWeek[currentDate.getDay()];

  const activitySuggestion = () => {
    if (userType === 'traveler') {
      return main.temp > 20 ? 'Great day for sightseeing!' : 'Pack a warm coat!';
    } else if (userType === 'event-planner') {
      return main.temp > 20 ? 'Perfect for an outdoor event!' : 'Consider indoor options.';
    } else if (userType === 'farmer') {
      return weather[0].main === 'Rain' ? 'Ideal for planting!' : 'Irrigation might be needed.';
    }
  };

  
  let weatherIcon;
  switch (weather[0].main) {
    case 'Clear':
      weatherIcon = sunnyIcon;
      break;
    case 'Clouds':
      weatherIcon = fogIcon;
      break;
    case 'Rain':
      weatherIcon = rainIcon;
      break;
    default:
      weatherIcon = null;
      break;
  }

  return (
    <div className="shadow-md font-gilroy rounded p-6 mb-6 w-full flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-semibold mb-2 text-gray-200">{name}</h2>
        <p className="text-lg mb-2 text-gray-500">{currentDay}</p>
        <p className="text-4xl mb-2 text-gray-200">{main.temp}°C</p>
        <p className="mb-4 text-gray-500">{weather[0].description}</p>
        <p className="font-bold text-[1.8rem] text-gray-500">{activitySuggestion()}</p>
      </div>
      {weatherIcon && (
        <div>
          <img src={weatherIcon} alt="Weather Icon" className="w-24 h-24" />
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
