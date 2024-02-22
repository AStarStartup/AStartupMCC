// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React from 'react'
import { RepoGitHub, ModelConfigSync, ModelConfigSyncSet 
} from '../Model'

const { LLIDNextHex } = require('linearid')

export function ListReposAndIssues(Syndicate: object, account: string,
    repo: string) {
  let repo_names: string[] = []
  let issue_id_strings: string[] = []
  console.log('Iterating through Syndicates...')
  Object.entries(Syndicate || {}).forEach(([account_key, account_value]) => {
    if(account != account_key && account != 'All') return [[], []]
    console.log('Processing entries for account:' + account + ' s_key:' + account_key)
    //Accounts.push(key)
    let Repos = Object(account_value)['Repos']
    console.log('Account:"' + 
      Object.keys(Syndicate).find(key => Syndicate[key] === account_value) + '"')
    console.assert(Repos != undefined)
    console.log('Repos:')
    console.log(Repos)
    console.log('Iterating through Repos:')
    repo_names.push(repo ?? '.github')
    Object.entries(Repos || {}).forEach(([repo_key, repo_value]) => {
      console.log('key:"' + repo_key + '" + repo_value:')
      console.log(repo_value)
      if(account === account_key && repo === repo_key) {
        console.log('Creating list of issues...')
        let repo_issues = Object(repo_value)['issues_open']
        console.log('my_issues:')
        console.log(repo_issues)
        Object.entries(repo_issues || {}).map(([issue_key, issue_value]) => {
          issue_id_strings.push('#' + issue_key + ' ' + issue_value)
          console.log("'#' + key2 + ' ' + value2:" + '#' + issue_key + ' ' 
                    + issue_value)
        })
      }
      else {
        repo_names.push(repo_key)
      }
    })
    console.log('Done!')
  })
  console.log("repos:")
  console.log(repo_names)
  console.log("issues:")
  console.log(issue_id_strings)
  return [repo_names, issue_id_strings]
}

// Checks if the issue_num_title starts off with #mission_number_string (i.e #123).
export function IssueIsSelected(issue_num_title: string, mission_number_string: string) {
  const MLength = mission_number_string.length
  //if(MLength < 1 || issue_num_title.length <= MLength) return false; 
  // Example issue_is_selected: "ABC" or "A123" or "#123 Working example"
  let issue_is_selected = issue_num_title[0] != '#' && MLength < 1 
                       && issue_num_title.length <= MLength
  //if(!issue_is_selected) return issue_is_selected
  let i = 0
  for(; i < MLength; ++i) {
    if(issue_num_title[i + 1] != mission_number_string[i]) {
      issue_is_selected = false
      break
    }
  }
  return issue_is_selected && issue_num_title[i + 1] == ' '
}

export default function MissionSelector(props: { 
    ConfigSync    : ModelConfigSync
    ConfigSyncSet: (o: ModelConfigSync) => void
    Syndicate: object
  }) {
  
  const { ConfigSync, ConfigSyncSet, Syndicate } = props
  let { account, mission_ids, repo } = ConfigSync
  console.log('MissionSelector: account:"' + account + '" repo:"' + repo
            + '" mission:"' + mission_ids + '"')
  console.log('Config:')
  console.log(ConfigSync)
  console.log("Syndicate:")
  console.log(Syndicate)
  console.log("repo:")
  console.log(repo)
  
  if(account == undefined || repo == undefined || mission_ids == undefined)
    return <div>Config == null</div>
  
  let [repos, issues] = ListReposAndIssues(Syndicate, account, repo)

  return <div className="MissionSelector w-lg w-full max-w-lg">
    <div id='AccountSelector'>
      <label htmlFor="Accounts">Account:</label>
      <select name="Accounts" id="Accounts" className='max-w-fit'
        onChange={(e) => {
          console.log("Changing Account:" + e.target.value)
          ConfigSyncSet({...ConfigSync, account: e.target.value})
      }} value={account}>
      { Object.keys(Syndicate).map((key) => (
        <option value={key} key={LLIDNextHex()}>
          {key}
        </option>
      ))}
        <option value='All'>All</option>
      </select>
    </div>
    <div id='RepoSelector'>
      <label htmlFor="Repos">Repo:</label>
      <select name="Repos" id="Repos" className='max-w-fit'
        onChange={e => {
          console.log("Changing Repo:" + e.target.value)
          const ConfigNew = {...ConfigSync, account: ConfigSync.account, repo: e.target.value}
          ModelConfigSyncSet(ConfigNew).then(() => {
            ConfigSyncSet(ConfigNew)
          })
        }} value={repo}>
        { repos.map((key) => (
          <option value={key}
            key={LLIDNextHex()}>
            {key}
          </option>
        ))}
      </select>
    </div>
    <div id='MissionSelector'>
      <label htmlFor="Missions">Missions:</label>
      <select name="Missions" id="Missions" className='max-w-fit'
        onChange={(e) => {
          console.log(e.target.value);
          const ConfigNew = {...ConfigSync, mission_ids: e.target.value}
          ModelConfigSyncSet(ConfigNew).then(() => {
            ConfigSyncSet(ConfigNew)
          })
        }} value={mission_ids}>
        { issues.map((issue_num_title) => (
          <option value={issue_num_title}
              key={LLIDNextHex()}>
            {issue_num_title}
          </option>
        ))}
      </select>
    </div>
  </div>
}
