// Nightstalker-themed Census Form Script (Updated with TXT generation)

const form = document.getElementById("censusForm");
const msg = document.getElementById("messages");

// TXT file generator
function downloadResultsAsTxt(data) {
  const content = `State Census Submission\n\n` +
    `Full Name: ${data.fullName}\n` +
    `Occupation: ${data.occupation}\n` +
    `Street Address: ${data.address}\n` +
    `ZIP Code: ${data.zip}\n` +
    `Number of People in Household: ${data.household}\n` +
    `Age of Head of Household: ${data.age}\n` +
    `Submission Time: ${new Date().toLocaleString()}`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "census_result.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// Handle submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    fullName: form.fullName.value,
    occupation: form.occupation.value,
    address: form.address.value,
    zip: form.zip.value,
    household: form.household.value,
    age: form.age.value
  };

  downloadResultsAsTxt(data);

  msg.textContent = "Submission successful. Your TXT file has been downloaded.";
});
