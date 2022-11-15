console.log("[Background.ts]")

 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  console.log(sender)
  sendResponse("Received message from [Content.ts]")
 })
 