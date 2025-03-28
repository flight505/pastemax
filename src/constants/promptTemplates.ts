export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  category: TemplateCategory;
  description?: string;
  icon?: string;
}

export type TemplateCategory = 
  | 'Code Review' 
  | 'Documentation Generation' 
  | 'Analysis and Improvement' 
  | 'Testing' 
  | 'Code Quality';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'architecture-review',
    name: 'Architecture Review',
    category: 'Code Review',
    icon: '🏗️',
    description: 'Analyze codebase architecture, patterns, and suggest improvements',
    content: `Architecture Review:
- Analyze this codebase's architecture:
1. Evaluate the overall structure and patterns
2. Identify potential architectural issues
3. Suggest improvements for scalability
4. Note areas that follow best practices
Focus on maintainability and modularity.`
  },
  {
    id: 'security-review',
    name: 'Security Review',
    category: 'Code Review',
    icon: '🔒',
    description: 'Identify security vulnerabilities and suggest fixes',
    content: `Security Review:
Perform a security review of this codebase:
1. Identify potential security vulnerabilities
2. Check for common security anti-patterns
3. Review error handling and input validation
4. Assess dependency security
Provide specific examples and remediation steps.`
  },
  {
    id: 'performance-review',
    name: 'Performance Review',
    category: 'Code Review',
    icon: '⚡',
    description: 'Analyze performance bottlenecks and optimization opportunities',
    content: `Performance Review
Review the codebase for performance:
1. Identify performance bottlenecks
2. Check resource utilization
3. Review algorithmic efficiency
4. Assess caching strategies
Include specific optimization recommendations.`
  },
  {
    id: 'api-documentation',
    name: 'API Documentation',
    category: 'Documentation Generation',
    icon: '📚',
    description: 'Generate comprehensive API documentation',
    content: `API Documentation
Generate comprehensive API documentation:
1. List and describe all public endpoints
2. Document request/response formats
3. Include usage examples
4. Note any limitations or constraints`
  },
  {
    id: 'developer-guide',
    name: 'Developer Guide',
    category: 'Documentation Generation',
    icon: '📖',
    description: 'Create a comprehensive guide for developers',
    content: `Developer Guide
Create a developer guide covering:
1. Setup instructions
2. Project structure overview
3. Development workflow
4. Testing approach
5. Common troubleshooting steps`
  },
  {
    id: 'architecture-documentation',
    name: 'Architecture Documentation',
    category: 'Documentation Generation',
    icon: '🏛️',
    description: 'Document system architecture and design decisions',
    content: `Architecture Documentation
Document the system architecture:
1. High-level overview
2. Component interactions
3. Data flow diagrams
4. Design decisions and rationale
5. System constraints and limitations`
  },
  {
    id: 'dependency-analysis',
    name: 'Dependency Analysis',
    category: 'Analysis and Improvement',
    icon: '📦',
    description: 'Analyze project dependencies and suggest improvements',
    content: `Dependency Analysis
Analyze the project dependencies:
1. Identify outdated packages
2. Check for security vulnerabilities
3. Suggest alternative packages
4. Review dependency usage patterns
Include specific upgrade recommendations.`
  },
  {
    id: 'test-coverage',
    name: 'Test Coverage Review',
    category: 'Testing',
    icon: '🧪',
    description: 'Review test coverage and suggest improvements',
    content: `Test Coverage Review
Review the test coverage:
1. Identify untested components
2. Suggest additional test cases
3. Review test quality
4. Recommend testing strategies`
  },
  {
    id: 'code-quality',
    name: 'Code Quality Assessment',
    category: 'Code Quality',
    icon: '✨',
    description: 'Assess code quality and suggest improvements',
    content: `Code Quality Assessment
Assess code quality and suggest improvements:
1. Review naming conventions
2. Check code organization
3. Evaluate error handling
4. Review commenting practices
Provide specific examples of good and problematic patterns.`
  }
];

export const TEMPLATE_STORAGE_KEY = 'pastemax-last-template';
export const TEMPLATE_INSERT_MODE_KEY = 'pastemax-template-insert-mode';
export type TemplateInsertMode = 'replace' | 'append'; 