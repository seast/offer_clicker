// Function to create and update a progress message overlay on the webpage
function showProgressMessage(message) {
  let overlay = document.getElementById('progressOverlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'progressOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '20px';
    overlay.style.right = '20px';
    overlay.style.padding = '10px';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = '#fff';
    overlay.style.borderRadius = '5px';
    overlay.style.zIndex = '10000';
    document.body.appendChild(overlay);
  }

  overlay.textContent = message;
}

// Function to remove the progress message overlay
function removeProgressMessage() {
  const overlay = document.getElementById('progressOverlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }
}

function getCurrentDomain() {
  const hostname = window.location.hostname; // Get the full hostname
  const domainParts = hostname.split('.'); // Split the hostname into parts
  const domain = domainParts.slice(-2).join('.'); // Join the last two parts
  return domain; // Return the last two parts as the domain (e.g., 'chase.com')
}
// Function to scan and save elements based on the domain
function scanAndSaveElements() {
  const domain = getCurrentDomain();
  const buttons = []; // Array to hold found buttons

  // Use a specific scanning method based on the domain
  if (domain === 'americanexpress.com') {
    scanAmericanExpressElements(buttons);
  } else if (domain === 'chase.com') {
    scanChaseElements(buttons);
  }

  return buttons; // Return the array of found buttons
}

// Helper function to scan elements for americanexpress.com
function scanAmericanExpressElements(buttons) {
  const elements = document.querySelectorAll('button[title="Add to Card"]');
  if (elements.length > 0) {
    elements.forEach((element, index) => {
      buttons.push(element); // Add element to buttons array
    });
  }
}


// Helper function to scan elements for chase.com
function scanChaseElements(buttons) {
  const parentElements = document.querySelectorAll('div._1cwzc3r3');
  parentElements.forEach((parentElement) => {
    const buttonElements = parentElement.querySelectorAll('[role="button"]');
    buttonElements.forEach((buttonElement) => {
      buttons.push(buttonElement); // Add button element to buttons array
    });
  });
}

function clickElements(elements, delay = 100) {
  const totalElements = elements.length;
  if (totalElements === 0) {
    showProgressMessage(`can not find any items`);
    setTimeout(removeProgressMessage, 5000); // Delay before removing
    return;
  }

  elements.forEach((element, index) => {
    setTimeout(() => {
      if (element) {
        element.click();
        showProgressMessage(`Clicked element ${index + 1} of ${totalElements}`);
        console.log(`Clicked element ${index + 1}:`, element);
      }

      // Remove progress message after the last click
      if (index === totalElements - 1) {
        setTimeout(removeProgressMessage, 5000); // Delay before removing
      }
    }, index * delay); // Increment delay for each element
  });
}

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanElements') {
    const elements = scanAndSaveElements();

    clickElements(elements, 200);
  }
  return true; // Keep the messaging channel open for async responses if needed
});
