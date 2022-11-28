import React, { useState, useEffect, useContext, createContext } from 'react'

import { makeRequest, useApi } from './useApi';
import { useLocalStorage } from './useLocalStorage';

const authContext = createContext(null);

export function ProvideAuth({ children }) {
   const auth = useProvideAuth()
   return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
   const ctx = useContext(authContext);
   const {
      user,
      initializing,
      signin,
      signup,
      signout
   } = ctx;
   return { user, initializing, signin, signup, signout };
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
   const [token, setToken] = useLocalStorage("token", "");

   const [user, setUser] = useState(null);
   const [initializing, setInitializing] = useState(true);
   const [error, setError] = useState(null);

   // In some of these functions, we call the makeRequest method from useApi manually in order to bypass the need for user authentication
   // The last argument in makeRequest is Axios config, in which we are deliberately omiting auth headers for these requests
   const getCurrentUser = async () => {
      let error = null;

      try {
         const response = await makeRequest('GET', '/api/me', {}, { headers: { Authorization: `Bearer ${token}` } });
         const data = response?.data;
         setUser(data);

      } catch (requestError) {
         error = requestError;
         console.warn(error);
         setError(error);
      }
      setInitializing(false);

      return { error }
   }

   const signin = async (email, password) => {
      let error = null

      const payload = {
         email,
         password
      };

      try {
         const loginResponse = await makeRequest('POST', '/api/login', payload, {});

         
         const receivedToken = loginResponse?.data?.token;
         console.log(loginResponse);
         setToken(receivedToken);
      } catch (requestError) {
         error = requestError;
         console.error(error);
         setError(error);
      }

      return { error }
   }

   const signup = async (name, email, password) => {
      let error = null;

      const payload = {
         email,
         password,
         name
      };

      try {
         const signupResponse = await makeRequest('POST', '/api/signup', payload, {});
         const receivedToken = signupResponse?.data?.token;
         setToken(receivedToken);
      } catch (requestError) {
         error = requestError;
         console.error(error);
         setError(error);
      }

      return { error }
   }

   const signout = async () => {
      let error = null

      try {
         setToken("");
         setUser(null);
      } catch (requestError) {
         error = requestError;
         console.error(error);
         setUser(null);
         setError(error);
      }

      return { error }
   }

   useEffect(() => {
      if (token === "") {
         setInitializing(false);
      } else if (user === null) {
         getCurrentUser();
      }
   }, [token]);

   const authHook = {
      user,
      initializing,
      error,
      signin,
      signup,
      signout
   };

   return authHook;
}
