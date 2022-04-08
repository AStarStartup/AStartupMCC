var contextMenuItem = {
  "id": "addBullet",
  "title": "Add mission",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function fixedEncoderURI(str) {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(click) {
  if(click.menuItemId == "addBullet" && click.selectionText) {
    var url = "";
  }
});

function isInt(Value) {
  return !isNaN(Value) &&
         parseInt(Number(Value)) == value &&
         !isNaN(parseInt(Value, 10));
}

chrome.contextMenus.onClicked.addListener(function(click) {
  if (click.menuItemId == "wikit" && click.selectionText) {
    if(isFinite(click.selectionText)){
      chrome.storage.sync.get(['Total', 'Limit'], function(Budget){
        var newTotal = 0;
        if (Budget.Total) {
          newTotal = parseInt(Budget.Total);
        }
        newTotal += parseInt(click.selectionText);
        chrome.storage.sync.set({'Total': newTotal}, function (){
          if (newTotal >= Budget.Limit){
            var NotifyOptions = {
              type: 'basic',
              iconUrl: 'icon48.png',
              title: 'Limit reached!',
              message: "You've hit the limits!"
            };
            chrome.notifications.create('NotifyLimitReached', NotifyOptions);
          }
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener(function(changes, storageName) {
  chrome.browserAction.setBadgeText({"text": changes.Total.newValue.toString()});
});
