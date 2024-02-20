// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import React, { useState } from 'react'
import { ModelConfigSync, ModelConfigSyncSet } from '../Model'

const { LLIDNextHex } = require('linearid')

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
    Config   : ModelConfigSync
    ConfigSet: (o: ModelConfigSync) => void
    Syndicate: object
  }) {
  
  const { Config, ConfigSet, Syndicate } = props
  let { account, mission, repo } = Config
  console.log('MissionSelector: account:"' + account + '" repo:"' + repo
            + '" mission:"' + mission + '"')
  console.log('Config:')
  console.log(Config)
  console.log("Syndicate:")
  console.log(Syndicate)
  console.log("repo:")
  console.log(repo)
  
  let repos: string[] = []
  let issues: string[] = []
  
  //const [ Account, AccountSet ] = useState(Config.account)

  console.log('Iterating through Syndicates...')
  Object.entries(Syndicate || {}).forEach(([account_key, account_value]) => {
    if(account != account_key && account != 'All') return
    console.log('Processing entries for account:' + account + ' s_key:' + account_key)
    //Accounts.push(key)
    let Repos = Object(account_value)['Repos']
    console.log('Account:"' + 
      Object.keys(Syndicate).find(key => Syndicate[key] === account_value) + '"')
    console.assert(Repos != undefined)
    console.log('Repos:')
    console.log(Repos)
    console.log('Iterating through Repos:')
    repos.push(repo ?? '.github')
    Object.entries(Repos || {}).forEach(([repo_key, repo_value]) => {
      console.log('key:"' + repo_key + '" + repo_value:')
      console.log(repo_value)
      if(account === account_key && repo === repo_key) {
        console.log('Creating list of issues...')
        let repo_issues = Object(repo_value)['issues_open']
        console.log('my_issues:')
        console.log(repo_issues)
        Object.entries(repo_issues || {}).map(([issue_key, issue_value]) => {
          issues.push('#' + issue_key + ' ' + issue_value)
          console.log("'#' + key2 + ' ' + value2:" + '#' + issue_key + ' ' 
                    + issue_value)
        })
      }
      else {
        repos.push(repo_key)
      }
    })
    console.log('Done!')
  })
  console.log("repos:")
  console.log(repos)
  console.log("issues:")
  console.log(issues)


  return <div className="MissionSelector w-lg w-full max-w-lg">
    <div id='AccountSelector'>
      <label htmlFor="Accounts">Account:</label>
      <select name="Accounts" id="Accounts" className='max-w-fit'
        onChange={(e) => {
          console.log("Changing Account:" + e.target.value)
          ConfigSet({...Config, account: e.target.value})
      }} value={account}>
      { Object.keys(Syndicate).map((key) => (
        <option value={key} selected={(key == account) ? true : false}
          key={LLIDNextHex()}>
          {key}
        </option>
      ))}
        <option value='All'>All</option>
      </select>
    </div>
    <div id='RepoSelector'>
      <label htmlFor="Repos">Repo:</label>
      <select name="Repos" id="Repos" className='max-w-fit'
        onChange={(e) => {
          console.log("Changing Repo:" + e.target.value)
          const ConfigNew = {...Config, account: Config.account, repo: e.target.value}
          ModelConfigSyncSet(ConfigNew).then(() => {
            ConfigSet(ConfigNew)
          })
        }} value={account}>
        { repos.map((key) => (
          <option value={key} selected={(key === repo) ? true : false}
            key={LLIDNextHex()}>
            {key}
          </option>
        ))}
      </select>
    </div>
    <div id='IssueSelector'>
      <label htmlFor="Issues">Issues:</label>
      <select name="Issues" id="Issues" className='max-w-fit'
        onChange={(e) => {
          console.log(e.target.value);
          const ConfigNew = {...Config, mission_ids: e.target.value}
          ModelConfigSyncSet(ConfigNew).then(() => {
            ConfigSet(ConfigNew)
          })
        }} value={mission}>
        { issues.map((issue_num_title) => (
          <option value={issue_num_title} 
              selected={IssueIsSelected(issue_num_title, mission.toString())}
              key={LLIDNextHex()}>
            {issue_num_title}
          </option>
        ))}
      </select>
    </div>
  </div>
}
