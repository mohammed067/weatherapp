import React from 'react';
import Temp from '../icons/temp';
import Wind from '../icons/Wind';

const TodayHighlights = ({ data }) => {
  if (!data || !data.main || !data.wind || !data.weather) {
    return null; 
  }

  const { main, wind, weather } = data;

  return (
    <div className="mt-8 bg-[#202B3B] p-[1rem] rounded-md font-gilroy">
      <h2 className="text-xl font-semibold mb-2 text-[#9399A2] ">Today's Highlights</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg shadow-sm">
          <div className='flex items-center'>
            <Temp />
            <h3 className="text-lg font-semibold mb-2 text-[#9399A2]">Temperature</h3>
          </div>
          <div className="text-[#C2C8D1] pl-[2rem] text-[1.8rem] font-bold">{main.temp} °C</div>
        </div>
        {wind && ( 
          <div className="p-4 rounded-lg shadow-sm">
            <div className='flex items-center gap-2'>
              <Wind />
              <h3 className="text-lg font-semibold mb-2 text-[#9399A2]">Wind</h3>
            </div>
            <p className="text-[#C2C8D1] text-[1.8rem] font-bold">{wind.speed} m/s</p>
          </div>
        )}
        <div className="p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-[#9399A2]">Weather</h3>
          <p className="text-[#9399A2]">{weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlights;
