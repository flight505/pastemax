import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import IgnorePatterns from '../IgnorePatterns';

describe('IgnorePatterns Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    globalPatternsState: {
      patterns: '',
      excludedSystemPatterns: []
    },
    localPatternsState: {
      patterns: '',
      excludedSystemPatterns: []
    },
    systemIgnorePatterns: ['**/.git/**', '**/node_modules/**'],
    recentFolders: ['/test/folder1', '/test/folder2'],
    saveIgnorePatterns: jest.fn(),
    resetIgnorePatterns: jest.fn(),
    clearIgnorePatterns: jest.fn(),
    onExcludedSystemPatternsChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Controlled Mode Tests', () => {
    it('initializes with provided excluded patterns', () => {
      render(
        <IgnorePatterns
          {...defaultProps}
          globalPatternsState={{
            patterns: '',
            excludedSystemPatterns: ['**/.git/**']
          }}
        />
      );

      const gitSwitch = screen.getByLabelText('**/.git/**');
      const nodeModulesSwitch = screen.getByLabelText('**/node_modules/**');

      expect(gitSwitch).not.toBeChecked();
      expect(nodeModulesSwitch).toBeChecked();
    });

    it('syncs state with parent on pattern toggle', () => {
      render(
        <IgnorePatterns
          {...defaultProps}
          globalPatternsState={{
            patterns: '',
            excludedSystemPatterns: []
          }}
        />
      );

      const nodeModulesPattern = screen.getByText('**/node_modules/**');
      const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
      
      if (!toggleButton) {
        throw new Error('Toggle button not found');
      }

      fireEvent.click(toggleButton);
      expect(defaultProps.onExcludedSystemPatternsChange).toHaveBeenCalledWith(['**/node_modules/**']);
    });

    it('syncs state with parent on modal close', () => {
      render(
        <IgnorePatterns
          {...defaultProps}
          globalPatternsState={{
            patterns: '',
            excludedSystemPatterns: []
          }}
        />
      );

      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });

  describe('Uncontrolled Mode Tests', () => {
    it('works with only excludedSystemPatterns (no setter)', () => {
      render(
        <IgnorePatterns
          {...defaultProps}
          globalPatternsState={{
            patterns: '',
            excludedSystemPatterns: ['**/.git/**']
          }}
        />
      );

      const nodeModulesPattern = screen.getByText('**/node_modules/**');
      const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
      
      if (!toggleButton) {
        throw new Error('Toggle button not found');
      }

      fireEvent.click(toggleButton);
      expect(defaultProps.saveIgnorePatterns).not.toHaveBeenCalled();
    });

    it('works with neither prop', () => {
      render(<IgnorePatterns {...defaultProps} />);

      const nodeModulesPattern = screen.getByText('**/node_modules/**');
      const toggleButton = nodeModulesPattern.closest('div')?.querySelector('button');
      
      if (!toggleButton) {
        throw new Error('Toggle button not found');
      }

      fireEvent.click(toggleButton);
      expect(defaultProps.saveIgnorePatterns).not.toHaveBeenCalled();
    });
  });

  describe('Pattern Management Tests', () => {
    it('saves global patterns correctly', async () => {
      render(<IgnorePatterns {...defaultProps} />);

      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);

      expect(defaultProps.saveIgnorePatterns).toHaveBeenCalledWith('', true);
    });

    it('handles keyboard shortcuts', () => {
      render(<IgnorePatterns {...defaultProps} />);

      fireEvent.keyDown(window, { key: 's', ctrlKey: true });
      expect(defaultProps.saveIgnorePatterns).toHaveBeenCalled();
    });
  });

  describe('UI Interaction Tests', () => {
    it('toggles pattern categories', () => {
      render(<IgnorePatterns {...defaultProps} />);

      const categoryHeader = screen.getByText('Version Control').closest('div');
      
      if (!categoryHeader) {
        throw new Error('Category header not found');
      }

      fireEvent.click(categoryHeader);
      expect(categoryHeader.parentElement).not.toHaveClass('categoryExpanded');

      fireEvent.click(categoryHeader);
      expect(categoryHeader.parentElement).toHaveClass('categoryExpanded');
    });

    it('switches between global and local tabs', () => {
      render(<IgnorePatterns {...defaultProps} />);

      const localTab = screen.getByText('Local');
      fireEvent.click(localTab);

      expect(screen.getByLabelText('Folder select')).toBeInTheDocument();
    });
  });
}); 