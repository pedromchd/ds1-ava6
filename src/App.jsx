import React, { useState, useEffect } from 'react';
import cx from 'classnames';

function SearchBox({ setQueryReq }) {
    return (
        <input type="search" placeholder="Digite o nome da cidade..." onChange={(e) => setQueryReq(e.target.value)}
            className="p-2 w-full bg-gray-200 rounded-lg shadow-lg" />
    );
}

function SearchSel({ queryRes, setLocation }) {
    return (
        <div className="mt-1.5 absolute w-full bg-gray-200 rounded-lg shadow-lg divide-y-2 divide-gray-300 overflow-hidden">
            {queryRes.map(city => (
                <div onClick={() => setLocation(city)}
                    className="block p-2 hover:bg-gray-300 cursor-pointer">{city.name}, {city.admin1}, {city.country_code}</div>
            ))}
        </div>
    );
}

function CurrentWeather({ location, forecast }) {
    return (
        <ul>
            <li>Cidade: {location.name}</li>
            <li>Temperatura: {forecast.temperature_2m}</li>
        </ul>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOnLoad, setIsOnload] = useState(true);
    const [queryReq, setQueryReq] = useState('');
    const [queryRes, setQueryRes] = useState([]);
    const [location, setLocation] = useState({});
    const [forecast, setForecast] = useState({});

    async function getLocalGeocodings(queryReq) {
        const req = queryReq.replace(/\s/g, '+');
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${req}&count=5&language=pt&format=json`;
        const res = await fetch(url);
        const obj = await res.json();

        setQueryRes(obj.results);
    }

    async function getWeatherForecast(latitude, longitude) {
        setIsOnload(true);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,weathercode,windspeed_10m&hourly=temperature_2m,precipitation_probability,weathercode,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`;
        const res = await fetch(url);
        const obj = await res.json();

        if (obj.current) {
            setForecast(obj);
            setIsOnload(false);
        }
    }

    useEffect(() => {
        getLocalGeocodings(queryReq);
    }, [queryReq]);

    useEffect(() => {
        getWeatherForecast(location.latitude, location.longitude);
        setQueryRes();
    }, [location]);

    return (
        <div className={cx('font-["Open_Sans"]', { 'dark': darkMode })}>
            {/* <button onClick={() => setDarkMode(!darkMode)}>Set dark mode</button> */}
            <div className="h-screen p-4 bg-gray-50 grid grid-cols-3 gap-4">
                <section className="col-span-2 flex flex-col gap-4">
                    <div className="relative text-lg">
                        <SearchBox setQueryReq={setQueryReq} />
                        {queryRes ? <SearchSel queryRes={queryRes} setLocation={setLocation} /> : null}
                    </div>
                    <div className="flex-grow grid grid-rows-3 gap-4">
                        {isOnLoad ? location.name ? <p>Carregando</p> : <p>Selecione uma cidade</p> :
                            <CurrentWeather location={location} forecast={forecast.current} />}
                        {isOnLoad ? location.name ? <p>Carregando</p> : <p>Selecione uma cidade</p> :
                            <CurrentWeather location={location} forecast={forecast.current} />}
                        {isOnLoad ? location.name ? <p>Carregando</p> : <p>Selecione uma cidade</p> :
                            <CurrentWeather location={location} forecast={forecast.current} />}
                    </div>
                </section>
                {isOnLoad ? location.name ? <p>Carregando</p> : <p>Selecione uma cidade</p> :
                    <CurrentWeather location={location} forecast={forecast.current} />}
            </div>
        </div>
    );
}

export default App;
