const baseApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://proyect-meet-front-end.vercel.app'
  : 'http://localhost:5173'

export default baseApiUrl;