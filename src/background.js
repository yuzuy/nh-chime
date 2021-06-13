chrome.runtime.onMessage.addListener(data => {
  switch (data.type) {
    case 'set':
      chrome.alarms.create(data.title, {when: data.when});
      break;
    case 'clear':
      chrome.alarms.clearAll();
      break;
  }
});

chrome.alarms.onAlarm.addListener(alarm => {
  chrome.notifications.create({
    type: 'basic',
    title: '🔔',
    message: alarm.name,
    iconUrl: 'icon.png'
  })
})
