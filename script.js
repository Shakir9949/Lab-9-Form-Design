const form = document.getElementById("censusForm");
const msg = document.getElementById("messages");

let fileHandle = null; // stores handle to user-selected file

async function saveToTxtFile(data) {
    const content = `State Census Submission\n\n` +
        `Full Name: ${data.fullName}\n` +
        `Occupation: ${data.occupation}\n` +
        `Street Address: ${data.address}\n` +
        `ZIP Code: ${data.zip}\n` +
        `Number of People in Household: ${data.household}\n` +
        `Age of Head of Household: ${data.age}\n` +
        `Submission Time: ${new Date().toLocaleString()}`;

    try {
        if (!fileHandle) {
            // Ask user to pick or create file
            [fileHandle] = await window.showSaveFilePicker({
                suggestedName: "census_result.txt",
                types: [{
                    description: 'Text Files',
                    accept: { 'text/plain': ['.txt'] },
                }],
            });
        }

        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
        msg.textContent = "Submission saved to TXT file successfully.";
    } catch (err) {
        console.error(err);
        msg.textContent = "Error saving file. Make sure your browser supports File System Access API.";
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

    await saveToTxtFile(data);
});
