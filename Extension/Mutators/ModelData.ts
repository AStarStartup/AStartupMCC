import { v4 as uuidv4 } from 'uuid'

export const UsernameDefault = 'CookingWithCale'

/* Options that when changed triggers the DOM to rerender? */
export interface ModelDataOptions {
  username?: string           //< AStartup username.
  modal_visible: boolean      //< Modal is visible flag.
  modal_state: number         //< State of the modal.
  content_scripts: boolean    //< Content scripts enabled.
  metric_units?: boolean      //< Standard (true) or Imperial units.
  crew: string                //< Default crew.
  session?: string            //< Current session number.
  project?: string            //< Current project name.
  mission?: string            //< Current mission number.
  session_focus_length_max?: string //< Max length of a session focus heading.
}

export interface ModelData {
  options?: ModelDataOptions  //< Model data options.
  command_structure?: Object  //< Meta model for the incident command structure.
  sessions_future?: Object    //< Sessions that have not happened.
  sessions_past?: Object      //< Sessions that are closed.
  session?: Object            //< Current session.
  missions_future?: Object    //< Missions that have not happened.
  missions_past?: Object      //< Missions that have happened in the past.
  mission?: Object            //< Current mission.
  projects_cold?: Object      //< Cold/inactive projects.
  projects_warm?: Object      //< Warm/side projects.
  projects_hot?: Object       //< Hot/active projects.
  projects_done?: Object      //< Finished projects.
  project?: Object            //< Current project.
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
  missions: Object        //< Missions 
  log: Object             //< Log for this session/...
}

export interface FeedRSSish {
  title: string           //< Title of the feed.
  description: string     //< Description of the feed.
  handle: string          //< Handle of the feed.
  url: string             //< Not sure what this is.
  url_feed: string        //< The URL of the feed.
  header: string          //< HTML/CSS header for this feed.
}

export interface FeedCategory {
  title: string           //< Title of the category.
  color: string           //< Identifying color.
  icon: string            //< Icon for the category.
  header: string          //< Header for feed of this category.
  feeds: FeedRSSish[]     //< Array of feeds in this category.
}

export interface Enclosure {
  url: string
  length: number
  type: string
}

export interface FeedItem {
  uid: string             //< Unique ID.
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

export type ModelDataKeys = keyof ModelData

export const ModelDataOptionsDefault: ModelDataOptions = {
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

export const ModelDataCommandStructureDefault = {
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

export const ModelDataDefault: ModelData = {
  options: ModelDataOptionsDefault, 
  command_structure: ModelDataCommandStructureDefault,
  sessions_future: {},
  sessions_past: {},
  session: {},
  missions_future: {},
  missions_past: {},
  mission: {},
  projects_cold: {},
  projects_hot: {},
  project: {},
}

export const ModelDataSessionsFutureDefault = {}
export const ModelDataSessionsPastDefault = {}
export const ModelDataSessionDefault = {}
export const ModelDataMissionsFutureDefault = {}
export const ModelDataMissionsPastDefault = {}
export const ModelDataMissionDefault = {}
export const ModelDataProjectsColdDefault = {}
export const ModelDataProjectsWarmDefault = {}
export const ModelDataProjectsHotDefault = {}
export const ModelDataProjectsDoneDefault = {}
export const ModelDataProjectDefault = {}

export function ModelDataOptionsGet(): Promise<ModelDataOptions> {
  const keys: ModelDataKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataOptionsSet(options: ModelDataOptions): Promise<void> {
  const Values: ModelData = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataCommandStructureGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['command_structure']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataCommandStructureSet(command_structure: Object): Promise<void> {
  const Values: ModelData = {
    command_structure,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataSessionsFutureGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['sessions_future']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataSessionsFutureSet(command_structure: Object): Promise<void> {
  const Values: ModelData = {
    command_structure,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataSessionsPastGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['sessions_past']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataSessionsPastSet(sessions_past: Object): Promise<void> {
  const Values: ModelData = {
    sessions_past,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataSessionGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['session']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataSessionSet(session: Object): Promise<void> {
  const Values: ModelData = {
    session,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelMissionsPastStructureGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['missions_past']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataMissionsPastSet(missions_past: Object): Promise<void> {
  const Values: ModelData = {
    missions_past,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataMissionsFutureGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['missions_future']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataMissionsFutureSet(missions_future: Object): Promise<void> {
  const Values: ModelData = {
    missions_future,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataMissionGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['mission']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataMissionSet(mission: Object): Promise<void> {
  const Values: ModelData = {
    mission,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataProjectsColdGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['projects_cold']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataProjectsColdSet(projects_cold: Object): Promise<void> {
  const Values: ModelData = {
    projects_cold,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataProjectsWarmGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['projects_warm']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataProjectsWarmSet(projects_warm: Object): Promise<void> {
  const Values: ModelData = {
    projects_warm,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataProjectsHotGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['projects_hot']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataProjectsHotSet(projects_hot: Object): Promise<void> {
  const Values: ModelData = {
    projects_hot,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataProjectsDoneGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['projects_done']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataProjectsDoneSet(projects_done: Object): Promise<void> {
  const Values: ModelData = {
    projects_done,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataProjectGet(): Promise<Object> {
  const keys: ModelDataKeys[] = ['project']
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ModelData) => {
      resolve(res.options ?? ModelDataOptionsDefault)
    })
  })
}

export function ModelDataProjectSet(project: Object): Promise<void> {
  const Values: ModelData = {
    project,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}
