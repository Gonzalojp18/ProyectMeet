// import { useState, useEffect } from 'react';

// const DAILY_PROMOTIONS = {
//     1: { // Monday
//         title: "Comienza tu semana con opciones frescas y deliciosas",
//         description: "Disfruta los lunes con una selección única que combina sabores tradicionales y opciones saludables. Perfecto para empezar la semana con energía y buen gusto.",
//         icon: "🌟",
//         styles: {
//             background: "bg-gradient-to-r from-blue-100 to-blue-50",
//             textColor: "text-blue-900",
//             buttonClass: "bg-blue-600 text-white",
//             iconBackground: "bg-blue-200"
//         }
//     },
//     2: { // Tuesday
//         title: "Sabores reconfortantes para un martes inolvidable",
//         description: "Relájate y disfruta los martes con platos pensados para reconfortarte, con combinaciones ideales para todos los gustos. Una experiencia de sabor que no querrás perderte.",
//         icon: "🍝",
//         styles: {
//             background: "bg-gradient-to-r from-green-100 to-green-50",
//             textColor: "text-green-900",
//             buttonClass: "bg-green-600 text-white",
//             iconBackground: "bg-green-200"
//         }
//     },
//     3: { // Wednesday
//         title: "Mitad de semana con opciones irresistibles",
//         description: "Llega al miércoles con opciones llenas de frescura y creatividad, diseñadas para alegrar tu día. Platos variados y balanceados que te sorprenderán.",
//         icon: "👨‍🍳",
//         styles: {
//             background: "bg-gradient-to-r from-purple-100 to-purple-50",
//             textColor: "text-purple-900",
//             buttonClass: "bg-purple-600 text-white",
//             iconBackground: "bg-purple-200"
//         }
//     },
//     4: { // Thursday
//         title: "Un jueves lleno de tradición y buen sabor",
//         description: "Vive la experiencia de un jueves delicioso con platos que combinan tradición y creatividad. Perfectos para cerrar la semana laboral con una sonrisa.",
//         icon: "🥤",
//         styles: {
//             background: "bg-gradient-to-r from-orange-100 to-orange-50",
//             textColor: "text-orange-900",
//             buttonClass: "bg-orange-600 text-white",
//             iconBackground: "bg-orange-200"
//         }
//     },
//     5: { // Friday
//         title: "El viernes sabe mejor con opciones como estas",
//         description: "Termina la semana con estilo disfrutando de un menú que celebra el buen gusto. Perfecto para compartir y empezar el fin de semana de la mejor manera.",
//         icon: "🎉",
//         styles: {
//             background: "bg-gradient-to-r from-red-100 to-red-50",
//             textColor: "text-red-900",
//             buttonClass: "bg-red-600 text-white",
//             iconBackground: "bg-red-200"
//         }
//     }
// };

// export const useDailyPromotion = () => {
//     const [currentDay, setCurrentDay] = useState(new Date().getDay());
//     const [isWeekday, setIsWeekday] = useState(currentDay > 0 && currentDay < 6);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             const now = new Date();
//             const day = now.getDay();
//             setCurrentDay(day);
//             setIsWeekday(day > 0 && day < 6);
//         }, 1000 * 60); // Check every minute

//         return () => clearInterval(timer);
//     }, []);

//     return {
//         isWeekday,
//         promotion: DAILY_PROMOTIONS[currentDay],
//         styles: DAILY_PROMOTIONS[currentDay]?.styles || {}
//     };
// };