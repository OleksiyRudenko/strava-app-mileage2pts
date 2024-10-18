export const challengePrototypeConfig = {
  isRaw: true, // see challenges.etl.js for isRaw status meaning
  id: null,
  name: null,
  description: "Challenge prototype object ensuring key properties exist",
  docs: {
    regulations: null,
    computations: null,
    rankBoard: null,
  },
  area: {
    url: { interactive: null, static: null, },
    boundaries: null,
  },
  sports: [
    {
      groupName: null,
      // https://support.strava.com/hc/en-us/articles/216919407-Supported-Sport-Types-on-Strava
      activities: [],
    },
  ],
  activityDayMapping: null,
  phases: [
    {
      id: null,
      name: null, // = id if not defined
      timeframe: { from: null, till: null },
      metrics: [
        {
          id: null,
          frequency: null, // onActivityEnd|cumulative|onDayEnd
          inputs: [
            {
              id: null,
              name: null, // = id if not defined
              source: null, // API|user
              dataProvider: null, // relevant if source === API
              sportGroups: [],
            },
          ],
          outputs: [
            {
              id: null,
              name: null, // = id if not defined
              computationRulesAmendmentMode: null, // [overwrite]|append
              computationRules: [
                {op: null, params: [],},
              ],
            }
          ],
        }
      ],
    }
  ],
}
