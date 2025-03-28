# PasteMax Implementation Checklist

## Step 3: Advanced Output Format (XML/Markdown/Plain)

### 1. Create Output Format Data Structures
- [ ] Create a new constants file `src/constants/outputFormats.ts`
- [ ] Define output format type: `export type OutputFormatType = 'xml' | 'markdown' | 'plain';`
- [ ] Define format options array for dropdown:
  ```typescript
  export const OUTPUT_FORMAT_OPTIONS = [
    { value: 'xml', label: 'XML', description: 'XML format with tags for file content' },
    { value: 'markdown', label: 'Markdown', description: 'Markdown format with code blocks' },
    { value: 'plain', label: 'Plain Text', description: 'Plain text with ASCII separators' },
  ];
  ```
- [ ] Define storage key: `export const OUTPUT_FORMAT_STORAGE_KEY = 'pastemax-output-format';`

### 2. Add Output Format State Management
- [ ] Add output format state in `App.tsx`:
  ```typescript
  const [outputFormat, setOutputFormat] = useState<OutputFormatType>(() => {
    const saved = localStorage.getItem(OUTPUT_FORMAT_STORAGE_KEY);
    return (saved as OutputFormatType) || 'xml';
  });
  ```
- [ ] Add persistence effect in `App.tsx`:
  ```typescript
  useEffect(() => {
    localStorage.setItem(OUTPUT_FORMAT_STORAGE_KEY, outputFormat);
  }, [outputFormat]);
  ```
- [ ] Pass state to `ControlContainer` component:
  ```tsx
  <ControlContainer
    // existing props
    outputFormat={outputFormat}
    setOutputFormat={setOutputFormat}
  />
  ```
- [ ] Update `ControlContainer.tsx` props interface:
  ```typescript
  interface ControlContainerProps {
    // existing props
    outputFormat: OutputFormatType;
    setOutputFormat: (format: OutputFormatType) => void;
  }
  ```

### 3. Create Formatter Functions
- [ ] Create new utils file `src/utils/formatters.ts`
- [ ] Implement XML formatter:
  ```typescript
  export function formatAsXML(
    files: Array<{path: string, content: string, tokenCount?: number}>,
    selectedFolder: string | null,
    fileTreeMode: FileTreeMode,
    fileTree: string,
    userInstructions: string
  ): string {
    // Implementation
  }
  ```
- [ ] Implement Markdown formatter:
  ```typescript
  export function formatAsMarkdown(
    files: Array<{path: string, content: string, tokenCount?: number}>,
    selectedFolder: string | null,
    fileTreeMode: FileTreeMode,
    fileTree: string,
    userInstructions: string
  ): string {
    // Implementation
  }
  ```
- [ ] Implement Plain Text formatter:
  ```typescript
  export function formatAsPlain(
    files: Array<{path: string, content: string, tokenCount?: number}>,
    selectedFolder: string | null,
    fileTreeMode: FileTreeMode,
    fileTree: string,
    userInstructions: string
  ): string {
    // Implementation
  }
  ```
- [ ] Implement helper functions:
  - [ ] XML escape function for handling special characters
  - [ ] Markdown escape function for handling backticks in code blocks
  - [ ] Generate file headers for each format

### 4. Update Content Generation
- [ ] Modify `getSelectedFilesContent` in `App.tsx` to use formatters:
  ```typescript
  const getSelectedFilesContent = useCallback(async (): Promise<string> => {
    // existing code to gather files
    
    // Generate the file tree string
    let fileTreeString = "";
    if (fileTreeMode !== "none" && selectedFolder) {
      const filesForTree = fileTreeMode === "complete" ? allFiles : sortedFiles;
      fileTreeString = generateAsciiFileTree(filesForTree, selectedFolder, fileTreeMode);
    }
    
    // Apply the appropriate formatter based on selected format
    switch (outputFormat) {
      case 'markdown':
        return formatAsMarkdown(sortedFiles, selectedFolder, fileTreeMode, fileTreeString, userInstructions);
      case 'plain':
        return formatAsPlain(sortedFiles, selectedFolder, fileTreeMode, fileTreeString, userInstructions);
      case 'xml':
      default:
        return formatAsXML(sortedFiles, selectedFolder, fileTreeMode, fileTreeString, userInstructions);
    }
  }, [selectedFiles, allFiles, sortOrder, fileTreeMode, selectedFolder, userInstructions, outputFormat]);
  ```

### 5. Add Format Selector UI
- [ ] Update `ControlContainer.tsx` to include format selector:
  ```tsx
  <div className={styles.controlGroup}>
    <div className={styles.controlGroupTitle}>Output Format</div>
    <div className={styles.controlItem}>
      <Dropdown
        options={OUTPUT_FORMAT_OPTIONS}
        value={outputFormat}
        onChange={(value) => {
          if (typeof value === 'string') {
            setOutputFormat(value as OutputFormatType);
          }
        }}
        title="Select output format"
      />
    </div>
  </div>
  ```
- [ ] Add appropriate styling to match existing UI

### 6. XML Formatter Implementation Details
- [ ] Start with XML declaration if needed
- [ ] Create `<file_summary>` section with metadata
- [ ] Create `<directory_structure>` for the file tree
- [ ] Create `<files>` section with each file in a `<file path="...">` tag
- [ ] Properly escape or wrap code in CDATA:
  ```typescript
  function wrapInCDATA(content: string): string {
    // Handle nested CDATA if needed
    return `<![CDATA[${content}]]>`;
  }
  ```
- [ ] Add user instructions in `<instruction>` tag if present

### 7. Markdown Formatter Implementation Details
- [ ] Create `# File Summary` section with metadata
- [ ] Create `# Directory Structure` section with tree in code block
- [ ] Create `# Files` section with each file as a heading and content in code block:
  ```typescript
  function formatFileAsMarkdown(file: {path: string, content: string, tokenCount?: number}): string {
    const extension = path.extname(file.path).substring(1);
    return `## File: ${file.path}\n\`\`\`${extension}\n${file.content}\n\`\`\`\n\n`;
  }
  ```
- [ ] Add `# Instructions` section if userInstructions is present
- [ ] Handle escaping of backticks in code blocks

### 8. Plain Text Formatter Implementation Details
- [ ] Create ASCII separators for sections:
  ```
  ==================
  File Summary
  ==================
  ```
- [ ] List directory structure in plain text
- [ ] Format each file with separators:
  ```
  ==================
  File: path/to/file
  ==================
  content
  ```
- [ ] Add instructions section if present

## Step 4: Prompt Template Selector

### 1. Create Prompt Templates Data Structure
- [ ] Create a new constants file `src/constants/promptTemplates.ts`
- [ ] Define template interface:
  ```typescript
  export interface PromptTemplate {
    id: string;
    name: string;
    content: string;
    category: string;
  }
  ```
- [ ] Define template categories:
  ```typescript
  export type TemplateCategory = 
    | 'Code Review' 
    | 'Documentation Generation' 
    | 'Analysis and Improvement' 
    | 'Testing' 
    | 'Code Quality';
  ```
- [ ] Create array of templates:
  ```typescript
  export const PROMPT_TEMPLATES: PromptTemplate[] = [
    {
      id: 'architecture-review',
      name: 'Architecture Review',
      category: 'Code Review',
      content: `Architecture Review:
- Analyze this codebase's architecture:
1. Evaluate the overall structure and patterns
2. Identify potential architectural issues
3. Suggest improvements for scalability
4. Note areas that follow best practices
Focus on maintainability and modularity.`
    },
    // Add all other templates from the specification
  ];
  ```
- [ ] Define local storage keys:
  ```typescript
  export const TEMPLATE_STORAGE_KEY = 'pastemax-last-template';
  export const TEMPLATE_INSERT_MODE_KEY = 'pastemax-template-insert-mode';
  ```

### 2. Create Enhanced UserInstructions Component
- [ ] Create new file `src/components/UserInstructionsWithTemplates.tsx`:
  ```typescript
  interface UserInstructionsWithTemplatesProps {
    instructions: string;
    setInstructions: (value: string) => void;
  }
  
  const UserInstructionsWithTemplates = ({
    instructions,
    setInstructions,
  }: UserInstructionsWithTemplatesProps): JSX.Element => {
    // Add state for selected template
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    // Add state for insertion mode
    const [insertMode, setInsertMode] = useState<'replace' | 'append'>(() => {
      return localStorage.getItem(TEMPLATE_INSERT_MODE_KEY) as 'replace' | 'append' || 'replace';
    });
    
    // State for confirmation dialog
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingTemplate, setPendingTemplate] = useState<PromptTemplate | null>(null);
    
    // Implementation...
  }
  ```

### 3. Create Template Selection Dropdown
- [ ] Group templates by category for the dropdown:
  ```typescript
  const templateOptions = useMemo(() => {
    const categories = PROMPT_TEMPLATES.reduce<Record<string, PromptTemplate[]>>((acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    }, {});
    
    // Convert to options with grouping
    return Object.entries(categories).map(([category, templates]) => ({
      label: category,
      options: templates.map(t => ({ value: t.id, label: t.name }))
    }));
  }, []);
  ```
- [ ] Add dropdown component to the UI:
  ```tsx
  <div className={styles.templateSelector}>
    <Dropdown
      options={templateOptions}
      placeholder="Select a template..."
      onChange={handleTemplateSelect}
      value={selectedTemplate}
    />
  </div>
  ```

### 4. Implement Template Selection Logic
- [ ] Handle template selection:
  ```typescript
  const handleTemplateSelect = useCallback((value: string | string[]) => {
    if (typeof value !== 'string') return;
    
    const template = PROMPT_TEMPLATES.find(t => t.id === value);
    if (!template) return;
    
    // Save last selected template
    localStorage.setItem(TEMPLATE_STORAGE_KEY, value);
    setSelectedTemplate(value);
    
    // If instructions are empty, directly insert
    if (!instructions.trim()) {
      setInstructions(template.content);
      return;
    }
    
    // Otherwise, show confirmation dialog
    setPendingTemplate(template);
    setShowConfirmDialog(true);
  }, [instructions, setInstructions]);
  ```
- [ ] Implement template insertion:
  ```typescript
  const insertTemplate = useCallback((template: PromptTemplate, mode: 'replace' | 'append') => {
    // Save insertion mode preference
    localStorage.setItem(TEMPLATE_INSERT_MODE_KEY, mode);
    setInsertMode(mode);
    
    if (mode === 'replace') {
      setInstructions(template.content);
    } else {
      setInstructions(prev => {
        if (prev.trim()) {
          return `${prev.trim()}\n\n${template.content}`;
        }
        return template.content;
      });
    }
  }, [setInstructions]);
  ```

### 5. Add Confirmation Dialog
- [ ] Create confirmation dialog UI:
  ```tsx
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
  >
    <div>
      <div className={styles.insertModeOptions}>
        <Button 
          variant={insertMode === 'replace' ? 'primary' : 'secondary'}
          onClick={() => setInsertMode('replace')}
        >
          Replace
        </Button>
        <Button 
          variant={insertMode === 'append' ? 'primary' : 'secondary'}
          onClick={() => setInsertMode('append')}
        >
          Append
        </Button>
      </div>
    </div>
  </ConfirmationDialog>
  ```

### 6. Add UI Styling
- [ ] Create CSS module for the enhanced component:
  ```css
  .userInstructionsContainer {
    /* Existing styles from UserInstructions.module.css */
  }
  
  .userInstructionsHeader {
    /* Existing styles */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .templateSelector {
    width: 250px;
  }
  
  .insertModeOptions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    justify-content: center;
  }
  ```

### 7. Update App.tsx to Use Enhanced Component
- [ ] Replace UserInstructions with UserInstructionsWithTemplates:
  ```tsx
  {showUserInstructions && (
    <div className={styles.userInstructionsContainer}>
      <UserInstructionsWithTemplates 
        instructions={userInstructions} 
        setInstructions={setUserInstructions} 
      />
    </div>
  )}
  ```

### 8. Template Preview (Optional Enhancement)
- [ ] Add template preview feature:
  ```typescript
  const [previewTemplate, setPreviewTemplate] = useState<PromptTemplate | null>(null);
  
  const handleTemplateHover = useCallback((value: string) => {
    const template = PROMPT_TEMPLATES.find(t => t.id === value);
    if (template) {
      setPreviewTemplate(template);
    }
  }, []);
  ```
- [ ] Add preview UI:
  ```tsx
  {previewTemplate && (
    <div className={styles.templatePreview}>
      <h4>{previewTemplate.name}</h4>
      <pre>{previewTemplate.content}</pre>
    </div>
  )}
  ```

  <PROMPT_TEMPLATE>
-Code Review

"""
Architecture Review:
- Analyze this codebase's architecture:
1. Evaluate the overall structure and patterns
2. Identify potential architectural issues
3. Suggest improvements for scalability
4. Note areas that follow best practices
Focus on maintainability and modularity.
"""

"""
Security Review:
Perform a security review of this codebase:
1. Identify potential security vulnerabilities
2. Check for common security anti-patterns
3. Review error handling and input validation
4. Assess dependency security
Provide specific examples and remediation steps.
"""

"""
Performance Review
Review the codebase for performance:
1. Identify performance bottlenecks
2. Check resource utilization
3. Review algorithmic efficiency
4. Assess caching strategies
Include specific optimization recommendations.
"""

"""
- Documentation Generation

"""
API Documentation
Generate comprehensive API documentation:
1. List and describe all public endpoints
2. Document request/response formats
3. Include usage examples
4. Note any limitations or constraints
"""

"""
- Developer Guide

"""
Create a developer guide covering:
1. Setup instructions
2. Project structure overview
3. Development workflow
4. Testing approach
5. Common troubleshooting steps
"""

"""
- Architecture Documentation

"""
Document the system architecture:
1. High-level overview
2. Component interactions
3. Data flow diagrams
4. Design decisions and rationale
5. System constraints and limitations
"""

- Analysis and Improvement

"""
Dependency Analysis
Analyze the project dependencies:
1. Identify outdated packages
2. Check for security vulnerabilities
3. Suggest alternative packages
4. Review dependency usage patterns
Include specific upgrade recommendations.
"""

- Test Coverage

"""
Review the test coverage:
1. Identify untested components
2. Suggest additional test cases
3. Review test quality
4. Recommend testing strategies
"""

- Code Quality

"""
Assess code quality and suggest improvements:
1. Review naming conventions
2. Check code organization
3. Evaluate error handling
4. Review commenting practices
Provide specific examples of good and problematic patterns.
"""
</PROMPT_TEMPLATE>

- Tips for Better Results

Be Specific: Include clear objectives and evaluation criteria
Set Context: Specify your role and expertise level needed
Request Format: Define how you want the response structured
Prioritize: Indicate which aspects are most important

Model-Specific Notes
Claude
Use XML output format
Place important instructions at the end
Specify response structure

ChatGPT
Use Markdown format
Break large codebases into sections
Include system role prompts

Gemini
Works with all formats
Focus on specific areas per request
Use step-by-step analysis
