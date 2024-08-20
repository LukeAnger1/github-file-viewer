document.getElementById("fetchFile").addEventListener("click", async () => {
  const fileUrl = document.getElementById("fileUrl").value;

  if (fileUrl) {
    try {
      const response = await fetch(fileUrl);
      const fileContent = await response.text();
      
      if (response.ok) {
        document.getElementById("fileContent").textContent = fileContent;
      } else {
        alert("Failed to retrieve the file.");
      }
    } catch (error) {
      alert("Error fetching the file.");
    }
  } else {
    alert("Please enter a GitHub file URL.");
  }
});
