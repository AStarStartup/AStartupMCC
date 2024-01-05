// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

export function IssueStringNumber(input: string) {
  if (input[0] != '#') return -1
  return parseInt(input.substring(1,))
}
