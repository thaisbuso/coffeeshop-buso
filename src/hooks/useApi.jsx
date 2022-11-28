// Basic imports
import { useState, useEffect } from 'react';
import axios from 'axios';

// Hooks
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

// Set basic Axios parameters from .env
const APIClient = axios.create({
   baseURL: process.env.REACT_APP_API,
});

export async function makeRequest(method, path, data = {}, config = {}) {
   let response = null;
   switch (method) {
      case 'GET':
         response = await APIClient.get(path, config);
         break;
      case 'POST':
         response = await APIClient.post(path, data, config);
         break;
      case 'PUT':
         response = await APIClient.put(path, data, config);
         break;
      case 'DELETE':
         response = await APIClient.delete(path, config);
         break;
      default:
   }
   return response;
}

export const useApiAuth = (auth) => {
   const [token] = useLocalStorage("token", "");
   
   const [request, setRequest] = useState(null);
   const [isReady, setIsReady] = useState(false);

   let requestFunction = async function (method, path, data, extraHeaders = {}, extraConfig = {}) {
      let config = {
         headers: { Authorization: `Bearer ${token}`, ...extraHeaders }, //inject token into request Auth header
         ...extraConfig,
      };

      //Make the request
      return makeRequest(method, path, data, config);
   };

   useEffect(() => {
      // When auth.user is ready, store the request function on state so it can be used.
      // The requestFunction must be set to the state inside an anon function that returns it,
      // otherwise it won't be properly stored because React is arcane.
      if (auth?.user !== null) {
         setRequest(() => {
            return requestFunction;
         });
         setIsReady(true);
      }
   }, [auth?.user]);

   return {
      request,
      isReady
   };
};

export const useApi = () => {
   const auth = useAuth();
   return useApiAuth(auth);
};