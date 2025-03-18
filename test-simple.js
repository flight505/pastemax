const { 
  excludedFiles, 
  systemExclusions, 
  defaultUserPatterns 
} = require('./excluded-files');

console.log('Python pattern test:');
console.log('1. excludedFiles includes *.py:', excludedFiles.includes('*.py'));
console.log('2. systemExclusions includes *.py or **/*.py:', 
  systemExclusions.includes('*.py') || 
  systemExclusions.includes('**/*.py')
);

// More accurate defaultUserPatterns check
const defaultUserPatternsLines = defaultUserPatterns.split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'));
console.log('3. defaultUserPatterns includes *.py:', defaultUserPatternsLines.includes('*.py'));

// Print all patterns that include 'py'
console.log('\nAll Python-related patterns in excludedFiles:');
excludedFiles.filter(p => p.includes('py')).forEach(p => console.log(`- ${p}`));

console.log('\nAll Python-related patterns in systemExclusions:');
systemExclusions.filter(p => p.includes('py')).forEach(p => console.log(`- ${p}`));

console.log('\nAll pattern lines in defaultUserPatterns:');
defaultUserPatternsLines.forEach(p => console.log(`- ${p}`)); 