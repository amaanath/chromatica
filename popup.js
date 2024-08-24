document.addEventListener('DOMContentLoaded', function() {
    const toggleFilter = document.getElementById('toggleFilter');
    const defaultSitesTextarea = document.getElementById('defaultSites');
    const saveButton = document.getElementById('saveSettings');
  
    chrome.storage.sync.get(['filterEnabled', 'defaultSites'], function(data) {
      toggleFilter.checked = data.filterEnabled;
      defaultSitesTextarea.value = data.defaultSites ? data.defaultSites.join('\n') : '';
    });
  
    toggleFilter.addEventListener('change', function() {
      const newState = toggleFilter.checked;
      chrome.storage.sync.set({filterEnabled: newState}, function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "toggleFilter", state: newState});
        });
      });
    });
  
    saveButton.addEventListener('click', function() {
      const defaultSites = defaultSitesTextarea.value.split('\n').filter(site => site.trim() !== '');
      chrome.storage.sync.set({defaultSites: defaultSites}, function() {
        alert('Settings saved!');
      });
    });
  });