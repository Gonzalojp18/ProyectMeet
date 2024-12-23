const baseApiUrl = import.meta.env.NODE_ENV === 'production'
  ? import.meta.env.VITE_API_URI_PRODUCTION
  : import.meta.env.VITE_API_URI_DEVELOPMENT

export default baseApiUrl;