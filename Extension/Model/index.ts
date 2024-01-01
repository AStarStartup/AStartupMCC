// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

export const UsernameInit = 'CookingWithCale'

export type GitHubIssue = {
  title: string
  number: number
  brief: string
}

export type GitHubRepo = {
  name: string
  issues_closed: GitHubIssue
  issues_open: GitHubIssue
}

export type GitHubAccount = {
  type: string
  repos: GitHubRepo
}

/* Data model config that do not get synced with the server. */
export type ModelAppState = {
}

// Options that when changed triggers the DOM to rerender?
// The design goal of this data structure is to not have any nested objects.
// The ModelState data is stored using Objects and thus the key is not stored 
// in the sub-Object, so we store the key of the current Object we are working 
// on.
export type ModelConfig = {
  // App State
  modal_visible: boolean      //< Modal is visible flag.
  modal_state: number         //< State of the modal.
  // Options
  content_scripts: boolean    //< Content scripts enabled.
  metric_units?: boolean      //< Standard (true) or Imperial units.
  me?: string                 //< The user's Username.
  them?: string               //< Currently selected syndicate member.
  session?: number            //< Current session number.
  account?: string            //< Current account.
  repo?: string               //< Current repo.
  mission: number             //< Current mission number.
  child_mission?: string      //< Current child mission.
}

const SessionFocusLengthMax = 100 //< Max length of a session focus heading.

// The Global App Model state.
export type ModelState = {
  config?: ModelConfig        //< Model data config.
  command_structure?: Object  //< Meta model for the incident command structure.
  issue?: Object              //< The current issue.
  mission?: Object            //< The current mission.
  session?: Object            //< Current session.
  syndicate?: Object          //< All of the GitHubAccounts in the syndicate.
}

export type AMission = {
  push_count: number           //< Number of times this project has bee pushed.
}

export type AProject = {
  push_count: number           //< Number of times this project has bee pushed.
}

export type ACrew = {
  handle: string                //< This syndicate member's unique handle.
}

export type ACommandRole = {
  master: string,               //< Role master's handle.
  contact: Object,              //< Contact information for this role.
  supervisor_roles: string[],   //< List of supervisor roles.
}

export type ACommandStructure = {
  rules: ACommandRole[]         //< List of the roles in the ICS. 
}

// @todo Document that if the master is an null then it is the IC. If it's an 
// empty string then it's unfilled.

export const ARoles = {}

export type ASession = {
  projects: Object        //< Projects worked on in this session.
  issues: Object        //< Missions 
  log: Object             //< Log for this session/...
}

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

export const ModelConfigInit: ModelConfig = {
  modal_visible: false,
  modal_state: 0,
  content_scripts: false,
  metric_units: true,
  me: UsernameInit,
  them: '',
  session: 0,
  account: '',
  repo: '',
  mission: 0,
  child_mission: ''
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

export const ModelStateInit: ModelState = {
  command_structure: CommandStructureInit,
  issue: {},
  mission: {},
  config: ModelConfigInit,
  session: {},
  syndicate: {
    "CookingWithCale": {
      "Repos": {
        "AStarStartup/AStartupMCC": {
          "Visibility": true
        },
        "AStarStartup/AStartupToolkit": {
          "Visibility": true
        },
        "AStarStartup/LinearId": {
          "Visibility": true
        },
        "AStarStartup/OBSFX": {
          "Visibility": true
        },
        "AStarStartup/.github": {
          "Visibility": true
        },
        "AStarStartup/AStartupGitTemplate": {
          "Visibility": true
        },
        "AStarStartup/AStartupCookbook": {
          "Visibility": true
        },
        "AStarStartup/AStartupWorld": {
          "Visibility": false
        },
        "AStarStartup/StreamSeq": {
          "Visibility": false
        },
        "AStarStartup/Channel": {
          "Visibility": false
        },
        "AStarStartup/OBSTouchGIMP": {
          "Visibility": false
        },
        "AStarStartup/Typecraft": {
          "Visibility": false
        },
        "KabukiStarship/Script2": {
          "Visibility": true
        },
        "KabukiStarship/.github": {
          "Visibility": true
        },
        "KabukiStarship/Actors": {
          "Visibility": true
        },
        "KabukiStarship/iGeekPolygonWorld": {
          "Visibility": true
        },
        "KabukiStarship/KabukiLIcenses": {
          "Visibility": true
        },
        "KabukiStarship/iGeekCookbook": {
          "Visibility": true
        },
        "KabukiStarship/StarshipCookbook": {
          "Visibility": true
        },
        "KabukiStarship/KabukiPressCookbook": {
          "Visibility": true
        },
        "KabukiStarship/MusictechCookbook": {
          "Visibility": true
        },
        "KabukiStarship/iGeek": {
          "Visibility": true
        },
        "KabukiStarship/iGeekCardsWorld": {
          "Visibility": true
        },
        "KabukiStarship/KabukiStarship.github.io": {
          "Visibility": true
        },
        "KabukiStarship/KabukiToolkit": {
          "Visibility": true
        },
        "KabukiStarship/IMUL": {
          "Visibility": true
        },
        "KabukiStarship/ScriptTek": {
          "Visibility": true
        },
        "KabukiStarship/iGeekMazeWorld": {
          "Visibility": true
        },
        "KabukiStarship/iGeekPacWorld": {
          "Visibility": true
        },
        "KabukiStarship/iGeekTileWorld": {
          "Visibility": true
        },
        "KabukiStarship/iGeekVirusWorld": {
          "Visibility": true
        },
        "KabukiStarship/KabukiBenchmark": {
          "Visibility": true
        },
        "KabukiStarship/KabukiPress": {
          "Visibility": false
        },
        "KabukiStarship/KabukiSearch": {
          "Visibility": false
        },
        "KabukiStarship/SearchFor4.669": {
          "Visibility": false
        },
        "KabukiStarship/IAmPy": {
          "Visibility": false
        },
        "KabukiStarship/iGeekWikiWorld": {
          "Visibility": false
        },
        "KabukiStarship/iGeekUlator": {
          "Visibility": false
        },
        "KabukiStarship/iGeekBlockWorld": {
          "Visibility": false
        },
        "KabukiStarship/KabukiDB": {
          "Visibility": false
        },
        "KabukiStarship/KabukiTheater": {
          "Visibility": false
        },
        "CookingWithCale/BadThing": {
          "Visibility": true
        },
        "CookingWithCale/.github": {
          "Visibility": true
        },
        "CookingWithCale/FreedomCookbook": {
          "Visibility": true
        },
        "CookingWithCale/MarkdownCookbook": {
          "Visibility": true
        },
        "CookingWithCale/MarkdownSoftwareEngineering": {
          "Visibility": true
        },
        "CookingWithCale/SickBay>": {
          "Visibility": true
        },
        "CookingWithCale/MarkdownGameDev": {
          "Visibility": true
        },
        "CookingWithCale/metascrapper": {
          "Visibility": false
        },
        "CookingWithCale/MetamediaDownloader": {
          "Visibility": false
        },
        "CookingWithCale/Self": {
          "Visibility": false
        }
      }
    },
  }
}

export function ModelConfigGet(): Promise<ModelConfig> {
  const keys: ModelKeys[] = ['config']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (state: ModelState) => {
      resolve(state.config ?? ModelConfigInit)
    })
  })
}

export function ModelConfigSet(config: ModelConfig): Promise<void> {
  const Values: ModelState = {
    config: config,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function CommandStructureGet(): Promise<Object> {
  const keys: ModelKeys[] = ['command_structure']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (state: ModelState) => {
      resolve(state.config ?? ModelStateInit)
    })
  })
}

export function CommandStructureSet(command_structure: Object): Promise<void> {
  const Values: ModelState = {
    command_structure,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelIssueGet(): Promise<Object> {
  const keys: ModelKeys[] = ['issue']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (state: ModelState) => {
      resolve(state.issue ?? {})
    })
  })
}

export function ModelIssueSet(issue: Object): Promise<void> {
  const Values: ModelState = {
    issue,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelMissionGet(): Promise<Object> {
  const keys: ModelKeys[] = ['mission']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (state: ModelState) => {
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
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelSessionSet(session: Object): Promise<void> {
  const Values: ModelState = {
    session,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export const ModelSyndicateInit: Object = {
  "CookingWithCale": {}
}

export function ModelSyndicateGet(): Promise<Object> {
  const keys: ModelKeys[] = ['syndicate']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (state: ModelState) => {
      resolve(state.syndicate ?? ModelSyndicateInit)
    })
  })
}

export function ModelSyndicateSet(syndicate: Object): Promise<void> {
  const Values: ModelState = {
    syndicate,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}
