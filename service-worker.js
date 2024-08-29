chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log('Tab finished loading:', tab.url, ' with type ', typeof(tab.url));

        console.log('making file retreiver object');
        fileRetriever = new fileRetriever(tab.url);
        console.log('after making file retreicer object');

        // This is test code to make sure it is able to retreive the correct data
        console.log('the type is:', fileRetriever.type, 'while the digestedURL is ', fileRetriever.digestedURL);
    }
});

// This class will retreive files based off a given url
class fileRetriever {

    // Constructor method
    constructor(rawURL) {
        this.digest(rawURL);
    }
  
    // This will take a rawURL and set the type of retrieval process that will be used while saving other useful information
    digest(rawURL) {
  
      // Check if the URL is a valid GitHub file URL
      //if (rawURL.includes('https://github.com/') && rawURL.includes('/blob/')) {
    if (rawURL.includes('https://github.com/')) {
  
        // Replace the base URL and the 'blob' part with the corresponding raw content URL
        this.digestedURL = rawURL
          .replace('https://github.com/', 'https://raw.githubusercontent.com/');
  
        // This is the type of url to know what needs to be used API wise
        this.type = "github";
        
        return this.digestedURL;
      } else {
        throw new Error('Invalid GitHub file URL');
      }
    }
  
  }
