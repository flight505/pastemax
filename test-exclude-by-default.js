/**
 * Test script for shouldExcludeByDefault function in main.js
 * This tests if Python files are properly excluded by default
 */

// Mock Electron app for testing
const mockApp = {
  getPath: (name) => {
    if (name === 'userData') return '/Users/jesper/Library/Application Support/PasteMax';
    return '';
  }
};

// Mock required modules
global.app = mockApp;
const path = require('path');
const fs = require('fs');
const ignore = require('ignore');

// Import the required modules from main.js
const { excludedFiles } = require('./excluded-files');
const DEFAULT_EXCLUSIONS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/.git/**",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/*.min.js",
  "**/*.map",
  "**/*.py", // Python source files
  "**/*.png",
  "**/*.jpg",
  "**/*.jpeg",
  "**/*.gif",
  "**/*.ico",
  "**/*.svg",
  "**/*.woff",
  "**/*.woff2",
  "**/*.ttf",
  "**/*.eot",
  "**/*.mp3",
  "**/*.mp4",
  "**/*.webm",
  "**/*.wav",
  "**/*.ogg",
  "**/*.zip",
  "**/*.tar",
  "**/*.gz",
  "**/*.pdf",
];

// Define the normalizePath function
function normalizePath(filePath) {
  if (!filePath) return '';
  return filePath.replace(/\\/g, '/');
}

// Test paths
const rootDir = '/Users/jesper/Projects/Test';
const pythonFile = path.join(rootDir, 'test.py');
const nodePythonFile = path.join(rootDir, 'node_modules', 'some-module', 'test.py');

// Mock shouldExcludeByDefault function based on main.js implementation
function shouldExcludeByDefault(filePath, rootDir) {
  // Normalize both paths to ensure consistent handling
  filePath = normalizePath(filePath);
  rootDir = normalizePath(rootDir);
  
  try {
    // Get the relative path for pattern matching
    let relativePath = filePath;
    if (filePath.startsWith(rootDir)) {
      relativePath = path.relative(rootDir, filePath);
    }
    relativePath = normalizePath(relativePath);
    
    // Create a new ignore instance
    const ig = ignore();
    
    // Debug log for Python files 
    const isPythonFile = relativePath.endsWith('.py');
    const shouldDebug = isPythonFile || relativePath.includes('node_modules');
    
    if (shouldDebug) {
      console.log(`Processing potential exclusion for file: ${relativePath}`);
    }
    
    // Track all patterns for debugging
    let allPatterns = [];
    
    // Add built-in patterns - convert array to a proper string format for the ignore package
    const builtInPatterns = [...excludedFiles, ...DEFAULT_EXCLUSIONS];
    ig.add(builtInPatterns);
    allPatterns = builtInPatterns;
    
    if (isPythonFile) {
      console.log('Built-in patterns that could affect Python files:');
      builtInPatterns.filter(p => p.includes('py')).forEach(p => {
        console.log(`  - ${p}`);
      });
    }
    
    // Try to load global patterns if available - skipped for this test
    // Try to load local patterns if available - skipped for this test
    
    // Check if the file should be excluded
    const isExcluded = ig.ignores(relativePath);
    
    // Enhanced debugging
    if (shouldDebug) {
      console.log(`Checking file: ${relativePath}`);
      console.log(`Excluded: ${isExcluded}`);
      
      // Log if any specific pattern matches (helps troubleshoot which pattern is causing the exclusion)
      if (isExcluded) {
        console.log(`Applied patterns: ${allPatterns.join(', ')}`);
        
        // Test each pattern individually to find which ones match
        allPatterns.forEach(pattern => {
          if (pattern && pattern.trim()) {
            const testIg = ignore().add(pattern);
            if (testIg.ignores(relativePath)) {
              console.log(`  Match found with pattern: ${pattern}`);
            }
          }
        });
      }
    }
    
    return isExcluded;
  } catch (err) {
    console.error(`Error checking if file should be excluded: ${filePath}`, err);
    // Default to not excluding in case of an error
    return false;
  }
}

// Run the tests
console.log('Testing shouldExcludeByDefault for Python files');
console.log('----------------------------------------------');

console.log('\nTest Case 1: Python file in root directory');
const isExcluded1 = shouldExcludeByDefault(pythonFile, rootDir);
console.log(`Result: Python file ${isExcluded1 ? 'would be excluded' : 'would NOT be excluded'}`);

console.log('\nTest Case 2: Python file in node_modules');
const isExcluded2 = shouldExcludeByDefault(nodePythonFile, rootDir);
console.log(`Result: node_modules Python file ${isExcluded2 ? 'would be excluded' : 'would NOT be excluded'}`);

console.log('\nTests complete.'); 