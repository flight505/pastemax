import { FileTreeMode } from '../types/FileTypes';

interface FileContent {
  path: string;
  content: string;
  tokenCount?: number;
}

// Helper function to escape XML special characters
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper function to wrap content in CDATA if it contains special characters
function wrapInCDATA(content: string): string {
  if (content.includes(']]>')) {
    // Handle nested CDATA by splitting the string
    return content
      .split(']]>')
      .map(part => `<![CDATA[${part}]]>`)
      .join(']]&gt;');
  }
  return `<![CDATA[${content}]]>`;
}

// Helper function to escape backticks in markdown code blocks
function escapeMarkdownCodeBlock(content: string): string {
  const maxBackticks = content.match(/`+/g)?.reduce((max, curr) => Math.max(max, curr.length), 0) || 0;
  const fenceLength = maxBackticks + 1;
  const fence = '`'.repeat(fenceLength);
  return fence + content + fence;
}

export function formatAsXML(
  files: FileContent[],
  selectedFolder: string | null,
  fileTreeMode: FileTreeMode,
  fileTree: string,
  userInstructions: string
): string {
  const timestamp = new Date().toISOString();
  let output = '<?xml version="1.0" encoding="UTF-8"?>\n';
  output += '<pastemax-export>\n';
  
  // Add metadata
  output += '  <metadata>\n';
  output += `    <timestamp>${timestamp}</timestamp>\n`;
  output += `    <file_count>${files.length}</file_count>\n`;
  if (selectedFolder) {
    output += `    <base_folder>${escapeXML(selectedFolder)}</base_folder>\n`;
  }
  output += '  </metadata>\n\n';

  // Add user instructions if present
  if (userInstructions) {
    output += '  <instructions>\n';
    output += `    ${wrapInCDATA(userInstructions)}\n`;
    output += '  </instructions>\n\n';
  }

  // Add file tree if present
  if (fileTree) {
    output += '  <directory_structure>\n';
    output += `    ${wrapInCDATA(fileTree)}\n`;
    output += '  </directory_structure>\n\n';
  }

  // Add files
  output += '  <files>\n';
  files.forEach(file => {
    output += `    <file path="${escapeXML(file.path)}"`;
    if (file.tokenCount !== undefined) {
      output += ` token_count="${file.tokenCount}"`;
    }
    output += '>\n';
    output += `      ${wrapInCDATA(file.content)}\n`;
    output += '    </file>\n';
  });
  output += '  </files>\n';
  
  output += '</pastemax-export>';
  return output;
}

export function formatAsMarkdown(
  files: FileContent[],
  selectedFolder: string | null,
  fileTreeMode: FileTreeMode,
  fileTree: string,
  userInstructions: string
): string {
  const timestamp = new Date().toISOString();
  let output = '# PasteMax Export\n\n';

  // Add metadata
  output += '## Metadata\n';
  output += `- **Timestamp:** ${timestamp}\n`;
  output += `- **File Count:** ${files.length}\n`;
  if (selectedFolder) {
    output += `- **Base Folder:** \`${selectedFolder}\`\n`;
  }
  output += '\n';

  // Add user instructions if present
  if (userInstructions) {
    output += '## Instructions\n\n';
    output += userInstructions + '\n\n';
  }

  // Add file tree if present
  if (fileTree) {
    output += '## Directory Structure\n\n';
    output += '```\n' + fileTree + '\n```\n\n';
  }

  // Add files
  output += '## Files\n\n';
  files.forEach(file => {
    const extension = file.path.split('.').pop() || '';
    output += `### ${file.path}\n`;
    if (file.tokenCount !== undefined) {
      output += `Token count: ${file.tokenCount}\n\n`;
    }
    output += '```' + extension + '\n' + file.content + '\n```\n\n';
  });

  return output;
}

export function formatAsPlain(
  files: FileContent[],
  selectedFolder: string | null,
  fileTreeMode: FileTreeMode,
  fileTree: string,
  userInstructions: string
): string {
  const timestamp = new Date().toISOString();
  const separator = '='.repeat(80) + '\n';
  let output = '';

  // Add header
  output += separator;
  output += 'PASTEMAX EXPORT\n';
  output += separator + '\n';

  // Add metadata
  output += 'METADATA\n';
  output += separator;
  output += `Timestamp: ${timestamp}\n`;
  output += `File Count: ${files.length}\n`;
  if (selectedFolder) {
    output += `Base Folder: ${selectedFolder}\n`;
  }
  output += '\n';

  // Add user instructions if present
  if (userInstructions) {
    output += separator;
    output += 'INSTRUCTIONS\n';
    output += separator;
    output += userInstructions + '\n\n';
  }

  // Add file tree if present
  if (fileTree) {
    output += separator;
    output += 'DIRECTORY STRUCTURE\n';
    output += separator;
    output += fileTree + '\n\n';
  }

  // Add files
  output += separator;
  output += 'FILES\n';
  output += separator;
  
  files.forEach((file, index) => {
    if (index > 0) output += '\n';
    output += `File: ${file.path}\n`;
    if (file.tokenCount !== undefined) {
      output += `Token Count: ${file.tokenCount}\n`;
    }
    output += separator;
    output += file.content + '\n';
  });

  return output;
} 