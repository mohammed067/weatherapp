import React from 'react';

function UserSelector({ setUserType }) {
  return (
    <div className=" ">
      <label className="text-[#9399A2] ">
        Select User Type:
        <select 
          onChange={(e) => setUserType(e.target.value)} 
          className="rounded-md bg-[#202B3B] ml-2 py-2 px-2"
        >
          <option value="traveler">Traveler</option>
          <option value="event-planner">Event Planner</option>
          <option value="farmer">Farmer</option>
        </select>
      </label>
    </div>
  );
}

export default UserSelector;
