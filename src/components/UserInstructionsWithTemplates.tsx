import React, { useState, useCallback, useMemo } from 'react';
import { ConfirmationDialog } from './ui/ConfirmationDialog';
import { TemplateDropdownAdapter } from './ui/DropdownMenu/TemplateDropdownAdapter';
import {
  PromptTemplate,
  PROMPT_TEMPLATES,
  TEMPLATE_STORAGE_KEY,
  TEMPLATE_INSERT_MODE_KEY,
  TemplateInsertMode,
  TemplateCategory
} from '../constants/promptTemplates';
import styles from './UserInstructionsWithTemplates.module.css';

interface UserInstructionsWithTemplatesProps {
  instructions: string;
  setInstructions: (value: string | ((prev: string) => string)) => void;
}

interface TemplateOption {
  value: string;
  label: string;
  category: TemplateCategory;
  icon?: string;
  description?: string;
  disabled?: boolean;
}

export const UserInstructionsWithTemplates: React.FC<UserInstructionsWithTemplatesProps> = ({
  instructions,
  setInstructions,
}) => {
  // State for selected template and preview
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(() => {
    return localStorage.getItem(TEMPLATE_STORAGE_KEY);
  });
  const [previewTemplate, setPreviewTemplate] = useState<PromptTemplate | null>(null);
  
  // State for confirmation dialog
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingTemplate, setPendingTemplate] = useState<PromptTemplate | null>(null);
  
  // State for insertion mode
  const [insertMode, setInsertMode] = useState<TemplateInsertMode>(() => {
    return (localStorage.getItem(TEMPLATE_INSERT_MODE_KEY) as TemplateInsertMode) || 'replace';
  });

  // Create template options for the dropdown
  const templateOptions = useMemo<TemplateOption[]>(() => {
    return PROMPT_TEMPLATES.map(template => ({
      value: template.id,
      label: template.name,
      description: template.description,
      icon: template.icon,
      category: template.category
    }));
  }, []);

  // Handle template selection
  const handleTemplateSelect = useCallback((value: string) => {
    const template = PROMPT_TEMPLATES.find(t => t.id === value);
    if (!template) return;
    
    // Save last selected template
    localStorage.setItem(TEMPLATE_STORAGE_KEY, value);
    setSelectedTemplate(value);
    
    // Also update the preview template when selected
    setPreviewTemplate(template);
    
    // If instructions are empty, directly insert
    if (!instructions.trim()) {
      setInstructions(template.content);
      return;
    }
    
    // Otherwise, show confirmation dialog
    setPendingTemplate(template);
    setShowConfirmDialog(true);
  }, [instructions, setInstructions]);

  // Handle template insertion
  const insertTemplate = useCallback((template: PromptTemplate, mode: TemplateInsertMode) => {
    // Save insertion mode preference
    localStorage.setItem(TEMPLATE_INSERT_MODE_KEY, mode);
    setInsertMode(mode);
    
    if (mode === 'replace') {
      setInstructions(template.content);
    } else {
      setInstructions((prev: string) => {
        if (prev.trim()) {
          return `${prev.trim()}\n\n${template.content}`;
        }
        return template.content;
      });
    }
  }, [setInstructions]);

  // Get the selected template name
  const getSelectedTemplateName = () => {
    if (!selectedTemplate) return null;
    const template = PROMPT_TEMPLATES.find(t => t.id === selectedTemplate);
    return template ? template.name : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.templateSelector}>
          <TemplateDropdownAdapter
            options={templateOptions}
            value={selectedTemplate || undefined}
            onChange={handleTemplateSelect}
            placeholder="Select a prompt template..."
            title="Select a prompt template"
          />
        </div>
      </div>

      <div className={styles.textareaContainer}>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Enter your instructions here to guide the AI response..."
          className={styles.textarea}
          aria-label="User instructions"
        />
      </div>

      {selectedTemplate && (
        <div className={styles.templatePreview} role="complementary" aria-label="Template preview">
          <h4>Selected Template: {getSelectedTemplateName()}</h4>
          {previewTemplate && (
            <>
              <p className={styles.templateDescription}>{previewTemplate.description}</p>
              <pre className={styles.templateContent}>{previewTemplate.content}</pre>
            </>
          )}
        </div>
      )}

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setPendingTemplate(null);
        }}
        onConfirm={() => {
          if (pendingTemplate) {
            insertTemplate(pendingTemplate, insertMode);
          }
          setShowConfirmDialog(false);
          setPendingTemplate(null);
        }}
        title="Insert Template"
        description="Would you like to replace your current instructions or append the template?"
        confirmLabel={insertMode === 'replace' ? 'Replace' : 'Append'}
        cancelLabel="Cancel"
      />
    </div>
  );
}; 