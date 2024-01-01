// Copyright AStartup; license at https://github.com/AStarStartup/AStartupMCC

import { expect, test } from '@jest/globals';
import { MissionStringUnpack } from '../Extension/Model';

test('Utils.Tests', () => {
  const Account = 'CookingWithCale'
  const Repo = 'AStartupMCC'
  const Mission = 420
  const ChildMission = 'A'
  const MissionString = Account + '/' + Repo + '#' + Mission + '.' 
                      + ChildMission;
  let expected = [Account, Repo, Mission, ChildMission];
  expect(MissionStringUnpack(MissionString)).toStrictEqual(expected);
})
