// API Configuration
const API_CONFIG = {
  // Use environment variable if available, otherwise fallback to localhost
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
};

export default API_CONFIG;