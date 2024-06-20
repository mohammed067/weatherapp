import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import PersonalStory from './components/PersonalStory';
import WeeklyForecast from './components/WeeklyForecast';
import UserSelector from './components/UserSelecter';
import TodayHighlights from './components/TodayHighlights';
import "../src/fonts/transfonter/stylesheet.css"
import "../src/fonts/circular/stylesheet.css"

const API_KEY = '94f129892a1969884db8597ac5aee1f7'; 
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [userType, setUserType] = useState('traveler');
  const [cityInfo, setCityInfo] = useState('');

  useEffect(() => {
    if (city.trim() !== '') {
      fetchWeatherData(city);
      fetchCityInfo(city);
    }
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
      setWeatherData(null); 
    }
  };

  const fetchCityInfo = async (city) => {
    try {
      const response = await axios.get(WIKIPEDIA_API_URL, {
        params: {
          action: 'query',
          format: 'json',
          prop: 'extracts',
          exchars: 300,
          explaintext: true,
          titles: city,
          origin: '*',
        },
      });

      const pages = response.data.query.pages;
      const pageId = Object.keys(pages)[0];
      const title = pages[pageId].title; 
      const extract = pages[pageId].extract;

      if (title.toLowerCase() === city.toLowerCase()) {
        if (extract) {
          setCityInfo(extract);
        } else {
          setCityInfo('Information not available.');
        }
      } else {
        setCityInfo('Information not available.');
      }
    } catch (error) {
      console.error('Error fetching city information', error);
      setCityInfo('Information not available.');
    }
  };

  return (
    <div className='flex justify-center bg-[#0B131E]  font-gilroy'>
      <div className='2xl:max-w-[1600px]'>
      <div className="px-[1rem] md:px-[4rem] py-[2rem] bg-[#0B131E]">
      <h1 className="text-4xl font-bold mb-10 text-[#DDE0E4]  ">Weather Dashboard</h1>
     
      <div className='lg:grid grid-cols-8 gap-5'>
        <div className='col-span-5'>
          <UserSelector setUserType={setUserType} />
          <input 
            type="text" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter city" 
            className="p-2 text-[#9399A2] rounded-lg shadow-sm focus:ring mt-4 bg-[#202B3B] focus:ring-blue-300 w-full mb-6"
          />
          <PersonalStory/>
          {weatherData && (
            <WeatherCard data={weatherData} userType={userType} />
          )}
           <TodayHighlights data={weatherData} />
          <div className="mt-4 bg-[#202B3B] p-[2rem] rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-[#9399A2]">About {city}</h2>
            <p className='text-[#9399A2]'>{cityInfo}</p>
          </div>
         
        </div>

        <div className='col-span-3'>
          <WeeklyForecast city={city} userType={userType} />
        </div>
      </div>
    </div>
      </div>
      
    </div>
   
  );
}

export default App;
