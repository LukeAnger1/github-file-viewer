window.addEventListener('load', () => {
    // Get the currently active tab in the window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentUrl = tabs[0].url;  // Get the URL of the active tab
    // alert("URL of current tab: " + currentUrl);
    
    try {
      let fileManager = new fileRetriever(currentUrl);
      fileManager.fetchFileContent().then((content) => {
        // Get the canvas element
        const canvas = document.getElementById('myCanvas');

        // display the canvas element
        fileManager.display(canvas);
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
      // alert(this.digestedURL);
      this.extension = this.digestedURL.split('.').pop(); // This gets the extension to know what to use when opening the file
      // alert(this.extension);
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
          // saves the file content
          this.content = await response.text();
          return this.content;
      } catch (error) {
          throw new Error(`Error fetching file content: ${error.message}`);
      }
  }

  // this is the function to display on the canvas
  display(canvas) {
    try {
      // gets the context
      const ctx = canvas.getContext('2d');
        switch (this.extension) {
          case "txt":
            
            // Set the font properties
            ctx.font = "30px Arial";  // font size and family
            ctx.fillStyle = "blue";   // font color

            // Add text to the canvas
            ctx.fillText(this.content, 50, 50);  // (text, x, y)

            // Add more text with different styling
            ctx.font = "20px Verdana";
            ctx.fillStyle = "green";
            break;
          case "md":

            // Set the font properties
            ctx.font = "30px Arial";  // font size and family
            ctx.fillStyle = "blue";   // font color

            // Add text to the canvas
            ctx.fillText(this.content, 50, 50);  // (text, x, y)

            // Add more text with different styling
            ctx.font = "20px Verdana";
            ctx.fillStyle = "green";
            break;
          default:
            alert(this.extension + " extension is not handled");
            break;
        }
        

    } catch (error) {
      alert("Error: " + error.message);
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