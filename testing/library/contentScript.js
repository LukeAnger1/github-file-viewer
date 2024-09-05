// First, you need to load the isomorphic-git library
;(async () => {
    try {
    
      // Create an in-memory file system using BrowserFS (optional, or if you want to avoid saving to the actual file system)
    //   const fs = new LightningFS('fs');

    try {
        // Access the root directory of the Origin Private File System (OPFS)
        const opfsRoot = await navigator.storage.getDirectory();
    
        // Create or get a file in the OPFS
        const fileHandle = await opfsRoot.getFileHandle('myFile.txt', { create: true });
    
        // Create a writable stream to write data to the file
        const writable = await fileHandle.createWritable();
        
        // Write some text data to the file
        await writable.write('Hello from OPFS!');
    
        // Close the writable stream (this finalizes the write operation)
        await writable.close();

        console.log('File written to OPFS successfully!');

        // Step 2: Read the file content after writing
        const file = await fileHandle.getFile();
        const text = await file.text(); // Get the content of the file as text

        // Step 3: Print out the content of the file
        console.log('File content:', text);

        
      } catch (err) {
        console.error('Error accessing OPFS:', err);
      }
  

      // URL to a public git repo, for example, the `isomorphic-git` repo itself
      const gitUrl = 'https://github.com/isomorphic-git/isomorphic-git';
  
      // Clone the repository into an in-memory filesystem
      await git.clone({
        fs,
        dir: '/repo',    // Directory where the repo will be cloned (in memory)
        url: gitUrl,
        ref: 'main',      // You can specify the branch (or default)
        singleBranch: true,
        depth: 1          // Shallow clone to get only the latest commit
      });
  
      // List all branches
      const branches = await git.listBranches({ fs, dir: '/repo' });
  
      // Log the branches to verify the success of the clone and branch listing
      console.log('Branches in the repository:', branches);
  
    } catch (err) {
      console.error('Error interacting with Git:', err);
    }
  })();
  