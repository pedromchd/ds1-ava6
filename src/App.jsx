import React, { useState, useEffect } from 'react';
import cx from 'classnames';

function SearchBox({ setQueryReq }) {
    return (
        <input type="search" id="search" placeholder="Search by city name..."
            onChange={(e) => setQueryReq(e.target.value)}
            onBlur={(e) => e.target.value = ''}
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

function WeatherOverview({ location, forecast, icons }) {
    const date = new Date();
    const iso = date.toISOString();
    const val = iso.replace(iso.slice(-10), '00');
    const key = forecast.hourly.time.indexOf(val);

    const code = forecast.current.weathercode;
    const time = forecast.current.is_day ? 'day' : 'night';

    return (
        <article className="p-4 grid grid-cols-2 place-items-center">
            <div className="h-[80%] flex flex-col justify-between">
                <div>
                    <p className="text-4xl font-extrabold">{location.name}</p>
                    <p className="text-xl font-light">Precipitação: {forecast.hourly.precipitation_probability[key]}%</p>
                </div>
                <p className="text-6xl font-bold">{forecast.current.temperature_2m}°C</p>
            </div>
            <img src={icons[code][time].image} className="h-[100%]" />
        </article>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [isOnLoad, setIsOnload] = useState(true);
    const [queryReq, setQueryReq] = useState('');
    const [queryRes, setQueryRes] = useState([]);
    const [location, setLocation] = useState({});
    const [forecast, setForecast] = useState({});
    const [wmoIcons, setWMOIcons] = useState({});

    async function getLocalGeocodings(queryReq) {
        const req = queryReq.replace(/\s/g, '+');
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${req}&count=5&language=en&format=json`;
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

    async function getWeatherIcons() {
        const url = 'https://gist.githubusercontent.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json';
        const res = await fetch(url);
        const obj = await res.json();

        setWMOIcons(obj);
    }

    useEffect(() => {
        getLocalGeocodings(queryReq);
    }, [queryReq]);

    useEffect(() => {
        getWeatherForecast(location.latitude, location.longitude);
        setQueryRes();
    }, [location]);

    useEffect(() => {
        getWeatherIcons();
    }, []);

    return (
        <div className={cx('font-["Open_Sans"]', { 'dark': darkMode })}>
            {/* <button onClick={() => setDarkMode(!darkMode)}>Set dark mode</button> */}
            <div className="h-screen p-4 bg-gray-50 grid grid-cols-5 gap-4">
                <section className="col-span-3 flex flex-col gap-4">
                    <div className="relative text-lg">
                        <SearchBox setQueryReq={setQueryReq} />
                        {queryRes ? <SearchSel queryRes={queryRes} setLocation={setLocation} /> : null}
                    </div>
                    <div className="flex-grow grid grid-rows-3 gap-4">
                        {isOnLoad ? location.name ? <p>Loading</p> : <p>Please select a city</p> :
                            <WeatherOverview location={location} forecast={forecast} icons={wmoIcons} />}
                        <article>atigo 2</article>
                        <article>atigo 3</article>
                    </div>
                </section>
                <aside>aside</aside>
            </div>
        </div>
    );
}

export default App;
