// Copyright AStartup; license at https://github.com/AStartupMCC

import { ASession } from '../../Lib/Model'

export const UsernameInit = 'CookingWithCale'

// Model configuration settings that get synced with the browser.
export type ModelConfigSync = {
  account?: string            //< Current account.
  content_scripts: boolean    //< Content scripts enabled.
  me?: string                 //< The user's Username.
  metric_units?: boolean      //< Standard (true) or Imperial units.
  mission_ids?: string        //< Current mission ID string.
  repo?: string               //< Current repo.
  session?: number            //< Current session number (zero means clocked out).
  session_ids?: string        //< The session ID string.
  them?: string               //< Currently selected syndicate member.
}

// Local model configuration settings.
export type ModelConfigLocal = {
  account?: string            //< Selected account.
  mission_ids?: string        //< Selected mission.
  modal_state: number         //< State of the modal.
  modal_visible: boolean      //< Modal is visible flag.
  repo?: string               //< Selected repo.
  session?: number            //< Selected session number.
}

// An Incident Command System or similar structure meta model.
export type ACommandStructure = {
  uid: string                 //< 128-bit linear id.
  idx: number                 //< 64-bit packed inode index.
  name: string                //< Command structure name.
  key: string                 //< The unique key of the command structure.
  description: string         //< Description of the command structure.
  contacts: string            //< Point contacts.
  date_created: Date          //< Date created.
  date_modified: Date         //< Date modified.
  meta: object                //< Command structure meta model.
}

// The global app model state.
export type ModelState = {
  config_sync?: ModelConfigSync   //< Synced model config settings.
  config_local?: ModelConfigLocal //< Local model config settings.
  command_structure?: Object  //< Meta model for the incident command structure.
  issue?: Object              //< Current issue.
  mission?: Object            //< Current mission.
  repo?: RepoGitHub           //< Current repository.
  session?: ASession          //< Current session.
  syndicate?: Object          //< GitHub accounts in the syndicate.
}//< Projects worked on in this session.

export type ContentFeed = {
  title: string           //< Title of the feed.
  description: string     //< Description of the feed.
  handle: string          //< Handle of the feed.
  url: string             //< Not sure what this is.
  url_feed: string        //< The URL of the feed.
  header: string          //< HTML/CSS header for this feed.
}

export type ContentFeedCategory = {
  title: string           //< Title of the category.
  color: string           //< Identifying color.
  icon: string            //< Icon for the category.
  header: string          //< Header for feed of this category.
  feeds: ContentFeed[]     //< Array of feeds in this category.
}

export type Enclosure = {
  url: string
  length: number
  type: string
}

export type ContentFeedItem = {
  uid: bigint             //< 128-bit Unique ID.
  idx: bigint             //< 64-bit inode index.
  link: string            //< Link to the feed item target.
  guid: string            //< Unique id of the feed item.
  title: string           //< Title of the feed item.
  date_pub: number        //< Original date of publican.
  creator: string         //< Creator of the feed item.
  summary: string         //< Brief summary of the feed entry.
  content: string         //< Feed item contents.
  date_iso: number        //< ISO Date of publication.
  categories?: string     //< Comma separated list of categories.
  content_snippet: string //< HTML snippet for the feed item.
  word_bag: Object        //< Object containing the bag of words values.
}

export type AForm = {
  title: string,          //< Form title.
  description: string,    //< Form description.
  instructions: string,   //< Instructions on completing the form.
  log: Object             //< Form change log.
}

export type ACommandStructureNode = {
  master: string,         //< Master of this role (i.e the boss)
  contact: Object,        //< Contact information for this role.
  supervisor: string,     //< Supervisor role key of this role.
}

export type ModelKeys = keyof ModelState

export const ModelConfigSyncInit: ModelConfigSync = {
  content_scripts: false,
  metric_units: true,
  me: UsernameInit,
  them: '',
  session: 0,
  session_ids: '',
  account: 'AStarStartup',
  repo: 'AStartupMCC',
  mission_ids: ''
}

export const ModelConfigLocalInit: ModelConfigLocal = {
  account: '',
  mission_ids: '',
  modal_visible: false,
  modal_state: 0,
  repo: '',
  session: 0,
}

// Unpacks the account/repo#MissionNumber.ChildMission from the input string.
export function MissionStringUnpack(input: string) {
  let state = 0
  let account = ''
  let repo = ''
  let mission_number = ''
  let child_mission = ''
  let i = 0
  let c: string | undefined = input[i++]
  let o = '\nParsing input:"' + input + '"'
  while (c != undefined) {
    switch(state) {
      case 0: { // Parsing org
        o += '\naccount:"' + account + '" c:' + c + ' i:' + i;
        if(c == '/') {
          c = input[i++]
          state = 1
          break
        }
        account += c
        c = input[i++]
        break
      }
      case 1: { // Parsing repo
        o += '\nrepo:"' + repo + '" c:' + c + ' i:' + i;
        if(c == '#') {
          c = input[i++]
          state = 2
          break
        }
        repo += c
        c = input[i++]
        break
      }
      case 2: { // Parsing mission number.
        o += '\nmission_number:"' + mission_number + '" c:' + c + ' i:' 
           + i;
        if(c == '.') {
          c = input[i++]
          state = 3
          break
        }
        if(c < '0' || c > '9') {
          console.assert(c > '', 'ERROR: invalid child mission at i:' 
                      + i + ' c:' + c.charCodeAt(0) + ' i:' + i)
          c = undefined
          break
        }
        mission_number += c
        c = input[i++]
        break
      }
      case 3: { // Parsing Child Mission
        o += '\nchild_mission:"' + child_mission + '" c:' + c + ' i:' + i;
        if(c <= ' ') {
          console.assert(c > '', 'ERROR: invalid child mission at i:' 
                      + i + ' c:' + c.charCodeAt(0))
          c = undefined
          break
        }
        child_mission += c
        c = input[i++]
        break
      }
      default: {
        c = undefined
        break
      }
    }
  }
  o += '\nFound account:"' + account + '" repo:"' + repo 
     + '" mission_number:"' + mission_number 
     + '" child_mission:"' + child_mission + '"'
  console.log(o)
  return [ account, repo, parseInt(mission_number), child_mission ]
}

export function MissionSelectedString(syndicate: Object, account: string, repo: string, 
  mission: number) {
  let result = 'Error in MissionSelectedString'
  result = syndicate[account]?.['Repos']?.[repo]?.['issues_open']?.
    [mission.toString()]
  return '#' + mission + ' ' + result
  // const Account = syndicate[account]
  // if(Account == undefined) return 'Account == undefined'
  // const Repos = Account['Repos']
  // if(Repos == undefined) return 'Repos == undefined'
  // const Repo = Account[repo]
  // if(Repo == undefined) return 'Repo == undefined'
  // const IssuesOpen = Account['issues_open']
  // if(IssuesOpen == undefined) return 'IssuesOpen == undefined'
  // const MissionTitle = Account[mission.toString()]
  // if(MissionTitle == undefined) return 'IssuesOpen[mission] == undefined'
  // return '#' + mission + ' ' + MissionTitle
}

// The vanilla Incident Command System Structure.
export const CommandStructureInit = {
  'command_roles': {
    ['Commander']: {
      'master': null,
      'contact': {},
      'supervisors': null
    },
    ['PublicInformation']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    },
    ['Liaison']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    },
    ['Safety']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    },
    ['Operations']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    },
    ['Planning']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    },
    ['Logistics']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    },
    ['FinanceAdmin']: {
      'master': null,
      'contact': {},
      'supervisors': null,
    }
  } 
}
export type GitHubIssue = {
  title: string         //< Issue title.
  open: boolean         //< Open (true) or closed (false).
}

export type RepoGitHub = {
  account: string       //< Repo account.
  name: string          //< Repo name.
  visibility: boolean   //< Visibility: public (true) or private (false).
  issue_count: number   //< The number of issues in the ITS.
  issue_count_open: number  //< All of the open issue tickets.
}

export type GitHubAccount = {
  type: string          //< Account type: 'Person' or 'Org'.
  repos: Object         //< Account repos.
}

export const ModelSyndicateInit: Object = {
  "AStarStartup": {
    "Type": "Org",
    "Repos": {
      "AStartupMCC": {
        "issues_open": {
          "86": "Abilities.Add: Can set and crop background in OBS for thumbnail",
          "85": "ContextMenu.Add quick paste feature",
          "75": "ContextMenu.AddAbility Right click on GitHub issue tickets and add them to the current mission or set as the current mission",
          "71": "Options.Abilities: Can switch property key casing",
          "28": "Abilities.Add: Can select a dummy account, repo, mission, and child mission",
          "22": "Timesheet Logger (v0.1)",
          "14": "ProductManager.Abilities.Add: Can add and remove products"
        },
        "visibility": true
      },
      "AStartupToolkit": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "LinearId": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "OBSFX": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      ".github": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "AStartupGitTemplate": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "AStartupCookbook": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "AStartupWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "StreamSeq": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "Channel": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "OBSTouchGIMP": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
    }
  },
  "CookingWithCale": {
    "Type": "Person",
    "Repos": {
      "BadThing": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      ".github": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "FreedomCookbook": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "SickBay>": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "metascrapper": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "MetamediaDownloader": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "Self": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      }
    }
  },
  "KabukiStarship": {
    "Type": "Org",
    "Repos": {
      "Script2": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      ".github": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "Actors": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekPolygonWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "KabukiLIcenses": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekCookbook": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "StarshipCookbook": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "KabukiPressCookbook": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "MusictechCookbook": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeek": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekCardsWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "KabukiStarship.github.io": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "KabukiToolkit": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "IMUL": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "ScriptTek": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekMazeWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekPacWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekTileWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "iGeekVirusWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "KabukiBenchmark": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": true
      },
      "KabukiPress": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "KabukiSearch": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "SearchFor4.669": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "IAmPy": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "iGeekWikiWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "iGeekUlator": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "iGeekBlockWorld": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "KabukiDB": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      },
      "KabukiTheater": {
        "issues_open": {
          "1": "Session.Next.Monday",
          "2": "Session.Next.Tuesday"
        },
        "visibility": false
      }
    }
  }
}

export function ModelConfigLocalGet(): Promise<ModelConfigLocal> {
  const keys: ModelKeys[] = ['config_local']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (state: ModelState) => {
      resolve(state.config_local ?? ModelConfigLocalInit)
    })
  })
}

export function ModelConfigLocalSet(config: ModelConfigLocal): Promise<void> {
  const Values: ModelState = {
    config_local: config,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelConfigSyncGet(): Promise<ModelConfigSync> {
  const keys: ModelKeys[] = ['config_sync']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (state: ModelState) => {
      resolve(state.config_sync ?? ModelConfigSyncInit)
    })
  })
}

export function ModelConfigSyncSet(config: ModelConfigSync): Promise<void> {
  const Values: ModelState = {
    config_sync: config,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}

export function CommandStructureGet(): Promise<Object> {
  const keys: ModelKeys[] = ['command_structure']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (state: ModelState) => {
      resolve(state.command_structure ?? CommandStructureInit)
    })
  })
}

export function CommandStructureSet(command_structure: Object): Promise<void> {
  const Values: ModelState = {
    command_structure,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}

export const RepoGithubDefault: RepoGitHub = {
  account: '',
  name: '',
  visibility: false,
  issue_count: 0,
  issue_count_open: 0,
}

export function ModelRepoGet(): Promise<RepoGitHub> {
  const keys: ModelKeys[] = ['repo']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (state: ModelState) => {
      resolve(state.repo ?? RepoGithubDefault)
    })
  })
}

export function ModelRepoSet(repo: RepoGitHub): Promise<void> {
  const Values: ModelState = {
    repo,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}

export function ModelIssueGet(): Promise<Object> {
  const keys: ModelKeys[] = ['issue']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (state: ModelState) => {
      resolve(state.issue ?? {})
    })
  })
}

export function ModelIssueSet(issue: Object): Promise<void> {
  const Values: ModelState = {
    issue,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}

export function ModelMissionGet(): Promise<Object> {
  const keys: ModelKeys[] = ['mission']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (state: ModelState) => {
      resolve(state.mission ?? {})
    })
  })
}

export const ModelIssueInit = {}

export const ModelMissionInit = {}

export const ModelSessionInit = {}

export function ModelMissionSet(mission: Object): Promise<void> {
  const Values: ModelState = {
    mission,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}

export function ModelSessionSet(session: ASession): Promise<void> {
  const Values: ModelState = {
    session,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}

export function ModelSyndicateGet(): Promise<Object> {
  const keys: ModelKeys[] = ['syndicate']
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (state: ModelState) => {
      resolve(state.syndicate ?? ModelSyndicateInit)
    })
  })
}

export function ModelSyndicateSet(syndicate: Object): Promise<void> {
  const Values: ModelState = {
    syndicate,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(Values, () => {
      resolve()
    })
  })
}
