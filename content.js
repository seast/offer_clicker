// Function to create, update, and remove a progress overlay
const createProgressOverlay = () => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '10px';
  overlay.style.right = '10px';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.color = '#fff';
  overlay.style.padding = '10px';
  overlay.style.borderRadius = '5px';
  overlay.style.zIndex = '10000';
  document.body.appendChild(overlay);

  return {
    update: (text) => {
      overlay.textContent = text;
    },
    remove: () => {
      document.body.removeChild(overlay);
    }
  };
};

// Function to perform clicks with a delay and show progress
const clickWithDelay = (elements, delay, overlay) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.click();
      overlay.update(`Clicked element ${index + 1} of ${elements.length}`);
      
      // Remove overlay after the last element click
      if (index === elements.length - 1) {
        setTimeout(() => {
          overlay.remove();
        }, 1000);
      }
    }, index * delay);
  });
};

// Configuration for handling domain-specific logic
const domainActions = {
  'chase.com': () => {
    const buttons = [];
    document.querySelectorAll('div._1cwzc3r3').forEach((parentElement) => {
      parentElement.querySelectorAll('[role="button"]').forEach((buttonElement) => {
        buttons.push(buttonElement);
      });
    });

    if (buttons.length === 0) {
      alert('No buttons found for chase.com.');
      return;
    }

    const progressOverlay = createProgressOverlay();
    clickWithDelay(buttons, 100, progressOverlay);
  },
  'bankofamerica.com': () => {
    const deals = document.querySelectorAll('a.add-deal.load-available-deal');

    if (deals.length === 0) {
      alert('No deals found for bankofamerica.com.');
      return;
    }

    const progressOverlay = createProgressOverlay();
    clickWithDelay(deals, 100, progressOverlay);
  },
  'americanexpress.com': () => {
    const buttons = document.querySelectorAll('button[title="Add to Card"]');

    if (buttons.length === 0) {
      alert('No buttons found for americanexpress.com.');
      return;
    }

    const progressOverlay = createProgressOverlay();
    clickWithDelay(buttons, 100, progressOverlay);
  }
};

// Function to execute logic based on the current hostname
const executeDomainLogic = () => {
  const hostname = window.location.hostname;

  for (const domain in domainActions) {
    if (hostname.endsWith(domain)) {
      domainActions[domain]();
      break; // Exit the loop after the matching domain's logic is executed
    }
  }
};

// Run the appropriate logic for the current domain
executeDomainLogic();
