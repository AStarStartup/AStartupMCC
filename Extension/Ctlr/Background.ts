// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import { CommandStructureInit, CommandStructureSet, ModelConfigSyncInit, 
ModelConfigSyncGet, ModelConfigSyncSet, ModelIssueInit, ModelIssueSet, 
ModelMissionInit, ModelMissionSet, ModelSessionInit, ModelSessionSet,
ModelSyndicateInit, ModelSyndicateSet } from '../Model'

import { ASessionInit } from '../../Lib/Model'

console.log("[Background.ts]")

 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  console.log(sender)
  sendResponse("Received message from [Content.ts]")
 })

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "Update") {
    //console.log('tick')
    //ModelConfigGet().then((options) => {
    //  console.log(options)
    //})
  }
})

// @todo Inspect video timestamp 3:38:30 for spooky shit.

chrome.runtime.onInstalled.addListener(() => {
  ModelConfigSyncSet(ModelConfigSyncInit)
  CommandStructureSet(CommandStructureInit)
  ModelIssueSet(ModelIssueInit)
  ModelMissionSet(ModelMissionInit)
  ModelSessionSet(ASessionInit)
  ModelSyndicateSet(ModelSyndicateInit)

  chrome.alarms.create("Update", {
    periodInMinutes: 1/60,
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
