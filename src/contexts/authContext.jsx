"use client";
import { useCustomToast } from "@/components/elements/Toast";
import { useToken } from "@/hooks/useToken";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  const { showToast } = useCustomToast("auth");

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
      setIsAuthenticated(true);
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
        cache: "no-store",
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        throw new Error(`${data.message}`);
      }

      const token = data.token;
      setPenggunaToken(token);
      setIsAuthenticated(true);

      router.replace("/");
      showToast({
        type: "success",
        message: "Login Success, Welcome Back!",
      });
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
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

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        throw new Error(`${data.message}`);
      }

      const token = data.data;
      setPenggunaToken(token);
      setIsAuthenticated(true);

      showToast({
        type: "success",
        message: "Welcome To FitBook!",
      });
      router.replace("/");
    } catch (error) {
      showToast({
        type: "error",
        message: error.message,
      });
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
