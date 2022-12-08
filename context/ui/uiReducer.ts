import { UiState } from "./";

type UI_ACTION_TYPES = "ToggleMenu";
type UiActionType = { type: UI_ACTION_TYPES };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  // const { type, payload } = action;

  switch (action.type) {
    case "ToggleMenu":
      return { ...state, isMenuOpen: !state.isMenuOpen };

    default:
      return state;
  }
};
