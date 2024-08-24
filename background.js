chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
      filterEnabled: true,
      defaultSites: ['example.com', 'anotherexample.com']
    });
  });