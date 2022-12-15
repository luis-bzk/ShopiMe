import { IUserResponse } from "../../interfaces";
import { AuthState } from "./";

type AuthActionType = { type: "LOGIN_USER"; payload: IUserResponse } | { type: "LOGOUT_USER" };

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
  // const { type, payload } = action;

  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, isLoggedIn: true, user: action.payload };

    case "LOGOUT_USER":
      return { ...state, isLoggedIn: false, user: undefined };

    default:
      return state;
  }
};
