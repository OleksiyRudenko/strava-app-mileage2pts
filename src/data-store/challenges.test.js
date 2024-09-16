import {challengesConfig} from "./challenges.config.js"
import {getChallengesByDate} from "./challenges.etl.js"
import {challengeGraRowerowa, challengeRingSportClub} from "./challenges.test.data.js"

const getChallengesByDateTestCases = [
  [ { challengesConfig, date: '2024-09-05T10:00:00.000Z'}, [challengeGraRowerowa.Sep, challengeRingSportClub]],
  [ { challengesConfig, date: '2024-10-05T10:00:00.000Z'}, [challengeGraRowerowa.Oct, challengeRingSportClub]],
  [ { challengesConfig, date: '2024-11-05T10:00:00.000Z'}, [challengeGraRowerowa.Nov]],
]

describe('getChallengesByDate: Positive scenarios', () => {
  test.each(getChallengesByDateTestCases)(
    'extract from %p relevant challenges and rulesets as %p',
    (input, expectedOutputObject) => {
      expect(getChallengesByDate(input.challengesConfig, input.date)).toEqual(expectedOutputObject)
    }
  )
})
