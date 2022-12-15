import { FC, useReducer, useEffect } from "react";

import Cookies from "js-cookie";

import { shopiMeApi } from "../../api";
import { IUserResponse } from "../../interfaces";
import { AuthContext, authReducer } from "./";
import axios from "axios";

// interface constructor -> state
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUserResponse;
}

// initial state
const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

// props provider
interface props {
  children: JSX.Element;
}

// provider
export const AuthProvider: FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = (await shopiMeApi.get("/user/validate-token")) as {
        data: { token: string; user: IUserResponse };
      };
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "LOGIN_USER", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = (await shopiMeApi.post("/user/login", { email, password })) as {
        data: { token: string; user: IUserResponse };
      };
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "LOGIN_USER", payload: user });
      return { hasError: false };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo iniciar sesión",
      };
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = (await shopiMeApi.post("/user/register", { name, email, password })) as {
        data: { token: string; user: IUserResponse };
      };
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "LOGIN_USER", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario",
      };
    }
  };

  const valuesProvider = {
    ...state,

    // methods
    loginUser,
    registerUser,
  };

  return <AuthContext.Provider value={valuesProvider}>{children}</AuthContext.Provider>;
};
