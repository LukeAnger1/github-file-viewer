chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: fetchGitHubFile
  });
});

async function fetchGitHubFile() {
  const fileUrl = prompt("Enter the GitHub file URL:");

  if (fileUrl) {
    try {
      const response = await fetch(fileUrl);
      const fileContent = await response.text();
      
      if (response.ok) {
        console.log("File Content:", fileContent);
        alert("File content retrieved. Check the console for details.");
      } else {
        console.error("Failed to retrieve file:", response.statusText);
        alert("Failed to retrieve the file. Please check the URL.");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
      alert("Error fetching the file.");
    }
  } else {
    alert("No URL provided.");
  }
}
