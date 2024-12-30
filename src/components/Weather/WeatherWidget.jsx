import React, { useEffect, useState } from 'react';
import { weatherApi } from '../../api/weatherApi';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForescast';

const WeatherWidget = () => {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                const [currentData, forecastData] = await Promise.all([
                    weatherApi.getCurrentWeather(),
                    weatherApi.getForecast()
                ]);
                setCurrent(currentData);
                setForecast(forecastData);
            } catch (err) {
                setError('Error al cargar el clima');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
        // Update weather every 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="animate-pulse bg-gray-800/50 rounded-xl p-8">
                <div className="h-32 bg-gray-700/50 rounded-lg"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-center">
                {error}
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="sr-only">Clima actual y pronóstico</h2>
            <div className="space-y-6">
                <CurrentWeather data={current} />
                <HourlyForecast forecast={forecast} />
            </div>
        </section>
    );
};

export default WeatherWidget;