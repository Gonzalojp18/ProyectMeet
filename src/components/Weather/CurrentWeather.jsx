import React from 'react';
import WeatherIcon from './WeatherIcon';
import { getWeatherBackground } from '../../utils/weatherUtils';

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    const {
        main: { temp, feels_like, humidity },
        weather: [{ description, icon }],
        wind: { speed }
    } = data;

    return (
        <div className={`${getWeatherBackground(icon)} rounded-xl p-6 text-white shadow-lg`}>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold mb-1">{Math.round(temp)}°C</h2>
                    <p className="text-lg capitalize">{description}</p>
                </div>
                <WeatherIcon code={icon} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="opacity-80">Sensación térmica</p>
                    <p className="font-semibold">{Math.round(feels_like)}°C</p>
                </div>
                <div>
                    <p className="opacity-80">Humedad</p>
                    <p className="font-semibold">{humidity}%</p>
                </div>
                <div>
                    <p className="opacity-80">Viento</p>
                    <p className="font-semibold">{Math.round(speed * 3.6)} km/h</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;