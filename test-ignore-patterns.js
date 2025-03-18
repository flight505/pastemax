/**
 * Test script for PasteMax ignore patterns
 * This will test if .py files are properly excluded
 */

const path = require('path');
const fs = require('fs');
const ignore = require('ignore');
const { excludedFiles } = require('./excluded-files');

// Mock paths for testing
const rootDir = '/Users/jesper/Projects/Test';
const pythonFile = path.join(rootDir, 'test.py');

console.log('Testing ignore patterns for Python files');
console.log('----------------------------------------');

// Create a new ignore instance
const ig = ignore();

// Log the patterns that could affect Python files
console.log('Patterns that could affect Python files:');
const pythonPatterns = excludedFiles.filter(p => 
  p.includes('py') || p === '*.py' || p === '.py'
);

pythonPatterns.forEach(p => {
  console.log(`  - ${p}`);
});

// Add all patterns to the ignore instance
ig.add(excludedFiles);

// Test if the Python file would be ignored
const relativePath = path.relative(rootDir, pythonFile);
const isIgnored = ig.ignores(relativePath);

console.log('\nTesting file:', relativePath);
console.log('Would be ignored:', isIgnored);

// Test against individual patterns for debugging
console.log('\nIndividual pattern tests:');
pythonPatterns.forEach(pattern => {
  const testIg = ignore().add([pattern]);
  const isMatch = testIg.ignores(relativePath);
  console.log(`  - Pattern "${pattern}": ${isMatch ? 'MATCH' : 'no match'}`);
});

console.log('\nTest complete.'); 