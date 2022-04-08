chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.todo == "showPageAction") {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      chrome.pageAction.show(tabs[0].id);
    })
  }
});

chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.todo == "changeColor") {
    var addColor = '#' + request.clickedColor;
    $('.api').css('color', addColor);
  }
})
