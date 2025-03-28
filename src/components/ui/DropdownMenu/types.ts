export interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
  icon?: React.ReactNode;
}

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export interface DropdownMenuGroupProps {
  children: React.ReactNode;
  className?: string;
}

export interface DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
}

export type DropdownMenuState = {
  isOpen: boolean;
  activeItemIndex: number | null;
  triggerRect: DOMRect | null;
};

export type DropdownMenuAction = 
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'SET_TRIGGER_RECT'; rect: DOMRect }
  | { type: 'SET_ACTIVE_ITEM'; index: number | null }; 