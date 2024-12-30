const baseApiUrl = import.meta.env.VITE_API_NODE_ENV === 'production'
  ? 'https://server-eta-rosy.vercel.app'
  : 'http://localhost:3000'

export default baseApiUrl;
