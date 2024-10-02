chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (!tab.url.includes("youtube.com")) {
        chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
          tabs.forEach((ytTab) => {
            chrome.scripting.executeScript({
              target: { tabId: ytTab.id },
              function: pauseVideo
            });
          });
        });
      }
    });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
      chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
        tabs.forEach((ytTab) => {
          chrome.scripting.executeScript({
            target: { tabId: ytTab.id },
            function: pauseVideo
          });
        });
      });
    }
  });
  
  function pauseVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  