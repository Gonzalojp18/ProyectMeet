import React from 'react';

const WeatherIcon = ({ code, isDay = true }) => {
    const getIconUrl = (code) => {
        return `https://openweathermap.org/img/wn/${code}@2x.png`;
    };

    return (
        <img
            src={getIconUrl(code)}
            alt="Clima actual"
            className="w-16 h-16"
            loading="lazy"
        />
    );
};

export default WeatherIcon;