import { ModelDataCommandStructureDefault, ModelDataCommandStructureSet,
         ModelDataSessionsPastDefault, ModelDataSessionsPastSet,
         ModelDataSessionsFutureDefault, ModelDataSessionsFutureSet,
         ModelDataSessionDefault, ModelDataSessionSet,
         ModelDataMissionsPastDefault, ModelDataMissionsPastSet,
         ModelDataMissionsFutureDefault, ModelDataMissionsFutureSet,
         ModelDataMissionDefault, ModelDataMissionSet,
         ModelDataOptionsDefault, ModelDataOptionsSet,
         ModelDataProjectsColdDefault, ModelDataProjectsColdSet,
         ModelDataProjectsDoneDefault, ModelDataProjectsDoneSet,
         ModelDataProjectsHotDefault, ModelDataProjectsHotSet,
         ModelDataProjectsWarmDefault, ModelDataProjectsWarmSet,
         ModelDataProjectDefault, ModelDataProjectSet, }
  from '../ModelData'
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
  ModelDataOptionsSet(ModelDataOptionsDefault)
  ModelDataCommandStructureSet(ModelDataCommandStructureDefault)
  ModelDataSessionsPastSet(ModelDataSessionsPastDefault)
  ModelDataSessionsFutureSet(ModelDataSessionsFutureDefault)
  ModelDataSessionSet(ModelDataSessionDefault)
  ModelDataMissionsPastSet(ModelDataMissionsPastDefault)
  ModelDataMissionsFutureSet(ModelDataMissionsFutureDefault)
  ModelDataMissionSet(ModelDataMissionDefault)
  ModelDataProjectsColdSet(ModelDataProjectsColdDefault)
  ModelDataProjectsWarmSet(ModelDataProjectsWarmDefault)
  ModelDataProjectsHotSet(ModelDataProjectsHotDefault)
  ModelDataProjectsDoneSet(ModelDataProjectsDoneDefault)
  ModelDataProjectSet(ModelDataProjectDefault)

  chrome.alarms.create("FeedUpdate", {
    periodInMinutes: 1/60,
  });

  chrome.contextMenus.create({
    "id": "FeedAddSelectionContextMenu",
    "title": "Add selection to feed.",
    "contexts": ["selection"]
  });

  chrome.contextMenus.create({
    "id": "FeedAddPageContextMenu",
    "title": "Add current page to feed."
  });
})
