import React, { useState } from 'react';
import { Dropdown, DropdownOption } from './';
import { FileIcon, FolderIcon, SettingsIcon } from 'lucide-react';

const demoOptions: DropdownOption[] = [
  { value: 'file', label: 'New File', icon: <FileIcon size={16} /> },
  { value: 'folder', label: 'New Folder', icon: <FolderIcon size={16} /> },
  { value: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
];

export const DropdownDemo: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string>();
  const [multiValue, setMultiValue] = useState<string[]>([]);

  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Single Select</h3>
        <Dropdown
          options={demoOptions}
          value={singleValue}
          onChange={setSingleValue}
          placeholder="Select an action"
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Multi Select</h3>
        <Dropdown
          options={demoOptions}
          value={multiValue}
          onChange={setMultiValue}
          placeholder="Select actions"
          multiple
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Size Variants</h3>
        <div className="space-y-2">
          <Dropdown
            options={demoOptions}
            placeholder="Small Dropdown"
            size="sm"
          />
          <Dropdown
            options={demoOptions}
            placeholder="Medium Dropdown (default)"
            size="md"
          />
          <Dropdown
            options={demoOptions}
            placeholder="Large Dropdown"
            size="lg"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Disabled State</h3>
        <Dropdown
          options={demoOptions}
          placeholder="Disabled Dropdown"
          disabled
        />
      </div>
    </div>
  );
}; 