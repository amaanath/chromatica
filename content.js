function applyBWFilter() {
    document.body.style.filter = 'grayscale(100%)';
  }
  
  function removeBWFilter() {
    document.body.style.filter = 'none';
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggleFilter") {
      if (request.state) {
        applyBWFilter();
      } else {
        removeBWFilter();
      }
    }
  });
  
  chrome.storage.sync.get(['filterEnabled', 'defaultSites'], function(data) {
    if (data.filterEnabled && data.defaultSites) {
      const currentHost = window.location.hostname;
      if (data.defaultSites.some(site => currentHost.includes(site))) {
        applyBWFilter();
      }
    }
  });