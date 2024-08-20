// import { convertToRawUrl } from './url-converter.js';

document.getElementById("fetchFile").addEventListener("click", async () => {
  const fileUrl = document.getElementById("fileUrl").value;

  if (fileUrl) {
    try {

      // alert("before the new file url");

      // Change the url from the top of the web browser to the file url
      // const newFileUrl = convertToRawUrl(fileUrl);

      // alert("the old url is ", fileUrl);
      // alert(" the new url is ", newFileUrl);

      const response = await fetch(fileUrl);
      const fileContent = await response.text();
      
      if (response.ok) {
        document.getElementById("fileContent").textContent = fileContent;
      } else {
        alert("Failed to retrieve the file. remove this later");
      }
    } catch (error) {
      alert("Error fetching the file. remove this later too");
    }
  } else {
    alert("Please enter a GitHub file URL.");
  }
});
