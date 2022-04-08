$(function(){
  var color = $("#fontColor").val();
  $('#fontColor').on("change paste keyup", function(){
    color = $(this).val();
  })
  $('#btnChange').click(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color});
    })
  })
  chrome.storage.sync.get('Total', function(Budget) {
    $('#Total').text(Budget.Total);
    $('#Limit').text(Budget.Limit);
  });
  $('#Buy').click(function(){
    var NotifyOptions = {
      type: 'basic',
      iconUrl: 'icon48.png',
      title: 'Limit reached!',
      message: "You've hit the limits!"
    };
    chrome.notifications.create('NotifyLimitReached', NotifyOptions);

    chrome.storage.sync.get(['Total', 'Limit'], function(Budget){
      var NewTotal = 0;
      if (Budget.Total){
        NewTotal += parseInt(Budget.Total);
      }
      var Amount = $('#Amount').val();
      if(Amount){
        NewTotal += parseInt(Amount);
      }
      chrome.storage.sync.set({'Total': NewTotal}, function() {
        if(Amount && NewTotal >= Budget.Limit){
          NewTotal += parseInt(Amount);
          var NotifyOptions = {
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Limit reached!',
            message: "You've hit the limits!"
          };
          chrome.notifications.create('NotifyLimitReached', NotifyOptions);
        }
      });
      $('#Total').text(NewTotal);
      $('#Amount').val('');
    });
  });
});

// When the user clicks on <div>, open the popup
function TogglePopup() {
  var popup = document.getElementById("TestPopup");
  popup.classList.toggle("show");
}
