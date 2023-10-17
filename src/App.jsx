import React, { useState, useEffect } from 'react';
import cx from 'classnames';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOnLoad, setIsOnload] = useState(true);
    const [queryReq, setQueryReq] = useState('');
    const [queryRes, setQueryRes] = useState([]);
    const [location, setLocation] = useState({});
    const [forecast, setForecast] = useState({});

    async function getLocalGeocodings(queryReq) {
        const req = queryReq.replace(/\s/g, '+');
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${req}&count=10&language=pt&format=json`;
        const res = await fetch(url);
        const obj = await res.json();

        setQueryRes(obj.results);
    }

    async function getWeatherForecast(latitude = '-32.035', longitude = '-52.0986') {
        setIsOnload(true);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,weathercode,windspeed_10m&hourly=temperature_2m,precipitation_probability,weathercode,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`;
        const res = await fetch(url);
        const obj = await res.json();
        setForecast(obj);

        setIsOnload(false);
    }

    useEffect(() => {
        getLocalGeocodings(queryReq);
    }, [queryReq]);

    useEffect(() => {
        getWeatherForecast(location[0], location[1]);
    }, [location]);

    return (
        <div className={cx('font-["Open_Sans"]', { 'dark': darkMode })}>
            {/* <button onClick={() => setDarkMode(!darkMode)}>Set dark mode</button> */}
            <input type="search" onChange={(e) => setQueryReq(e.target.value)} />
            {queryRes ? queryRes.map(city => (
                <button onClick={() => setLocation([city.latitude, city.longitude])} className="block p-1 border border-black">{city.name}</button>
            )) : null}
            {isOnLoad ? 'Carregando...' : <p>{forecast.current.temperature_2m}</p>}
        </div>
    );
}

export default App;
