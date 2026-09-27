let medicines = JSON.parse(localStorage.getItem("medicines")) || [];


// ===============================
// SAVE MEDICINES
// ===============================
function saveMedicines() {
    localStorage.setItem("medicines", JSON.stringify(medicines));
}


// ===============================
// DISPLAY MEDICINES
// ===============================
function displayMedicines() {

    const medicineList = document.getElementById("medicineList");

    medicineList.innerHTML = "";

    if (medicines.length === 0) {
        medicineList.innerHTML = "<p>No medicines added yet.</p>";
        updateDashboard();
        displayHistory();
        return;
    }

    medicines.forEach(function(medicine, index) {

        const medicineDiv = document.createElement("div");

        medicineDiv.innerHTML = `
            <h3>💊 ${medicine.name}</h3>

            <p>⏰ Time: ${medicine.time}</p>

            <p>📅 Date: ${medicine.date}</p>

            <button onclick="markTaken(${index})">
                ✅ Taken
            </button>

            <button onclick="markMissed(${index})">
                ❌ Missed
            </button>

            <button onclick="deleteMedicine(${index})">
                🗑️ Delete
            </button>

            <p class="status">
                Status: ${medicine.status}
            </p>
        `;

        medicineList.appendChild(medicineDiv);
    });

    updateDashboard();
    displayHistory();
}


// ===============================
// ADD MEDICINE
// ===============================
function addMedicine() {

    const medicineName =
        document.getElementById("medicineName").value;

    const medicineTime =
        document.getElementById("medicineTime").value;

    const medicineDate =
        document.getElementById("medicineDate").value;


    if (
        medicineName === "" ||
        medicineTime === "" ||
        medicineDate === ""
    ) {
        alert("Please enter medicine name, time, and date.");
        return;
    }


    const newMedicine = {

        name: medicineName,

        time: medicineTime,

        date: medicineDate,

        status: "Pending"

    };


    medicines.push(newMedicine);

    saveMedicines();

    displayMedicines();


    document.getElementById("medicineName").value = "";

    document.getElementById("medicineTime").value = "";

    document.getElementById("medicineDate").value = "";
}


// ===============================
// MARK AS TAKEN
// ===============================
function markTaken(index) {

    medicines[index].status = "Taken ✅";

    saveMedicines();

    displayMedicines();
}


// ===============================
// MARK AS MISSED
// ===============================
function markMissed(index) {

    medicines[index].status = "Missed ❌";

    saveMedicines();

    displayMedicines();
}


// ===============================
// DELETE MEDICINE
// ===============================
function deleteMedicine(index) {

    medicines.splice(index, 1);

    saveMedicines();

    displayMedicines();
}


// ===============================
// DASHBOARD
// ===============================
function updateDashboard() {

    const total = medicines.length;

    let taken = 0;

    let missed = 0;


    medicines.forEach(function(medicine) {

        if (medicine.status.includes("Taken")) {
            taken++;
        }

        if (medicine.status.includes("Missed")) {
            missed++;
        }

    });


    const pending = total - taken - missed;


    document.getElementById("totalCount").textContent = total;

    document.getElementById("takenCount").textContent = taken;

    document.getElementById("missedCount").textContent = missed;

    document.getElementById("pendingCount").textContent = pending;
}


// ===============================
// MEDICINE HISTORY
// ===============================
function displayHistory() {

    const historyList =
        document.getElementById("historyList");


    if (!historyList) {
        return;
    }


    historyList.innerHTML = "";


    if (medicines.length === 0) {

        historyList.innerHTML =
            "<p>No history available yet.</p>";

        return;
    }


    medicines.forEach(function(medicine) {

        const historyItem =
            document.createElement("div");


        historyItem.innerHTML = `

            <h3>💊 ${medicine.name}</h3>

            <p>📅 Date: ${medicine.date}</p>

            <p>⏰ Time: ${medicine.time}</p>

            <p>📌 Status: ${medicine.status}</p>

            <hr>

        `;


        historyList.appendChild(historyItem);

    });
}


// ===============================
// MEDICINE REMINDER
// ===============================
function checkMedicineReminder() {

    const now = new Date();


    const currentDate =
        now.toISOString().split("T")[0];


    const currentTime =
        now.getHours().toString().padStart(2, "0")
        + ":" +
        now.getMinutes().toString().padStart(2, "0");


    medicines.forEach(function(medicine) {

        if (
            medicine.date === currentDate &&
            medicine.time === currentTime &&
            medicine.status === "Pending"
        ) {

            alert(
                "🔔 Medicine Reminder!\n\n" +
                "Time to take: " +
                medicine.name
            );


            medicine.status = "Reminder Shown";

            saveMedicines();

            displayMedicines();

        }

    });
}


// Check reminder every 30 seconds
setInterval(checkMedicineReminder, 30000);


// ===============================
// LOAD EVERYTHING WHEN PAGE OPENS
// ===============================
displayMedicines();
// ===============================
// HISTORY FILTER
// ===============================
function filterHistory(filter) {

    const historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    let filteredMedicines = medicines;

    if (filter === "Today") {

    const today = new Date().toISOString().split("T")[0];

    filteredMedicines = medicines.filter(function(medicine) {
        return medicine.date === today;
    });

}
else if (filter !== "All") {

    filteredMedicines = medicines.filter(function(medicine) {

        return medicine.status.includes(filter);

    });

}
    if (filteredMedicines.length === 0) {

        historyList.innerHTML =
            "<p>No medicines found.</p>";

        return;
    }

    filteredMedicines.forEach(function(medicine) {

        const historyItem =
            document.createElement("div");

        historyItem.innerHTML = `
            <h3>💊 ${medicine.name}</h3>
            <p>📅 Date: ${medicine.date}</p>
            <p>⏰ Time: ${medicine.time}</p>
            <p>📌 Status: ${medicine.status}</p>
            <hr>
        `;

        historyList.appendChild(historyItem);

    });
}
// ===============================
// SEARCH HISTORY
// ===============================
function searchHistory() {

    const searchText =
        document.getElementById("historySearch").value.toLowerCase();

    const historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    const results = medicines.filter(function(medicine) {

        return medicine.name.toLowerCase().includes(searchText);

    });

    if (results.length === 0) {

        historyList.innerHTML =
            "<p>No medicines found.</p>";

        return;
    }

    results.forEach(function(medicine) {

        const historyItem =
            document.createElement("div");

        historyItem.innerHTML = `
            <h3>💊 ${medicine.name}</h3>
            <p>📅 Date: ${medicine.date}</p>
            <p>⏰ Time: ${medicine.time}</p>
            <p>📌 Status: ${medicine.status}</p>
            <hr>
        `;

        historyList.appendChild(historyItem);

    });
}
