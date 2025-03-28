export type OutputFormatType = 'xml' | 'markdown' | 'plain';

export const OUTPUT_FORMAT_OPTIONS = [
  { 
    value: 'xml', 
    label: 'XML', 
    description: 'XML format with tags for file content',
    icon: '🔰'
  },
  { 
    value: 'markdown', 
    label: 'Markdown', 
    description: 'Markdown format with code blocks',
    icon: '📝'
  },
  { 
    value: 'plain', 
    label: 'Plain Text', 
    description: 'Plain text with ASCII separators',
    icon: '📄'
  },
];

export const OUTPUT_FORMAT_STORAGE_KEY = 'pastemax-output-format'; 