"use client";
import { useToken } from "@/hooks/useToken";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * @typedef {Object} Pengguna
 * @property {string} id
 * @property {string} role
 * @property {string} email
 * @property {string} displayName
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {Pengguna} pengguna
 * @property {boolean} isAuthenticated
 * @property {function(string,string): void} login
 * @property {function(): void} register
 * @property {function(): void} logout
 */

/**
 * @typedef {Object} AuthContextProviderProps
 * @property {React.ReactNode} children
 */

/**
 * @type {AuthContextValue}
 */
const AuthContext = createContext({});

/**
 * @param {AuthContextProviderProps} props
 */
export const AuthContextProvider = ({ children }) => {
  const [pengguna, setPengguna] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const { setPenggunaToken, removePenggunaToken, getPenggunaToken } =
    useToken();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const setPenggunaData = () => {
    /**
     * @type {Pengguna}
     */
    const decodedToken = jwtDecode(getPenggunaToken());
    setPengguna(decodedToken);
  };
  useEffect(() => {
    if (getPenggunaToken()) {
      setPenggunaData();
    } else {
      setPengguna(undefined);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  const logout = () => {
    removePenggunaToken();
    setIsAuthenticated(false);
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        method: "POST",
      });
      const data = await response.json();
      const token = data.token;

      if (response.ok) {
        setPenggunaToken(token);
        setIsAuthenticated(true);
        setPenggunaData(); // Make sure to decode and set user data
        router.push("/dashboard");
      }

      // handle notif success
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  const register = async (
    name,
    email,
    password,
    noTelp,
    displayName,
    role,
    bio
  ) => {
    try {
      let reqBody = {
        name,
        email,
        password,
        noTelp,
        displayName,
        role,
      };
      if (role === "Trainer") {
        reqBody = { ...reqBody, bio };
      }

      const response = await fetch(`${baseUrl}/register`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
        method: "POST",
      });
      const token = response.data.data;
      setPenggunaToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      // handle error
    }
  };

  const values = {
    pengguna,
    isAuthenticated,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

/**
 * @returns {AuthContextValue}
 */
export const useAuthContext = () => {
  return useContext(AuthContext);
};
