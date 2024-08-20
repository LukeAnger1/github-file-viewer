// console.log("before");
const convertToRawUrl = require('../url-converter');
// // console.log("after");

fileUrl = 'https://github.com/NationalSecurityAgency/ghidra/blob/master/LICENSE';

async function main (fileUrl) {
    if (fileUrl) {
        try {
            // Change the URL from the top of the web browser to the file URL
            const newFileUrl = convertToRawUrl(fileUrl);

            console.log("the old url is ", fileUrl);
            console.log("with the old type as ", typeof fileUrl);
            console.log("the new url is ", newFileUrl);
            console.log("with the new type as ", typeof newFileUrl);

            // Await the fetch and response.text() methods
            const response = await fetch(newFileUrl);
            const fileContent = await response.text();

            if (response.ok) {
                console.log(fileContent);
            } else {
                console.log("Failed to retrieve the file.");
            }
        } catch (error) {
            console.log("Error fetching the file:", error);
        }
    } else {
        console.log("Please enter a GitHub file URL.");
    }
}

main(fileUrl)