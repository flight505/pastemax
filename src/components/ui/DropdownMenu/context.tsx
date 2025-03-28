import React, { createContext, useContext, useReducer } from 'react';
import { DropdownMenuState, DropdownMenuAction } from './types';

const initialState: DropdownMenuState = {
  isOpen: false,
  activeItemIndex: null,
  triggerRect: null,
};

function dropdownMenuReducer(state: DropdownMenuState, action: DropdownMenuAction): DropdownMenuState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false, activeItemIndex: null };
    case 'SET_TRIGGER_RECT':
      return { ...state, triggerRect: action.rect };
    case 'SET_ACTIVE_ITEM':
      return { ...state, activeItemIndex: action.index };
    default:
      return state;
  }
}

type DropdownMenuContextType = {
  state: DropdownMenuState;
  dispatch: React.Dispatch<DropdownMenuAction>;
};

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined);

export function DropdownMenuProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dropdownMenuReducer, initialState);

  return (
    <DropdownMenuContext.Provider value={{ state, dispatch }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function useDropdownMenu() {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('useDropdownMenu must be used within a DropdownMenuProvider');
  }
  return context;
} 