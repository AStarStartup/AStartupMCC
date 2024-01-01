// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import { ModelCommandStructureDefault, ModelCommandStructureSet,
         ModelSessionDefault, ModelSessionSet,
         ModelIssuesClosedSet,
         ModelIssuesOpenSet,
         ModelMissionDefault, ModelMissionSet,
         ModelOptionsDefault, ModelOptionsSet,
         ModelReposSet, }
  from '../Model'
console.log("[Background.ts]")

 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  console.log(sender)
  sendResponse("Received message from [Content.ts]")
 })

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "FeedUpdate") {
    console.log('tick')
    //chrome.storage.local.get(["feeds", "segments"], (res) => {
    //  FeedEstuarySorterProcess(res.feeds, res.segments)
    //})
  }
})

// @todo Inspect video timestamp 3:38:30 for spooky shit.

chrome.runtime.onInstalled.addListener(() => {
  ModelOptionsSet(ModelOptionsDefault)
  ModelCommandStructureSet(ModelCommandStructureDefault)
  ModelIssuesClosedSet({})
  ModelIssuesOpenSet({})
  ModelMissionSet(ModelMissionDefault)
  ModelReposSet({})

  chrome.alarms.create("FeedUpdate", {
    periodInMinutes: 15/60,
  })

  chrome.contextMenus.create({
    "id": "FeedAddSelectionContextMenu",
    "title": "Add selection to feed.",
    "contexts": ["selection"]
  })

  chrome.contextMenus.create({
    "id": "FeedAddPageContextMenu",
    "title": "Add current page to feed."
  })
})
