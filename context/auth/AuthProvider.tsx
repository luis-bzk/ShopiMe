import { FC, useReducer, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";

import { shopiMeApi } from "../../api";
import { AuthContext, authReducer } from "./";
import { IUserResponse } from "../../interfaces";

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
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }

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

  const logoutUser = () => {
    Cookies.remove("token");
    Cookies.remove("cartProducts");
    router.reload();
  };

  const valuesProvider = {
    ...state,

    // methods
    loginUser,
    registerUser,
    logoutUser,
  };

  return <AuthContext.Provider value={valuesProvider}>{children}</AuthContext.Provider>;
};
