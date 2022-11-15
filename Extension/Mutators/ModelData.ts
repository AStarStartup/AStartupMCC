import { v4 as uuidv4 } from 'uuid'

/* Options that when changed triggers the DOM to rerender? */
export interface ModelDataOptions {
  modal_visible: boolean            //< Modal is visible flag.
  modal_state: number               //< State of the modal.
  content_scripts: boolean          //< Content scripts enabled.
  metric_units?: boolean            //< Standard (true) or Imperial units.
  crew: string                      //< Default crew.
  username?: string                 //< Default location.
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

export interface ModelData {
  options?: ModelDataOptions //< The local storage options.
}

export type ModelDataKeys = keyof ModelData

export function ModelDataSet(options: ModelDataOptions): Promise<void> {
  const Values: ModelData = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(Values, () => {
      resolve()
    })
  })
}

export function ModelDataOptionsGetDefault() {
  const Resources: ModelData = {
    options: ModelDataDefault(),
  }
  return Resources
}

export function ModelDataDefault() : ModelDataOptions {
  const Options: ModelDataOptions = {
    content_scripts: false,
    metric_units: true,
    modal_visible: false,
    modal_state: 0,
    username: 'CookingWithCale',
    crew: "CookingWithCale",
  }
  return Options
}

export function ModelDataOptionsGet(): Promise<ModelDataOptions> {
  const Keys: ModelDataKeys[] = ['options']
  return new Promise((resolve) => {
    chrome.storage.local.get(Keys, (resources: ModelData) => {
      resolve(resources.options ?? ModelDataDefault())
    })
  })
}

export function ModelDataOptionsSet(options: ModelDataOptions): Promise<void> {
  const values: ModelData = {
    options,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(values, () => {
      resolve()
    })
  })
}
