const baseApiUrl = import.meta.env.VITE_API_NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://server-eta-rosy.vercel.app'

export default baseApiUrl;

