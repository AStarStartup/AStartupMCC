// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import {  }
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

import { ModelConfigInit, ModelConfigSet, CommandStructureInit, CommandStructureSet, ModelIssueInit, ModelIssueSet, ModelMissionInit, ModelMissionSet, ModelSessionInit, ModelSessionSet, 
  ModelSyndicateSet } from '../Model'
chrome.runtime.onInstalled.addListener(() => {
  ModelConfigSet(ModelConfigInit)
  CommandStructureSet(CommandStructureInit)
  ModelIssueSet(ModelIssueInit)
  ModelMissionSet(ModelMissionInit)
  ModelSessionSet(ModelSessionInit)
  ModelSyndicateSet(ModelMissionInit)

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
