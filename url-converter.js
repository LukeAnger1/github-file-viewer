// url-converter.js
function convertToRawUrl(githubUrl) {
  // Check if the URL is a valid GitHub file URL
  if (githubUrl.includes('https://github.com/') && githubUrl.includes('/blob/')) {
    // Replace the base URL and the 'blob' part with the corresponding raw content URL
    const rawUrl = githubUrl
      .replace('https://github.com/', 'https://raw.githubusercontent.com/')
      .replace('/blob/', '/');
    
    return rawUrl;
  } else {
    throw new Error('Invalid GitHub file URL');
  }
}

// Export the function for testing
module.exports = convertToRawUrl;
