import {date2UTCString} from "../common/date-helpers.js"
import {squashArrays, squashObjects} from "../common/object-helpers.js";

/**
 * Returns config of challenges that applicable to current date, only computations applicable
 * Warning! Only configs that compatible with JSON methods are supported. * @param {Array[Object]} challengesConfig
 * @param {Object} challengesConfig - all challenges configuration (optionally raw data model)
 * @param {Date|String} date
 */
export const getChallengesByDate = (challengesConfig, date) => {
  const dateUTCString = date2UTCString(date)
  challengesConfig = JSON.parse(JSON.stringify(challengesConfig))

  return challengesConfig.map(challengeConfig => prepareChallengeConfig(challengeConfig))
    .filter(
      challenge => challenge.phases.some(phase => dateUTCString >= phase.timeframe.from && dateUTCString <= phase.timeframe.till)
    )
    .map(challenge => {
      // filter phases
      challenge.phases = challenge.phases.filter(phase => dateUTCString >= phase.timeframe.from && dateUTCString <= phase.timeframe.till)
      // squash phases, by cumulatively overwriting properties
      const {isRaw, id, name, description, docs, sports, activityDayMapping, phases} = challenge
      const squashedChallenge = {isRaw, id, name, description, docs, sports, activityDayMapping}
      let squashedPhase = phases.shift()
      squashedPhase = phases.reduce((squashedPhase, sourcePhase) => {
        /*
          Squashing rules
          id, name, description, timeframe - overwrite those that are defined
          metrics - if defined, for the same metrics.id (otherwise add):
            - frequency - overwrite
            - inputs - for the same inputs.id overwrite (otherwise add)
            - outputs - for the same outputs.id (otherwise add):
              switch (computationRulesAmendmentMode )
                append: append computationRules[]
                default: overwrite
         */
        squashedPhase = squashObjects(squashedPhase, sourcePhase, {
          metrics: (targetMetrics, sourceMetrics) => {
            return squashArrays(targetMetrics, sourceMetrics, 'id', {
              inputs: (targetInputs, sourceInputs) => squashArrays(targetInputs, sourceInputs, 'id'),
              outputs: (targetOutputs, sourceOutputs) => squashArrays(targetOutputs, sourceOutputs, 'id', {
                computationRules: (targetRules, sourceRules, _, sourceObject) => {
                  if (sourceObject.computationRulesAmendmentMode === 'append') {
                    return [...targetRules, ...sourceRules]
                  } else {
                    return sourceRules
                  }
                }
              }),
            })
          },
        })
        return squashedPhase
      }, squashedPhase)

      squashedChallenge.currentPhase = squashedPhase
      /* console.log(`=== ${date} ===`)
      console.log('--- Challenge:', JSON.stringify(squashedChallenge))
      console.log('--- Phase:', JSON.stringify(squashedPhase)) */
      return squashedChallenge
    })
}

/**
 * Makes basic transformations in a challenge config if it is raw.
 * 1. dateStrings => Date UTC strings
 * @param {Array[Object]} challengeConfig
 * @returns {Array[Object]}
 */
export const prepareChallengeConfig = challengeConfig => {
  if (!challengeConfig.isRaw) return challengeConfig
  challengeConfig = JSON.parse(JSON.stringify(challengeConfig))
  challengeConfig.isRaw = false
  challengeConfig.phases.forEach(phase => {
    if (phase.timeframe !== undefined) {
      phase.timeframe.from = date2UTCString(phase.timeframe.from);
      phase.timeframe.till = date2UTCString(phase.timeframe.till);
    }
  })
  return challengeConfig
}
