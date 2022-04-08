

class Mission {

  issueNumber = -1;
  
  constructor() {
    console.log('[Show.js] constructor');
  }

  printIssueTicket() {
    return "";
  }
  
  // Speaks the given string.
  speak(string) {
    chrome.tts.speak(string);
  }
}
