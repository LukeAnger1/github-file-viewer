window.addEventListener('load', () => {
    // Get the currently active tab in the window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentUrl = tabs[0].url;  // Get the URL of the active tab
    alert("URL of current tab: " + currentUrl);
    
    try {
      let test = new fileRetriever(currentUrl);
      test.fetchFileContent().then((content) => {
        alert("File content fetched: " + content);
      }).catch(error => {
        console.error(error);
        alert("Failed to fetch file content: " + error.message);
      });
    } catch (error) {
      alert("Error: " + error.message);
    }
  });
})



// This class will retreive files based off a given url
class fileRetriever {

  // Constructor method
  constructor(rawURL) {
      this.digest(rawURL);
  }

  // This will take a rawURL and set the type of retrieval process that will be used while saving other useful information
  digest(rawURL) {
    console.log("the url before digesting is ", rawURL);
    // alert(rawURL);
    // Check if the URL is a valid GitHub file URL
  if (rawURL.includes('https://github.com/') && rawURL.includes('/blob/')) {

      // Replace the base URL and the 'blob' part with the corresponding raw content URL
      this.digestedURL = rawURL
        .replace('https://github.com/', 'https://raw.githubusercontent.com/').replace('/blob/', '/');

      // This is the type of url to know what needs to be used API wise
      this.type = "github";
      // alert("here101");
      return this.digestedURL;
    } else {
      // alert("here102");
      throw new Error('Invalid GitHub file URL');
    }
  }

  // Method to fetch file content from the digested URL
  async fetchFileContent() {
      try {
          const response = await fetch(this.digestedURL);
          // alert("response1");
          if (!response.ok) {
            // alert("response3");
              throw new Error(`Failed to fetch file content: ${response.statusText}`);
          }
          // alert("response2");
          return await response.text();
      } catch (error) {
        // alert("response4");
          throw new Error(`Error fetching file content: ${error.message}`);
      }
  }
}









// TODO: make a memory catch using the below

// try {
//   // Access the root directory of the Origin Private File System (OPFS)
//   const opfsRoot = await navigator.storage.getDirectory();

//   // Create or get a file in the OPFS
//   const fileHandle = await opfsRoot.getFileHandle('myFile.txt', { create: true });

//   // Create a writable stream to write data to the file
//   const writable = await fileHandle.createWritable();
  
//   // Write some text data to the file
//   await writable.write('Hello from OPFS!');

//   // Close the writable stream (this finalizes the write operation)
//   await writable.close();

//   console.log('File written to OPFS successfully!');

//   // Step 2: Read the file content after writing
//   const file = await fileHandle.getFile();
//   const text = await file.text(); // Get the content of the file as text

//   // Step 3: Print out the content of the file
//   console.log('File content:', text);

  
// } catch (err) {
//   console.error('Error accessing OPFS:', err);
// }