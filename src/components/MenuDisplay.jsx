import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import useMenuStore from '../store/menuStore';
import CategoryDisplay from './categories/CategoryDisplay';
import { CategoryNav, LocationNav } from './navigation';
import BrandsSection from './brands/BrandsSection';
import logo from '../../public/assets/miselaneous/logosinbg.webp'
import Promotion from '../components/promo/Promotions'
import { FullScreenError } from './Error'
import { MainFooter } from '../components/footer';
import { LocationsSection } from '../components/location';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import API_URI from '../utils/getApiUri'
import { motion } from 'framer-motion';
import WeatherWidget from '../components/Weather/WeatherWidget'

const MenuDisplay = () => {
  const { locationId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`${API_URI}/api/menu/${locationId}`)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <FullScreenError message='404' buttonText='Regresar al inicio' onButtonClick={() => navigate('/')} />
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/90 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-2">
              <LocationNav />
            </div>
          </div>
        </div>
        <CategoryNav categories={data.categories} />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 main-container-menu">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
        >
          <img className='m-auto' src={logo} alt="logo" />
          <p className="text-center text-xl mb-8 italic text-menu">
            Bienvenido a nuestro menú digital. Explore nuestras deliciósas opciónes y disfruta de una experiencia.<br />
            <span>Compartimos el gusto por lo bueno</span><br />
            <span className='text-sm font-bold'>"Comés como en casa, pero sin lavar los platos!"
            </span>
          </p>
        </motion.div>
        <Promotion />
        {data.categories.map((category) => (
          <CategoryDisplay
            key={category._id}
            category={category}
          />
        ))}
        <BrandsSection />
        <WeatherWidget />
        <LocationsSection />
        <MainFooter />
      </main>
    </>
  );
};

export default MenuDisplay;