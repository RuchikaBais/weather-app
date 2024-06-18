import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import sunny from '../assets/sunny.png'
import cloudy from '../assets/cloudy.png'
import rainy from '../assets/rainy.png'
import snowy from '../assets/snowy.png'
import loadingImg from '../assets/loading.gif'


const WeatherApp = () => {

    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const api_key = '88ed97e19bcc2cde6a7300095abba1bf';


    useEffect(() => {
        const fetchDefaultWeather = async () => {
            // setLoading(true);
            const defaultLocation = 'Delhi'
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const defaultData = await response.json();
            console.log(defaultData);
            setData(defaultData);
            setLoading(false);
            setLocation('');
        }
        fetchDefaultWeather();
    }, []);

    const search = async () => {
        if (location.trim() !== '') {
            setLoading(true);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const searchData = await response.json();
            if (searchData.cod !== 200) {
                setData({ notFound: true })
            } else {
                setData(searchData);
                setLocation('');
            }
            console.log(searchData);
            setLoading(false);
        }
        else {
            alert('Enter location first');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
        Thunderstorm: rainy,
    }
    const weatherImage = data?.weather ? weatherImages[data?.weather[0]?.main] : null;

    const backgroundImages = {
        Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
        Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
        Snow: 'linear-gradient(to right, #aff2ff, #fff)',
        Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
    }
    const backgroundImage = data?.weather ? backgroundImages[data?.weather[0]?.main] : 'linear-gradient(to right, #f3b07c, #fcd283)';

    const currentDate = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = daysOfWeek[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();

    const formattedDate = `${day}, ${dayOfMonth} ${month}`;

    return (
        <div className='container' style={{ backgroundImage }}>
            <div className="weather-app" style={{ backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace("to right", "to top") : null }}>
                <div className="search">
                    <div className="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data?.name ? data?.name : 'City'}, {data?.sys ? data?.sys?.country : 'Country'}</div>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder='Enter Location..'
                            value={location}
                            onChange={(e) => { setLocation(e.target.value) }}
                            onKeyDown={handleKeyDown}
                        />
                        <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                    </div>
                </div>
                {loading ? (<img className='loader' src={loadingImg} alt='loading' />) : data?.notFound ? (<div className='not-found'>City not Found 🙊</div>) : (

                    <>
                        <div className="weather">
                            <img src={weatherImage} alt="Image" />
                            <div className="weather-type">{data?.weather ? data?.weather[0]?.main : 'None'}</div>
                            <div className="temp">{data.main ? `${Math.floor(data?.main?.temp)}°C` : '0°C'}</div>
                        </div>
                        <div className="weather-date">
                            <p>{formattedDate}</p>
                        </div>
                        <div className="weather-data">
                            <div className="humidity">
                                <div className="data-name">Humidity</div>
                                <i className="fa-solid fa-droplet"></i>
                                <div className="data">{data?.main ? data?.main.humidity : '0'}%</div>
                            </div>
                            <div className="wind">
                                <div className="data-name">Wind</div>
                                <i className="fa-solid fa-wind"></i>
                                <div className="data">{data?.wind ? data?.wind?.speed : '0'} km/h</div>
                            </div>
                        </div>
                    </>

                )}

            </div>
            
         </div>
    )
}

export default WeatherApp