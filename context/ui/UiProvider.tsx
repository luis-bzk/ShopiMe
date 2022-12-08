import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";

// interface constructor -> state
export interface UiState {
  isMenuOpen: boolean;
}

// initial state
const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

// props provider
interface props {
  children: JSX.Element;
}

// provider
export const UiProvider: FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "ToggleMenu" });
  };

  const valuesProvider = {
    ...state,

    // methods
    toggleSideMenu,
  };

  return <UiContext.Provider value={valuesProvider}>{children}</UiContext.Provider>;
};
