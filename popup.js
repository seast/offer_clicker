document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('myButton');

  if (button) {
    button.addEventListener('click', () => {
      console.log('Button clicked!');
      // Send a message to the content script to show a progress message
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scanElements' }, (response) => {
          if (chrome.runtime.lastError) {
            //console.error('Error:', chrome.runtime.lastError);
          } else {
            //alert('Scan initiated. Check the console for results.');
          }
        });
      });
    });
  }
});
