// Debug script for Python file exclusion
const fs = require('fs');
const path = require('path');
const ignore = require('ignore');

// Import the pattern definitions
const { 
  excludedFiles, 
  binaryExtensions, 
  systemExclusions, 
  defaultUserPatterns 
} = require('./excluded-files');

// Create test paths
const testDir = process.cwd();
const pythonFile = path.join(testDir, 'test.py');
const relativePath = path.relative(testDir, pythonFile);

console.log('=== Python File Exclusion Debug ===');
console.log(`Test file: ${pythonFile}`);
console.log(`Relative path: ${relativePath}\n`);

// Test with ignore.js directly
const ig = ignore();

// First test with just excludedFiles
console.log('1. Testing with excludedFiles only:');
ig.add(excludedFiles);
console.log(`Python patterns in excludedFiles: ${excludedFiles.filter(p => p.includes('.py') || p === '*.py').length}`);
console.log(`Excluded by excludedFiles: ${ig.ignores(relativePath)}`);

// Create a new instance and test with systemExclusions
console.log('\n2. Testing with systemExclusions only:');
const ig2 = ignore();
ig2.add(systemExclusions);
console.log(`Python patterns in systemExclusions: ${systemExclusions.filter(p => p.includes('.py') || p === '*.py').length}`);
console.log(`Excluded by systemExclusions: ${ig2.ignores(relativePath)}`);

// Create a new instance and test with defaultUserPatterns
console.log('\n3. Testing with defaultUserPatterns:');
const ig3 = ignore();
ig3.add(defaultUserPatterns);
console.log(`defaultUserPatterns includes *.py: ${defaultUserPatterns.includes('*.py')}`);
console.log(`Excluded by defaultUserPatterns: ${ig3.ignores(relativePath)}`);

// Test with combined patterns
console.log('\n4. Testing with all patterns combined:');
const ig4 = ignore();
ig4.add([...excludedFiles, ...systemExclusions]);
ig4.add(defaultUserPatterns);
console.log(`Excluded by combined patterns: ${ig4.ignores(relativePath)}`);

// Check if we need to create a global patterns file
const mockApp = { getPath: () => path.join(process.cwd(), '.pastemax-test') };
const globalPatternsPath = path.join(mockApp.getPath(), 'global_patterns.ignore');

console.log('\n5. Testing global patterns logic:');
try {
  if (!fs.existsSync(mockApp.getPath())) {
    fs.mkdirSync(mockApp.getPath(), { recursive: true });
    console.log(`Created test directory: ${mockApp.getPath()}`);
  }
  
  // Write test global patterns
  const testPatterns = '# Test patterns\n*.py\nnode_modules/';
  fs.writeFileSync(globalPatternsPath, testPatterns);
  console.log(`Created test global patterns file with content:\n${testPatterns}`);
  
  // Test with global patterns
  const ig5 = ignore();
  ig5.add(testPatterns);
  console.log(`Excluded by global patterns: ${ig5.ignores(relativePath)}`);
} catch (err) {
  console.error(`Error in global patterns test: ${err.message}`);
}

console.log('\n=== Debug Complete ==='); 