import {challengesConfig} from "./challenges.config.js"
import {getChallengesByDate} from "./challenges.etl.js"

const getChallengesByDateTestCases = [
  [ { challengesConfig, date: '2024-09-05T10:00:00Z'}, ],
  [ { challengesConfig, date: '2024-10-06T10:00:00Z'}, ],
  [ { challengesConfig, date: '2024-11-07T10:00:00Z'}, ],
]

describe('getChallengesByDate: Positive scenarios', () => {
  test.each(getChallengesByDateTestCases)(
    'extract from %p relevant challenges and rulesets as %p',
    (input, expectedOutputObject) => {
      expect(getChallengesByDate(input.challengesConfig, input.date)).toEqual(expectedOutputObject)
    }
  )
})
