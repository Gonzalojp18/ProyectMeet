import React from 'react';
import LocationInfo from './LocationInfo';
import SocialLinks from './SocialLinks';


const Footer = () => {
  const locations = [
    {
      id: 1,
      name: 'Club Obra Sanitaria',
      address: 'Av Libertador 7281'
    },
    {
      id: 2,
      name: 'Club Obra Sanitaria Anexo',
      address: 'Av Figueroa Alcorta 7250'
    },
    {
      id: 3,
      name: 'Club Harrods Gath&Chaves',
      address: 'Virrey de Pino 1480'
    }
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Locations Section */}
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900">Nuestras Sedes</h3>
            <div className="space-y-6 text-left">
              {locations.map(location => (
                <LocationInfo key={location.id} location={location} />
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:contacto@turestaurante.com" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
                  restobarmeeting@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-600">+54 11-6001-9734</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-8">Seguinos en Redes</h3>
            <SocialLinks />
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Meeting Resto Bar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;