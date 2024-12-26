const baseApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://meetingresstobar.vercel.app'
  : 'http://localhost:5000'

export default baseApiUrl;