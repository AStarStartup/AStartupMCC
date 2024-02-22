// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

'use client'

import { AIssueTicket } from '../../Lib/Model'
import { DataAccess } from '../../Lib/Model/IDB'
import { ModelIssueSet } from '../Model'

export default function UseModelState(account: string, repo: string) {
  let db_name: string = account + '/' + repo
  let store_name: string = 'Issues'
  const idb = new DataAccess<AIssueTicket>(db_name, store_name);

  function ModelStateReducer(state, action: object) {
    switch (action['verb']) {
      case 'SelectIssue': {
        const UID = action['uid']
        if(UID == undefined) return
        const Issue = idb.Get(UID)
        ModelIssueSet({ ...state, issue: Issue })
        return state
      }
      case 'SelectMission': {
        const UID = action['uid']
        if(UID == undefined) return
        const Issue = idb.Get(UID)
        ModelIssueSet({ ...state, mission: Issue })
        return state
      }
      default: return state
    }
  }

  return [ idb, ModelStateReducer ]
}
