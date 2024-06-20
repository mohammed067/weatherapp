import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '94f129892a1969884db8597ac5aee1f7'; 

const WeeklyForecast = ({ city, userType }) => {
  const [weeklyForecast, setWeeklyForecast] = useState([]);

  useEffect(() => {
    fetchWeeklyForecast(city);
  }, [city]);

  const fetchWeeklyForecast = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const dailyData = parseDailyForecast(response.data.list);
      setWeeklyForecast(dailyData);
    } catch (error) {
      console.error('Error fetching weekly forecast', error);
    }
  };

  const parseDailyForecast = (forecastList) => {
    const dailyData = [];
    let currentDate = null;

    forecastList.forEach(item => {
      const date = item.dt_txt.split(' ')[0]; 
      if (date !== currentDate) {
        const { dt_txt, main, weather, wind } = item;
        dailyData.push({
          date: dt_txt,
          temperature: main.temp.toFixed(1),
          weather: weather[0].description,
          windSpeed: wind.speed.toFixed(1),
        });
        currentDate = date;
      }
    });

    return dailyData;
  };

  const activitySuggestion = (temperature, weatherMain) => {
    if (userType === 'traveler') {
      return temperature > 20 ? 'Great day for sightseeing!' : 'Pack a warm coat!';
    } else if (userType === 'event-planner') {
      return temperature > 20 ? 'Perfect for an outdoor event!' : 'Consider indoor options.';
    } else if (userType === 'farmer') {
      return weatherMain === 'Rain' ? 'Ideal for planting!' : 'Irrigation might be needed.';
    }
  };

  return (
    <div className="mt-8 font-gilroy bg-[#202B3B] rounded-md p-[2rem] ">
      <h2 className="text-2xl font-semibold mb-4 text-[#9399A2] ">Weekly Forecast</h2>
      {weeklyForecast.map((day, index) => (
        <div key={index} className="mb-4 p-4 rounded-lg border-b shadow-sm gap-6 bg-[#202B3B] grid grid-cols-6">
          <p className="font-semibold text-white text-[1rem] col-span-2">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          <p className="text-[#9399A2] col-span-2">{day.weather}</p>
          <p className="mt-1 text-[#9399A2] col-span-2">{day.temperature} °C</p>
        
          <p className="text-[#9399A2] col-span-4 font-bold min-w-max text-[1.3rem] mt-2">{activitySuggestion(day.temperature, day.weather)}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
