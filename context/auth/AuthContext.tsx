import { createContext } from "react";
import { IUserResponse } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUserResponse;

  // methods
  loginUser: (email: string, password: string) => Promise<{ hasError: boolean; message?: string }>;
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string }>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
