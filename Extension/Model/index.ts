export const UsernameDefault = 'CookingWithCale'

/* Data model options that do not get synced with the server. */
export interface ModelAppState {
}

/* Options that when changed triggers the DOM to rerender? */
export interface ModelOptions {
  // App State
  modal_visible: boolean      //< Modal is visible flag.
  modal_state: number         //< State of the modal.
  content_scripts: boolean    //< Content scripts enabled.
  // Options
  username?: string           //< AStartup username.
  metric_units?: boolean      //< Standard (true) or Imperial units.
  crew: string                //< Default crew.
  session?: string            //< Current session number.
  project?: string            //< Current project name.
  mission?: string            //< Current mission number.
}

const SessionFocusLengthMax = 100 //< Max length of a session focus heading.

export interface Model {
  options?: ModelOptions      //< Model data options.
  command_structure?: Object  //< Meta model for the incident command structure.
  session?: Object            //< Current session.
  issues_open?: Object      //< Missions that have not happened.
  issues_closed?: Object    //< Missions that have happened in the past.
  mission?: Object            //< Current mission.
  repos?: Object              //< List of this user's repos.
  repo?: Object               //< Current project.
}

export interface AMission {
  push_count: number           //< Number of times this project has bee pushed.
}

export interface AProject {
  push_count: number           //< Number of times this project has bee pushed.
}

export interface ACrew {
  handle: string                //< This crew member's unique handle.
}

export interface ACommandRole {
  master: string,               //< Role master's handle.
  contact: Object,              //< Contact information for this role.
  supervisor_roles: string[],   //< List of supervisor roles.
}

export interface ACommandStructure {
  rules: ACommandRole[]         //< List of the roles in the ICS. 
}

// @todo Document that if the master is an null then it is the IC. If it's an 
// empty string then it's unfilled.

export const ARoles = {}

export interface ASession {
  projects: Object        //< Projects worked on in this session.
  issues: Object        //< Missions 
  log: Object             //< Log for this session/...
}

export interface ContentFeed {
  title: string           //< Title of the feed.
  description: string     //< Description of the feed.
  handle: string          //< Handle of the feed.
  url: string             //< Not sure what this is.
  url_feed: string        //< The URL of the feed.
  header: string          //< HTML/CSS header for this feed.
}

export interface ContentFeedCategory {
  title: string           //< Title of the category.
  color: string           //< Identifying color.
  icon: string            //< Icon for the category.
  header: string          //< Header for feed of this category.
  feeds: ContentFeed[]     //< Array of feeds in this category.
}

export interface Enclosure {
  url: string
  length: number
  type: string
}

export interface ContentFeedItem {
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

export interface AForm {
  title: string,          //< Form title.
  description: string,    //< Form description.
  instructions: string,   //< Instructions on completing the form.
  log: Object             //< Form change log.
}

export interface ACommandStructure {
  master: string,         //< Master of this role (i.e the boss)
  contact: Object,        //< Contact information for this role.
  supervisor: string,     //< Supervisor role key of this role.
}

export type ModelKeys = keyof Model

export const ModelOptionsDefault: ModelOptions = {
  username: UsernameDefault,
  modal_visible: false,
  modal_state: 0,
  content_scripts: false,
  metric_units: true,
  crew: UsernameDefault,
  session: '',
  mission: '',
  project: '',
}

export const ModelCommandStructureDefault = {
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

export const ModelDefault: Model = {
  options: ModelOptionsDefault, 
  command_structure: ModelCommandStructureDefault,
  session: {},
  issues_open: {},
  issues_closed: {},
  mission: {},
  repos: {},
  repo: {},
}

export const ModelSessionsFutureDefault = {}
export const ModelSessionsPastDefault = {}
export const ModelSessionDefault = {}
export const ModelMissionsFutureDefault = {}
export const ModelMissionsPastDefault = {}
export const ModelMissionDefault = {}
export const ModelProjectsColdDefault = {}
export const ModelProjectsWarmDefault = {}
export const ModelProjectsHotDefault = {}
export const ModelProjectsDoneDefault = {}
export const ModelProjectDefault = {}

export function ModelOptionsGet(): Promise<ModelOptions> {
  const keys: ModelKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelOptionsSet(options: ModelOptions): Promise<void> {
  const Values: Model = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelCommandStructureGet(): Promise<Object> {
  const keys: ModelKeys[] = ['command_structure']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelCommandStructureSet(command_structure: Object): Promise<void> {
  const Values: Model = {
    command_structure,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelSessionGet(): Promise<Object> {
  const keys: ModelKeys[] = ['session']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelSessionSet(session: Object): Promise<void> {
  const Values: Model = {
    session,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelMissionsPastStructureGet(): Promise<Object> {
  const keys: ModelKeys[] = ['issues_closed']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelMissionsPastSet(issues_closed: Object): Promise<void> {
  const Values: Model = {
    issues_closed: issues_closed,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelIssuesOpenGet(): Promise<Object> {
  const keys: ModelKeys[] = ['issues_open']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelIssuesOpenSet(issues_open: Object): Promise<void> {
  const Values: Model = {
    issues_open: issues_open,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelIssuesClosedGet(): Promise<Object> {
  const keys: ModelKeys[] = ['issues_closed']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelIssuesClosedSet(issues: Object): Promise<void> {
  const Values: Model = {
    issues_closed: issues,
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
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelMissionSet(mission: Object): Promise<void> {
  const Values: Model = {
    mission,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelReposGet(): Promise<Object> {
  const keys: ModelKeys[] = ['repos']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: Model) => {
      resolve(res.options ?? ModelOptionsDefault)
    })
  })
}

export function ModelReposSet(repos: Object): Promise<void> {
  const Values: Model = {
    repos,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}
