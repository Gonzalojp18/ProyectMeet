import React from 'react';
import useMenuStore from '../store/menuStore';
import CategoryDisplay from './categories/CategoryDisplay';
import Footer from '../components/footer/Footer';
import { CategoryNav, LocationNav } from './navigation';
import BrandsSection from './brands/BrandsSection';
import logo from '../../public/assets/miselaneous/logosinbg.webp'
import WeatherCard from '../components/Weather/WeatherCard';
import DailyPromotion from '../components/promotions/dailyPromotion';


const MenuDisplay = () => {
  const { menu, selectedLocation } = useMenuStore();
  const apiKey = import.meta.env.VITE_API_KEY;

  if (!menu || !menu.categories) {
    return <div className="text-center py-8">Loading menu...</div>;
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
        <CategoryNav />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 main-container-menu">
        <img className='m-auto' src={logo} alt="logo" />
      <p className="text-center text-xl mb-8 italic text-menu">
          Bienvenido a nuestro menú digital. Explore nuestras deliciósas opciónes y disfruta de una experiencia.<br />
          <span>Compartimos el gusto por lo bueno</span><br />
          <span className='text-sm font-bold'>"Comés como en casa, pero sin lavar los platos!"</span>
        </p>
        <DailyPromotion />
        {menu.categories.map((category) => (
          <CategoryDisplay
            key={category.id}
            category={category}
            selectedLocation={selectedLocation}
          />
        ))}
        <BrandsSection />
        <div>
                {/* Weather Card - Only show on menu page */}
                {window.location.pathname === '/' && (
          <div className="top-16 z-10 bg-gray-100 main-weather">
            <WeatherCard IdApp={apiKey} />
          </div>
        )}
      </div>
        <Footer />
      </main>
    </>
  );
};

export default MenuDisplay;
