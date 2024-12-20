import React from 'react';
import useMenuStore from '../store/menuStore';
import CategoryDisplay from './categories/CategoryDisplay';
import Footer from '../components/footer/Footer';
import { CategoryNav, LocationNav } from './navigation';
import BrandsSection from './brands/BrandsSection';
import logo from '../../public/assets/miselaneous/logosinbg.webp'
import WeatherCard from '../components/Weather/WeatherCard';
import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

const MenuDisplay = () => {
  const { locationId } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  console.log(locationId);

  const { data, loading, error } = useFetch(`http://localhost:3000/api/menu/${locationId}`)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <Link to='/register' className='bg-white p-6 shadow sm:rounded-lg mt-5'>Please log in</Link>;
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

        {data.categories.map((category) => (
          <CategoryDisplay
            key={category._id}
            category={category}
          />
        ))}

        <BrandsSection />
        <div>
                {/* Weather Card - Only show on menu page */}
                {window.location.pathname === `/${locationId}` && (
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

// import React from 'react';
// import useMenuStore from '../store/menuStore';
// import CategoryDisplay from './categories/CategoryDisplay';
// import { CategoryNav, LocationNav } from './navigation';
// import BrandsSection from './brands/BrandsSection';
// import logo from '../../public/assets/miselaneous/logosinbg.webp';

// const WelcomeMessage = () => (
//   <div>
//     <p className="text-center text-xl mb-8 italic text-menu">
//       Bienvenido a nuestro menú digital. Explore nuestras deliciosas opciones y disfruta de una experiencia.<br />
//       <span>Compartimos el gusto por lo bueno</span><br />
//       <span className="text-sm font-bold">"Comés como en casa, pero sin lavar los platos!"</span>
//     </p>
//   </div>
// );

// const MenuDisplay = () => {
//   const menu = useMenuStore((state) => state.menu);
//   const selectedLocation = useMenuStore((state) => state.selectedLocation);

//   if (!menu || !menu.categories) {
//     return <div className="text-center py-8">Loading menu...</div>;
//   }

//   if (menu.categories.length === 0) {
//     return <div className="text-center py-8">No hay categorías disponibles.</div>;
//   }

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50">
//         <div className="bg-white/90 backdrop-blur-md shadow-sm">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex justify-between items-center py-2">
//               <LocationNav />
//             </div>
//           </div>
//         </div>
//         <CategoryNav />
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 main-container-menu">
//         <img className="m-auto" src={logo} alt="logo" />
//         <WelcomeMessage />

//         {menu.categories.map((category) => (
//           <CategoryDisplay
//             key={category.id}
//             category={category}
//             selectedLocation={selectedLocation}
//           />
//         ))}

//         <BrandsSection />
//       </main>
//     </>
//   );
// };

// export default MenuDisplay;


// import React, { useEffect } from 'react';
// import useMenuStore from '../store/menuStore';
// import CategoryDisplay from './categories/CategoryDisplay';
// import { CategoryNav, LocationNav } from './navigation';
// import BrandsSection from './brands/BrandsSection';
// import logo from '../../public/assets/miselaneous/logosinbg.webp';

// const MenuDisplay = () => {
//   const { menu, selectedLocation, fetchMenu } = useMenuStore();

//   // Obtener el menú desde el backend
//   useEffect(() => {
//     fetchMenu(selectedLocation);
//   }, [selectedLocation, fetchMenu]);

//   if (!menu || !menu.categories) {
//     return <div className="text-center py-8">Loading menu...</div>;
//   }

//   return (
//     <>
//       <header className="fixed top-0 left-0 right-0 z-50">
//         <div className="bg-white/90 backdrop-blur-md shadow-sm">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex justify-between items-center py-2">
//               <LocationNav />
//             </div>
//           </div>
//         </div>
//         <CategoryNav />
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 main-container-menu">
//         <img className='m-auto' src={logo} alt="logo" />
//         <p className="text-center text-xl mb-8 italic text-menu">
//           Bienvenido a nuestro menú digital. Explore nuestras deliciósas opciónes y disfruta de una experiencia.<br />
//           <span>Compartimos el gusto por lo bueno</span><br />
//           <span className='text-sm font-bold'>"Comés como en casa, pero sin lavar los platos!"</span>
//         </p>

//         {menu.categories.map((category) => (
//           <CategoryDisplay
//             key={category.id}
//             category={category}
//             selectedLocation={selectedLocation}
//           />
//         ))}

//         <BrandsSection />
//       </main>
//     </>
//   );
// };

// export default MenuDisplay;
