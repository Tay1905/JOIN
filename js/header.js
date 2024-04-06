/**
 * Initializes the header by loading users, the current user, and setting up initials.
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 */
async function initHeader() {
    await loadUsers();
    await loadCurrentUser();
    initialsHeader();
}

/**
 * Loads the current user asynchronously.
 */
async function loadCurrentUser() {
    currentUser = await getItem('currentUser');
}

/**
 * Gets the initials of the current user for the header.
 * @returns {string} The initials of the current user.
 */
function getInitialsHeader() {
    let names = currentUser.split(" ");
    let initials = names[0].charAt(0) + names[1].charAt(0);
    return initials;
}

/**
 * Sets the initials in the header circle based on the current user.
 */
function initialsHeader() {
    let initialsCircle = document.getElementById('header-initials');
    
    if (currentUser == '') {
        initialsCircle.innerHTML = 'G';
    } else {
        initialsCircle.innerHTML = getInitialsHeader();
    }
}

/**
 * Toggles the visibility of the header initials menu.
 */
function openInitialMenu() {
    let initialDiv = document.getElementById('header-initials-menu');
    initialDiv.classList.toggle('d-none');
}

/**
 * Includes HTML content from external files with 'w3-include-html' attribute.
 * @returns {Promise<void>} A Promise that resolves when HTML inclusion is complete.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); 
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Converts the current URL to use HTTP instead of HTTPS.
 * @returns {string} The converted URL.
 */
function convertCurrentURLToHTTP() {
    const currentURL = window.location.href;

    // Check if the current URL starts with 'https://'
    if (currentURL.startsWith('https://')) {
        // Replace 'https://' with 'http://'
        const convertedURL = currentURL.replace(/^https:\/\//i, 'http://');
        
        // Optional: Set the new URL as the location for redirection
        // window.location.href = convertedURL;

        return convertedURL;
    }

    // If the current URL does not start with 'https://', return it unchanged
    return currentURL;
}

// JavaScript-Code zum Schließen des Menüs beim Klicken außerhalb des Menüs
document.addEventListener("click", function(event) {
    let menu = document.getElementById("header-initials-menu");
    let targetElement = event.target; // Das Element, auf das geklickt wurde
  
    // Überprüfen, ob das geklickte Element innerhalb des Menüs liegt oder das Menü selbst ist
    if (!menu.contains(targetElement) && targetElement.id !== "header-initials") {
      menu.classList.add("d-none"); // Fügt die Klasse "d-none" hinzu, um das Menü auszublenden
    }
  });
  
  function openInitialMenu() {
    var menu = document.getElementById("header-initials-menu");
    menu.classList.toggle("d-none"); // Wechselt zwischen den Klassen "d-none" und "d-block", um das Menü anzuzeigen/auszublenden
  }

