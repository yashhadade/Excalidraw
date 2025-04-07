import axios from 'axios';

// Check if we're in a browser environment
const isBrowser = typeof window !== "undefined";

export const server = axios.create({
  baseURL: "http://localhost:5000",  
  responseType: 'json',
  headers: {
    // Only set the authorization header if we're on the client-side (browser)
    'authorization': isBrowser ? sessionStorage.getItem('authorization') || '' : ''
  }
});
