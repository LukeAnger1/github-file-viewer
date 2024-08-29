chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log('Tab finished loading:', tab.url, ' with type ', typeof(tab.url));

        console.log('making file retreiver object');
        fileRetrieverObj = new fileRetriever(tab.url);
        console.log('after making file retreicer object');

        // This is test code to make sure it is able to retreive the correct data
        console.log('the type is:', fileRetrieverObj.type, 'while the digestedURL is ', fileRetrieverObj.digestedURL);

        // Fetch the file content and log it
        fileRetrieverObj.fetchFileContent().then(content => {
            console.log('File content retrieved:', content);
        }).catch(error => {
            console.error('Error retrieving file content:', error);
        });

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
    if (rawURL.includes('https://github.com/') && rawURL.includes('/blob/')) {
  
        // Replace the base URL and the 'blob' part with the corresponding raw content URL
        this.digestedURL = rawURL
          .replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/');
  
        // This is the type of url to know what needs to be used API wise
        this.type = "github";
        
        return this.digestedURL;
      } else {
        throw new Error('Invalid GitHub file URL');
      }
    }
  
    // Method to fetch file content from the digested URL
    async fetchFileContent() {
        try {
            const response = await fetch(this.digestedURL);
            if (!response.ok) {
                throw new Error(`Failed to fetch file content: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            throw new Error(`Error fetching file content: ${error.message}`);
        }
    }
  }
