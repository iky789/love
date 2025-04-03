// Fetch the username from sessionStorage
const username = sessionStorage.getItem('username');
if (username) {
    document.getElementById('username').textContent = username;

    // Simulate processing before showing the dashboard
    setTimeout(() => {
        // Hide the loading screen
        document.getElementById('loading-screen').style.display = 'none';
        
        // Show the dashboard content
        document.getElementById('dashboard-container').style.display = 'block';
    }, 3000); // Adjust the time as per your preference (5000ms = 5 seconds)
} else {
    window.location.href = 'index.html'; // Redirect to login if not logged in
}

// Love Meter Dynamic Update
let lovePercentage = 0;
const loveMeter = document.getElementById('progress-bar');
const loveMeterPercentage = document.getElementById('love-meter-percentage');

function incrementLoveMeter() {
    if (lovePercentage < 100) {
        lovePercentage += 5;
        loveMeter.style.width = `${lovePercentage}%`;
        loveMeterPercentage.textContent = `Our love is at ${lovePercentage}%!`;

        if (lovePercentage === 100) {
            clearInterval(loveInterval);
        }
    }
}

const loveInterval = setInterval(incrementLoveMeter, 5000);

// Show Password Prompt
function showPasswordPrompt() {
    const password = prompt("Enter the password to unlock our secret tab:");
    const correctPassword = "12345";

    if (password === correctPassword) {
        document.getElementById("secret-content").style.display = "block";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Handle Logout
function logout() {
    sessionStorage.removeItem('username');
    alert('You have logged out successfully!');
    window.location.href = 'index.html';
}

// Load saved gallery items from localStorage
function loadGallery() {
    const galleryContainer = document.getElementById("gallery-uploaded");
    const storedItems = JSON.parse(localStorage.getItem("galleryItems")) || [];

    galleryContainer.innerHTML = ""; // Clear existing items

    storedItems.forEach((item, index) => {
        createGalleryItem(item.src, item.type, index);
    });
}

// Save gallery items to localStorage
function saveGallery(items) {
    localStorage.setItem("galleryItems", JSON.stringify(items));
}

// Function to create and display gallery items
function createGalleryItem(src, type, index) {
    const galleryContainer = document.getElementById("gallery-uploaded");

    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item-container");

    const mediaElement = document.createElement(type.startsWith("video") ? "video" : "img");
    mediaElement.src = src;
    mediaElement.classList.add("gallery-item");

    if (type.startsWith("video")) {
        mediaElement.controls = true;
    }

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = function () {
        removeGalleryItem(index);
    };

    galleryItem.appendChild(mediaElement);
    galleryItem.appendChild(removeBtn);
    galleryContainer.appendChild(galleryItem);
}

// Remove a gallery item
function removeGalleryItem(index) {
    let galleryItems = JSON.parse(localStorage.getItem("galleryItems")) || [];
    galleryItems.splice(index, 1); // Remove selected item
    saveGallery(galleryItems);
    loadGallery(); // Reload gallery
}

// Handle file upload
function previewFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        let galleryItems = JSON.parse(localStorage.getItem("galleryItems")) || [];
        const newItem = { src: e.target.result, type: file.type };

        galleryItems.push(newItem);
        saveGallery(galleryItems);
        loadGallery();
    };
    reader.readAsDataURL(file);
}

// Load gallery items when the page loads
window.onload = loadGallery;
