// Utility function to create linear gradients based on weather conditions
const createGradient = (colors) => `linear-gradient(${colors.join(', ')})`;

export const weatherBackgrounds = {
    // Soleado / Clear sky
    '01d': {
        background: createGradient(['to bottom', '#87CEEB', '#4682B4']),
        textColor: 'text-gray-900',
        cardBg: 'bg-sky-50/80',
        hourlyCardBg: 'bg-sky-100/90'
    },
    // Soleado noche
    '01n': {
        background: createGradient(['to bottom', '#1a1a2e', '#16213e']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Parcialmente nublado
    '02d': {
        background: createGradient(['to bottom', '#a8c0ff', '#3f4c6b']),
        textColor: 'text-gray-900',
        cardBg: 'bg-blue-50/80',
        hourlyCardBg: 'bg-blue-100/90'
    },
    '02n': {
        background: createGradient(['to bottom', '#2c3e50', '#3498db']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Nublado
    '03d': {
        background: createGradient(['to bottom', '#bdc3c7', '#2c3e50']),
        textColor: 'text-gray-900',
        cardBg: 'bg-gray-100/80',
        hourlyCardBg: 'bg-gray-200/90'
    },
    '03n': {
        background: createGradient(['to bottom', '#2c3e50', '#2c3e50']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Muy nublado
    '04d': {
        background: createGradient(['to bottom', '#757F9A', '#D7DDE8']),
        textColor: 'text-gray-900',
        cardBg: 'bg-gray-200/80',
        hourlyCardBg: 'bg-gray-300/90'
    },
    '04n': {
        background: createGradient(['to bottom', '#232526', '#414345']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Lluvia
    '09d': {
        background: createGradient(['to bottom', '#4B79A1', '#283E51']),
        textColor: 'text-gray-100',
        cardBg: 'bg-blue-900/80',
        hourlyCardBg: 'bg-blue-800/90'
    },
    '09n': {
        background: createGradient(['to bottom', '#1F1C2C', '#928DAB']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Lluvia fuerte
    '10d': {
        background: createGradient(['to bottom', '#373B44', '#4286f4']),
        textColor: 'text-gray-100',
        cardBg: 'bg-blue-900/80',
        hourlyCardBg: 'bg-blue-800/90'
    },
    '10n': {
        background: createGradient(['to bottom', '#0F2027', '#203A43', '#2C5364']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Tormenta
    '11d': {
        background: createGradient(['to bottom', '#4B79A1', '#283E51']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    '11n': {
        background: createGradient(['to bottom', '#0F2027', '#203A43', '#2C5364']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Nieve
    '13d': {
        background: createGradient(['to bottom', '#E6DADA', '#274046']),
        textColor: 'text-gray-900',
        cardBg: 'bg-blue-50/80',
        hourlyCardBg: 'bg-blue-100/90'
    },
    '13n': {
        background: createGradient(['to bottom', '#2C3E50', '#3498DB']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    },
    // Niebla
    '50d': {
        background: createGradient(['to bottom', '#C9D6FF', '#E2E2E2']),
        textColor: 'text-gray-900',
        cardBg: 'bg-gray-200/80',
        hourlyCardBg: 'bg-gray-300/90'
    },
    '50n': {
        background: createGradient(['to bottom', '#2C3E50', '#3498DB']),
        textColor: 'text-gray-100',
        cardBg: 'bg-gray-900/80',
        hourlyCardBg: 'bg-gray-800/90'
    }
};