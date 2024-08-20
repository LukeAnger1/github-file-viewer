// testing/test-url-converter.js
const convertToRawUrl = require('../url-converter');

function runTests() {
  try {
    // Test Case 1: Valid GitHub file URL
    let githubUrl = 'https://github.com/NationalSecurityAgency/ghidra/blob/master/LICENSE';
    let expectedRawUrl = 'https://raw.githubusercontent.com/NationalSecurityAgency/ghidra/master/LICENSE';
    let result = convertToRawUrl(githubUrl);
    console.assert(result === expectedRawUrl, `Test Case 1 Failed: Expected ${expectedRawUrl} but got ${result}`);

    // Test Case 2: Another valid GitHub file URL
    githubUrl = 'https://github.com/user/repo/blob/branch/path/to/file.txt';
    expectedRawUrl = 'https://raw.githubusercontent.com/user/repo/branch/path/to/file.txt';
    result = convertToRawUrl(githubUrl);
    console.assert(result === expectedRawUrl, `Test Case 2 Failed: Expected ${expectedRawUrl} but got ${result}`);

    // Test Case 3: Invalid GitHub URL (no /blob/)
    githubUrl = 'https://github.com/user/repo/master/path/to/file.txt';
    try {
      convertToRawUrl(githubUrl);
      console.assert(false, 'Test Case 3 Failed: Expected error for invalid URL');
    } catch (error) {
      console.assert(error.message === 'Invalid GitHub file URL', `Test Case 3 Failed: Expected specific error message but got ${error.message}`);
    }

    // Test Case 4: Invalid GitHub URL (not a GitHub URL)
    githubUrl = 'https://example.com/path/to/file.txt';
    try {
      convertToRawUrl(githubUrl);
      console.assert(false, 'Test Case 4 Failed: Expected error for non-GitHub URL');
    } catch (error) {
      console.assert(error.message === 'Invalid GitHub file URL', `Test Case 4 Failed: Expected specific error message but got ${error.message}`);
    }

    console.log('All test cases passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTests();
