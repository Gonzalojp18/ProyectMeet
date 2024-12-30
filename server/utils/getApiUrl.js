const baseApiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'https://meetingresstobar.vercel.app'

export default baseApiUrl;

