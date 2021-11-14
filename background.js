chrome.runtime.onMessage.addListener(data => {
  switch (data.type) {
    case 'set':
      chrome.tabs.query({active: true, currentWindow: true})
        .then(tabs => {
          const curTab = tabs[0];
          const alarmV = {
            title: data.title,
            tabId: curTab.id,
          };
          chrome.alarms.create(JSON.stringify(alarmV), {when: data.when});
        });
      break;
    case 'clear':
      chrome.alarms.clearAll();
      break;
  }
});

chrome.alarms.onAlarm.addListener(alarm => {
  const alarmV = JSON.parse(alarm.name);
  chrome.notifications.create(
    '',
    {
      type: 'basic',
      title: '🔔',
      message: alarmV.title,
      iconUrl: 'icon.png',
      requireInteraction: true,
    },
    notificationId => {
      const notificationIdToTabId = {};
      notificationIdToTabId[notificationId] = alarmV.tabId;
      chrome.storage.local.set(notificationIdToTabId);
    },
  );
});

chrome.notifications.onClosed.addListener(notificationId => {
  chrome.storage.local.get(notificationId, notificationIdToTabId => {
    const tabId = notificationIdToTabId[notificationId];
    chrome.tabs.get(tabId)
      .then(tab => chrome.tabs.highlight({tabs: tab.index}))
  });
});
