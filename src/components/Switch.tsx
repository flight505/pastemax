import React from 'react';
import { Switch as UiSwitch } from './ui/Switch';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  id?: string;
}

const Switch = ({ 
  checked, 
  onChange, 
  label, 
  id 
}: SwitchProps): JSX.Element => {
  return (
    <UiSwitch
      checked={checked}
      onChange={onChange}
      label={label}
      id={id}
    />
  );
};

export default Switch; 