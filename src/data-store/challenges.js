import {challengesConfig} from "./config-challenges.js";
import {date2UTCString} from "../common/date-helpers.js";

/**
 * Returns config of challenges that applicable to current date, only computations applicable
 * @param {Array[Object]} challengesConfig
 * @param {Date} date
 * @param {Boolean} isRaw - if challenges config is raw source
 */
export const getChallengesByDate = (challengesConfig, date, isRaw = true) => {
  challengesConfig = isRaw ? prepareChallengesConfig(challengesConfig) : challengesConfig;

}

/**
 * Makes basic transformations in challenges config copy.
 * 1. dateStrings => Date objects
 * @param {Array[Object]} challengesConfig
 * @returns {Array[Object]}
 */
export const prepareChallengesConfig = challengesConfig =>
  JSON.parse(JSON.stringify(challengesConfig))
    .forEach(challenge => {
      challenge.phases.forEach(phase => {
        if (typeof (phase.timeframe) !== "undefined") {
          phase.timeframe.from = date2UTCString(phase.timeframe.from);
          phase.timeframe.till = date2UTCString(phase.timeframe.till);
        }
      })
    })

const getChallengesByDate = (challengesConfig, date) =>
  challengesConfig.filter(
    challenge => challenge.phases.some(phase => true)
  )
