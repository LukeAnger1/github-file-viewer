alert("running here");


// // window.addEventListener('load', () => {
// chrome.runtime.onMessage.addListener(() => {
//   // This code gets the current url
//   let currentUrl = window.location.href;

//   let test = new fileRetriever(currentUrl);
  
//   alert(currentUrl);
// });

// // This class will retreive files based off a given url
// class fileRetriever {

//   // Constructor method
//   constructor(rawURL) {
//       this.digest(rawURL);
//   }

//   // This will take a rawURL and set the type of retrieval process that will be used while saving other useful information
//   digest(rawURL) {

//     // Check if the URL is a valid GitHub file URL
//     if (rawURL.includes('https://github.com/') && rawURL.includes('/blob/')) {

//       // Replace the base URL and the 'blob' part with the corresponding raw content URL
//       this.digestedURL = rawURL
//         .replace('https://github.com/', 'https://raw.githubusercontent.com/')
//         .replace('/blob/', '/');

//       // This is the type of url to know what needs to be used API wise
//       this.type = "github";
      
//       return this.digestedURL;
//     } else {
//       alert("throwing an error");
//       throw new Error('Invalid GitHub file URL');
//     }
//   }

// }








// /// Working on code belpow

// // async function getFileFromGitHub(repoUrl, filePath) {
// //   // Extract the user, repo, and branch name from the Git URL
// //   const match = repoUrl.match(/https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/tree\/([^\/]+))?/);
  
// //   if (!match) {
// //       throw new Error('Invalid GitHub URL');
// //   }

// //   const user = match[1];
// //   const repo = match[2];
// //   const branch = match[4] || 'main';  // Default to 'main' if no branch is specified

// //   // Construct the URL for the GitHub API
// //   const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}?ref=${branch}`;

// //   // Fetch the file content from GitHub
// //   const response = await fetch(apiUrl);
// //   if (!response.ok) {
// //       throw new Error('File not found or failed to fetch');
// //   }

// //   const fileData = await response.json();

// //   // Decode the content from base64
// //   const fileContent = atob(fileData.content);

// //   // Display the file content in the browser
// //   const fileViewer = document.getElementById('fileViewer');
// //   fileViewer.textContent = fileContent;
// // }