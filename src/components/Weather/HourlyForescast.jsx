import React from 'react';
import WeatherIcon from './WeatherIcon';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const HourlyForecast = ({ forecast }) => {
    if (!forecast?.list) return null;

    // Get next 24 hours in 2-hour intervals
    const next24Hours = forecast.list.slice(0, 12);

    return (
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 overflow-x-auto">
            <div className="flex space-x-6 min-w-max">
                {next24Hours.map((hour) => (
                    <div
                        key={hour.dt}
                        className="flex flex-col items-center p-3 rounded-lg hover:bg-white/5 transition-colors text-black"
                    >
                        <span className="text-sm font-medium mb-2">
                            {format(new Date(hour.dt * 1000), 'HH:mm', { locale: es })}
                        </span>
                        <WeatherIcon code={hour.weather[0].icon} />
                        <span className="text-lg font-bold">
                            {Math.round(hour.main.temp)}°
                        </span>
                        <span className="text-xs mt-1">
                            {hour.weather[0].description}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;