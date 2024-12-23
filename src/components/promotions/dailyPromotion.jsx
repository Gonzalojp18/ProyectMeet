import React from 'react';
import { useDailyPromotion } from '../../hooks/useDailyPromotion';
import { motion } from 'framer-motion';

const DailyPromotion = () => {
    const { isWeekday, promotion, styles } = useDailyPromotion();

    if (!isWeekday) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12`}
        >
            <div className={`rounded-xl shadow-lg overflow-hidden mx-auto ${styles.background}`}>
                <div className="p-8">
                    <div className={`flex items-center justify-between ${styles.textColor}`}>
                        <div className="flex-1">

                            <div className='pb-5'>
                            <span className="inline-flex items-center px-4 py-2 rounded-full border-2 border-current">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    MENU EJECUTIVO
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{promotion.title}</h3>
                            <p className="text-lg opacity-90">{promotion.description}</p>

                            <div className="mt-6 flex items-center space-x-4 mx-auto">
                                <button
                                    className={`${styles.buttonClass} px-6 py-2 rounded-full font-medium transition-transform hover:scale-105 mx-auto`}
                                >
                                    Consulta a tu camarero
                                </button>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className={`${styles.iconBackground} w-24 h-24 rounded-full flex items-center justify-center`}>
                                {promotion.icon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DailyPromotion;