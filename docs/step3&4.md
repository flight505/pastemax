# PasteMax Implementation Checklist

## Step 3: Advanced Output Format (XML/Markdown/Plain)

### 1. Create Output Format Data Structures
- [x] Create a new constants file `src/constants/outputFormats.ts`
- [x] Define output format type: `export type OutputFormatType = 'xml' | 'markdown' | 'plain';`
- [x] Define format options array for dropdown:
  ```typescript
  export const OUTPUT_FORMAT_OPTIONS = [
    { value: 'xml', label: 'XML', description: 'XML format with tags for file content' },
    { value: 'markdown', label: 'Markdown', description: 'Markdown format with code blocks' },
    { value: 'plain', label: 'Plain Text', description: 'ASCII separators' },
  ];
  ```
- [x] Define storage key: `export const OUTPUT_FORMAT_STORAGE_KEY = 'pastemax-output-format';`

### 2. Add Output Format State Management
- [x] Add output format state in `App.tsx`:
  ```typescript
  const [outputFormat, setOutputFormat] = useState<OutputFormatType>(() => {
    const saved = localStorage.getItem(OUTPUT_FORMAT_STORAGE_KEY);
    return (saved as OutputFormatType) || 'xml';
  });
  ```
- [x] Add persistence effect in `App.tsx`:
  ```typescript
  useEffect(() => {
    localStorage.setItem(OUTPUT_FORMAT_STORAGE_KEY, outputFormat);
  }, [outputFormat]);
  ```
- [x] Pass state to `ControlContainer` component
- [x] Update `ControlContainer.tsx` props interface

### 3. Create Formatter Functions
- [x] Create new utils file `src/utils/formatters.ts`
- [x] Implement XML formatter
- [x] Implement Markdown formatter
- [x] Implement Plain Text formatter
- [x] Implement helper functions:
  - [x] XML escape function for handling special characters
  - [x] Markdown escape function for handling backticks in code blocks
  - [x] Generate file headers for each format

### 4. Update Content Generation
- [x] Modify `getSelectedFilesContent` in `App.tsx` to use formatters

### 5. Add Format Selector UI
- [x] Update `ControlContainer.tsx` to include format selector
- [x] Add appropriate styling to match existing UI

### 6. XML Formatter Implementation Details
- [x] Start with XML declaration if needed
- [x] Create `<file_summary>` section with metadata
- [x] Create `<directory_structure>` for the file tree
- [x] Create `<files>` section with each file in a `<file path="...">` tag
- [x] Properly escape or wrap code in CDATA
- [x] Add user instructions in `<instruction>` tag if present

### 7. Markdown Formatter Implementation Details
- [x] Create `# File Summary` section with metadata
- [x] Create `# Directory Structure` section with tree in code block
- [x] Create `# Files` section with each file as a heading and content in code block
- [x] Add `# Instructions` section if userInstructions is present
- [x] Handle escaping of backticks in code blocks

### 8. Plain Text Formatter Implementation Details
- [x] Create ASCII separators for sections
- [x] List directory structure in plain text
- [x] Format each file with separators
- [x] Add instructions section if present

## Step 4: Prompt Template Selector

### 1. Create Prompt Templates Data Structure
- [x] Create a new constants file `src/constants/promptTemplates.ts`
- [x] Define template interface:
  ```typescript
  export interface PromptTemplate {
    id: string;
    name: string;
    content: string;
    category: string;
  }
  ```
- [x] Define template categories:
  ```typescript
  export type TemplateCategory = 
    | 'Code Review' 
    | 'Documentation Generation' 
    | 'Analysis and Improvement' 
    | 'Testing' 
    | 'Code Quality';
  ```
- [x] Create array of templates
- [x] Define local storage keys

### 2. Create Enhanced UserInstructions Component
- [x] Create new file `src/components/UserInstructionsWithTemplates.tsx`
- [x] Add state for selected template
- [x] Add state for insertion mode
- [x] Add state for confirmation dialog
- [x] Add state for template preview

### 3. Create Template Selection Dropdown
- [x] Group templates by category for the dropdown
- [x] Add dropdown component to the UI
- [x] Implement template selection logic
- [x] Handle template preview on hover

### 4. Implement Template Selection Logic
- [x] Handle template selection
- [x] Implement template insertion
- [x] Save user preferences
- [x] Handle empty/non-empty states

### 5. Add Template Preview
- [x] Create preview UI
- [x] Show template details on hover
- [x] Style preview container
- [x] Add proper ARIA labels

### 6. Add Format Selector UI
- [x] Create confirmation dialog
- [x] Add replace/append options
- [x] Style dialog buttons
- [x] Handle user choice persistence

### 7. Update App.tsx
- [x] Replace UserInstructions with new component
- [x] Pass required props
- [x] Handle state management
- [x] Ensure proper styling

### 8. Styling and UX
- [x] Create CSS module for component
- [x] Add responsive design
- [x] Ensure keyboard navigation
- [x] Add proper focus management
- [x] Follow UX rubric guidelines

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
