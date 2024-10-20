import './App.css';
import sun from './assets/clear.png';
import cloud from'./assets/cloud.png';
import drizzle from './assets/drizzle.png';
import wind from './assets/wind.png';
import humid from './assets/humid.png';
import rain from './assets/rain.png';
import snow from './assets/snow.png';
import search from './assets/search.png';
import { useEffect, useState } from 'react';

const WeatherDetails=({icon,temp,city,country,latitude,longitude,humidity,windSpeed})=>{
  return(
  <div className='weather'>
  <div className='image'>
    <img src={icon}/>
  </div>
  <div className='temp'>
    {temp}*C
  </div>
  <div className='location'>
    {city}
  </div>
  <div className='country'>
     {country}
  </div>
  <div className='card'>
    <div><span className='latitude'>Latitude</span><span>{latitude}</span></div>
    <div><span className='longitude'>Longitude</span><span>{longitude}</span></div>


  </div>
  <div className='data-container'>
     <div className='element'>
      <img src={humid} className='icon'/>
      <div className='data'>
        <div className='humid-percent'>{humidity} %</div>
        <div className='text'>Humidity</div>
      </div>
     </div>
     <div className='element'>
      <img src={wind} className='icon'/>
      <div className='data'>
        <div className='humid-percent'>{windSpeed} km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
     </div>
  </div>
  </div>);
}




function App() {
  const [icon,setIcon]=useState();
  const [temp,setTemp]=useState(0);
  const [text,setText]=useState("Madurai");
  const [city,setCity]=useState("Madurai");
  const [country,setCountry]=useState("");
  const [latitude,setLatitude]=useState(0);
  const [longitude,setLongitude]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [windSpeed,setWindSpeed]=useState(0);
  const [error,setError]=useState(null);
  const [citynotfound,setCitynotfound]=useState(false);
  const [loading,setLoading]=useState(false);

  const weathericon={
    "01d":sun,
    "01n":sun,
    "02d":cloud,
    "02n":cloud,
    "03d":drizzle,
    "03n":drizzle,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,  
    "10n":rain,
    "13d":snow,
    "13n":snow,
    






    
  };


  const searchweather=async ()=>{
    setLoading(true);

    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5848a3ec8398675e08e56deb5d0292d0&units=Metric`;

    try{
      let res=await fetch(url);
      let data=await res.json();
      if(data.cod==="404"){
        console.error("City not found");
        setCitynotfound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setText(data.name);
      setCountry(data.sys.country);
      setLatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      const weathericoncode=data.weather[0].icon;
      setIcon(weathericon[weathericoncode] || sun);
      setCitynotfound(false);

    }
    catch(error){
      console.error("An error occured",error.message);
      setError("Error Occured while fetching weather data.");
    }
    finally{
         setLoading(false);
    }
  };

  const handlecity=(e)=>{
    setCity(e.target.value);
  };

  const handlekeydown=(e)=>{
    if(e.key==="Enter"){
      searchweather();
    }
  }
 
  useEffect(function(){
    searchweather();
  },[]);


  return (
    <div className="App">
      <div className='input-decoration'>
        <input type="text" className='cityinput' onChange={handlecity} onKeyDown={handlekeydown} value={city} placeholder='Search City'/>
        <div className='search-icon' onClick={()=>searchweather()}>
          <img src={search} className='search'></img>
        </div>
      </div>
      {loading && <div className='loading-message'>
          Loading....
      </div> } 
      {error && <div className='error-message'>{error}</div>}
      {citynotfound && <div className='city-not'>City Not Found</div>}
      <div>
        
     {!loading && !citynotfound && <WeatherDetails icon={icon} temp={temp} city={text}
       country={country} latitude={latitude} longitude={longitude}
        humidity={humidity} windSpeed={windSpeed}/>}
      </div>
     
      <div className='copyright'>
        <a href='https://yogeeswaran-m.vercel.app/'> Designed by <span>Yogeeswaran M</span></a>
      </div>
    
    </div>
  );
}

export default App;
