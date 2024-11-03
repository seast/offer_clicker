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

// Function to check if the current URL matches "americanexpress.com" and scan for elements
function scanAndSaveElements(selector, domain) {
  // Check if the current page's URL matches the specified domain
  if (window.location.hostname.includes(domain)) {
    console.log(`Current URL matches ${domain}. Scanning for elements...`);

    // Find all elements matching the provided selector
    const elements = document.querySelectorAll(selector);

    if (elements.length > 0) {
      console.log(`Found ${elements.length} elements with selector "${selector}".`);
      elements.forEach((element, index) => {
        console.log(`Element ${index + 1}:`, element);
      });
      console.log('All elements have been saved and printed to the console.');
      return Array.from(elements); // Return the elements as an array
    } else {
      console.log(`No elements found with selector "${selector}".`);
    }
  } else {
    console.log(`Current URL does not match ${domain}. No scan performed.`);
  }
  return []; // Return an empty array if no elements are found
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
    }, delay); // Increment delay for each element
  });
}

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanElements') {
    const elements = scanAndSaveElements('button[title="Add to Card"]', 'americanexpress.com');

    clickElements(elements, 200);
  }
  return true; // Keep the messaging channel open for async responses if needed
});
