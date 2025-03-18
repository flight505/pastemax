/**
 * Test script for the consolidated pattern handling
 */

const path = require('path');
const fs = require('fs');

// Import excluded-files.js patterns
const { 
  excludedFiles, 
  binaryExtensions, 
  systemExclusions, 
  defaultUserPatterns 
} = require('./excluded-files');

// Import main.js functions
const main = require('./main');

// Mock app object for testing
global.app = {
  getPath: (name) => {
    if (name === 'userData') return '/Users/jesper/Library/Application Support/PasteMax';
    return '';
  }
};

console.log('Testing Consolidated Pattern Handling');
console.log('====================================');

// Test paths
const rootDir = '/Users/jesper/Projects/Test';
const pythonFile = path.join(rootDir, 'test.py');

// Test the shouldExcludeByDefault function from main.js
console.log('\nTesting shouldExcludeByDefault from main.js:');
try {
  const isExcluded = main.shouldExcludeByDefault(pythonFile, rootDir);
  console.log(`  Python file would be excluded: ${isExcluded}`);
} catch (err) {
  console.error(`  Error: ${err.message}`);
}

// Verify that systemExclusions contains Python file patterns
console.log('\nVerifying systemExclusions:');
const pythonPatterns = systemExclusions.filter(p => p.includes('.py'));
console.log(`  Python patterns in systemExclusions: ${pythonPatterns.length}`);
pythonPatterns.forEach(p => console.log(`  - ${p}`));

// Verify that defaultUserPatterns contains Python file patterns
console.log('\nVerifying defaultUserPatterns:');
console.log(`  defaultUserPatterns includes *.py: ${defaultUserPatterns.includes('*.py')}`);

console.log('\nPattern sources:');
console.log(`  - systemExclusions: ${systemExclusions.length} patterns`);
console.log(`  - excludedFiles: ${excludedFiles.length} patterns`);
console.log(`  - defaultUserPatterns length: ${defaultUserPatterns.length} characters`);

console.log('\nTest complete.'); 