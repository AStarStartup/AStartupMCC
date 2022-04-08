$(function(){
  $('#SaveLimit').click(function(){
    var Limit = $('#Limit').val();
    if(Limit) {
      chrome.storage.sync.set({'Limit': Limit}, function() {
        close();
      });
    }
  });
  $('#ResetTotal').click(function() {
    chrome.storage.sync.set({'Total': 0}, function() {
      var NotifyOptions = {
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'Reset total.',
        message: 'The total has been reset.'
      };
      chrome.notifications.create('NotifyLimitReached', NotifyOptions);
    });
  });
});
