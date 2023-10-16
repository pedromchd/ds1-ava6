import React, { useState, useEffect } from 'react';
import cx from 'classnames';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    // const [geoLocation, setGeoLocation] = useState({});
    const [weather, setWeather] = useState({});

    // async function getLocalGeocoding(cidade) {
    //     const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade.split(' ', '+')}&count=10&language=pt&format=json`;
    //     const res = await fetch(url);
    //     const obj = await res.json();

    //     if (obj.results) {

    //     }
    // }

    async function getWeatherForecast(latitude = '-32.035', longitude = '-52.0986') {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,weathercode,windspeed_10m&hourly=temperature_2m,precipitation_probability,weathercode,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`;
        const res = await fetch(url);
        const obj = await res.json();

        setWeather(obj);
    }

    useEffect(() => {
        getWeatherForecast();
    }, [darkMode]);

    return (
        <div className={cx('font-["Open_Sans"]', { 'dark': darkMode })}>
            <button onClick={() => setDarkMode(!darkMode)}>Set dark mode</button>
            {weather.current.map(w => {
                <p>Teste {w}</p>
            })}
        </div>
    );
}

export default App;
