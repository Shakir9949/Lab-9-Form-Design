const form = document.getElementById("censusForm");
const msg = document.getElementById("messages");

let fileHandle = null; // Stores user-selected or generated file handle

async function appendToTxtFile(data) {
    const content = `State Census Submission\n\n` +
        `Full Name: ${data.fullName}\n` +
        `Occupation: ${data.occupation}\n` +
        `Street Address: ${data.address}\n` +
        `ZIP Code: ${data.zip}\n` +
        `Number of People in Household: ${data.household}\n` +
        `Age of Head of Household: ${data.age}\n` +
        `Submission Time: ${new Date().toLocaleString()}\n` +
        `-----------------------------\n`;

    try {
        // If no file selected yet, prompt user to pick one
        if (!fileHandle) {
            try {
                const [handle] = await window.showOpenFilePicker({
                    types: [{
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] }
                    }],
                    multiple: false
                });
                fileHandle = handle;
            } catch (err) {
                // User canceled: generate new file
                fileHandle = await window.showSaveFilePicker({
                    suggestedName: "census_result.txt",
                    types: [{
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] }
                    }]
                });
            }
        }

        // Read existing content (if any)
        let existingContent = "";
        try {
            const file = await fileHandle.getFile();
            existingContent = await file.text();
        } catch (_) {
            existingContent = ""; // File empty or newly created
        }

        // Append new data
        const writable = await fileHandle.createWritable();
        await writable.write(existingContent + content);
        await writable.close();

        msg.textContent = "Submission saved successfully!";
    } catch (err) {
        console.error(err);
        msg.textContent = "Error saving file. Ensure your browser supports the File System Access API.";
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        fullName: form.fullName.value,
        occupation: form.occupation.value,
        address: form.address.value,
        zip: form.zip.value,
        household: form.household.value,
        age: form.age.value
    };

    await appendToTxtFile(data);
});
