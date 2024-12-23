import React from 'react';
import MenuGallery from './MenuGallery';
import logo from '/public/assets/miselaneous/meetinglogo.PNG'
import SocialLinks from './SocialLinks';

const featuredDishes = [
    {
        id: 1,
        name: 'Hamburguesa Completa',
        image: '../assets/carrousel/burguer.PNG'
    },
    {
        id: 2,
        name: 'Buñuelos de Acelga',
        image: '../assets/carrousel/buñuelos.PNG'
    },
    {
        id: 3,
        name: 'Dedos de Muzzarella',
        image: '../assets/carrousel/dedos.PNG'
    },
    {
        id: 4,
        name: 'Ensalada de la casa',
        image: '../assets/carrousel/delacasapng.PNG'
    },
    {
        id: 5,
        name: 'Muffins',
        image: '../assets/carrousel/muffins.PNG'
    },
    {
        id: 6,
        name: 'Capucchino',
        image: '../assets/carrousel/coffewilkm.PNG'
    }
];

const MainFooter = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Logo and About */}
                    <div>
                        <img
                            src={logo}
                            alt="Logo del Restaurante"
                            className="h-16 w-auto mb-6 mx-auto"
                        />
                        <p className="text-gray-400 mb-2">
                            Compartimos el gusto por lo bueno.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contacto & RRSS</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <a href="mailto:contacto@restaurante.com" className="text-gray-400 hover:text-white">
                                    restobarmeeting@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="text-gray-400">+54 11-6001-9734</span>
                            </div>
                            <div className="flex items-center mx-auto">
                                {/* Social Media Section */}
                                    <SocialLinks />
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Mas de nuestra carta</h3>
                        <MenuGallery items={featuredDishes} />
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} Meeting Resto & Bar. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;