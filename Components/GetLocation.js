import React, { useState } from 'react';
import axios from 'axios';




function GeoLocation() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5d151ff0db8a1a378a98fda0fc978808`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
    axios.get(url).then(res => {
      setData(res.data)
        console.log(res.data)
      })
      setLocation('')
    }
  }
  return (
    <div className="App">
      <div className='search' >
        <input
        value={location} 
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Search location'
        type="text"
        />
        
      </div>
      <div className='container' >
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='latlon'>
          {data.coord ? <p>{data.coord.lat}</p> : null}
          {data.coord ? <p>{data.coord.lon}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default GeoLocation;