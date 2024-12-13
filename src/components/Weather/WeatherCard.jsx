import { weatherBackgrounds } from '../Weather/WeatherBackgrounds';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { WiHumidity, WiThermometer, WiStrongWind } from 'react-icons/wi';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

export function WeatherCard({ IdApp }) {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const ciudad = 'Buenos Aires';
                const coords = { lat: -34.6037, lon: -58.3816 };

                const currentResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${IdApp}&units=metric&lang=es`
                );

                const forecastResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${IdApp}&units=metric&lang=es`
                );

                setCurrentWeather(currentResponse.data);
                setForecast(forecastResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching weather:', err);
                setError('Error al cargar el clima');
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [IdApp]);

    if (loading) return (
        <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-4 w-8 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 p-4 text-center">
            {error}
        </div>
    );

    if (!currentWeather || !forecast) return null;

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const next24Hours = forecast.list.slice(0, 8);

    const weatherStyle = weatherBackgrounds[currentWeather.weather[0].icon] || {
        background: 'linear-gradient(to bottom, #87CEEB, #4682B4)',
        textColor: 'text-gray-900',
        cardBg: 'bg-gray-100/80',
        hourlyCardBg: 'bg-gray-200/90'
    };

    return (
        <div
            className="min-screen w-full bg-cover bg-center bg-no-repeat transition-all duration-500"
            style={{ background: weatherStyle.background }}
        >
            <div className="container mx-auto px-4 py-8">
                <div className={`rounded-lg shadow-lg p-6 backdrop-blur-sm ${weatherStyle.cardBg} transition-colors duration-500`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className={`text-2xl font-semibold ${weatherStyle.textColor}`}>
                            Clima en Buenos Aires
                        </h2>
                        <span className={`text-sm ${weatherStyle.textColor}`}>
                            {format(new Date(), "d 'de' MMMM, HH:mm", { locale: es })}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                        <div className="flex items-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                                alt={currentWeather.weather[0].description}
                                className="w-16 h-16"
                            />
                            <div className="ml-2">
                                <p className={`text-3xl font-bold ${weatherStyle.textColor}`}>
                                    {Math.round(currentWeather.main.temp)}°C
                                </p>
                                <p className={`capitalize ${weatherStyle.textColor}`}>
                                    {currentWeather.weather[0].description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className={`flex items-center ${weatherStyle.textColor}`}>
                                <WiThermometer className="text-2xl" />
                                <span className="ml-1">ST: {Math.round(currentWeather.main.feels_like)}°C</span>
                            </div>
                            <div className={`flex items-center ${weatherStyle.textColor}`}>
                                <WiHumidity className="text-2xl" />
                                <span className="ml-1">Humedad: {currentWeather.main.humidity}%</span>
                            </div>
                            <div className={`flex items-center ${weatherStyle.textColor}`}>
                                <WiStrongWind className="text-2xl" />
                                <span className="ml-1">Viento: {Math.round(currentWeather.wind.speed * 3.6)} km/h</span>
                            </div>
                        </div>
                    </div>
            {/* Botón para expandir/contraer pronóstico */}
                    <button
                        onClick={toggleExpand}
                        className={`flex items-center justify-center w-full py-2 ${weatherStyle.textColor} hover:opacity-80 transition-opacity`}
                    >
                        {isExpanded ? (
                            <>
                                <span>Ver menos</span>
                                <MdExpandLess className="ml-1" />
                            </>
                        ) : (
                            <>
                                <span>Ver pronóstico 24h</span>
                                <MdExpandMore className="ml-1" />
                            </>
                        )}
                    </button>
            {/* Pronóstico 24 horas */}
                    {isExpanded && (
                        <div className="mt-4 overflow-x-auto">
                            <div className="flex justify-center  gap-4 pb-2 mx-auto">
                                {next24Hours.map((hour) => (
                                    <div
                                        key={hour.dt}
                                        className={`flex flex-col items-center p-3 rounded-lg ${weatherStyle.hourlyCardBg} backdrop-blur-sm min-w-[100px]`}
                                    >
                                        <span className={`text-sm font-medium ${weatherStyle.textColor}`}>
                                            {format(new Date(hour.dt * 1000), 'HH:mm')}
                                        </span>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                            alt={hour.weather[0].description}
                                            className="w-10 h-10"
                                        />
                                        <span className={`text-lg font-semibold ${weatherStyle.textColor}`}>
                                            {Math.round(hour.main.temp)}°C
                                        </span>
                                        <span className={`text-xs text-center ${weatherStyle.textColor}`}>
                                            {hour.weather[0].description}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={`text-lg font-bold text-center mt-4 ${weatherStyle.textColor}`}>
                        Actualizado para el Campo Deportivo
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
