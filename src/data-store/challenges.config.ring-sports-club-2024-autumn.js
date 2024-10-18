export const challengeConfigRingSportsClub2024Autumn = {
  isRaw: true, // see challenges.etl.js for status meaning
  id: "ringSportsClub2024-Autumn",
  name: "Ring Sport Club 2024 Autumn",
  description: "",
  docs: {
    regulations: "",
    computations: "",
    rankBoard: "https://docs.google.com/spreadsheets/d/1UyYF9ajtDgZQbGOysNaaghUO_ERdgURJhMMwP2ayRu0/edit?gid=1391662661#gid=1391662661",
  },
  sports: [
    {
      groupName: "Cycling",
      activities: ["Ride", "Mountain Bike Ride", "Gravel Ride",],
    },
    {
      groupName: "Running",
      activities: ["Run", "Trail Run",],
    },
    {
      groupName: "Walking",
      activities: ["Walk", "Hike",],
    },
    {
      groupName: "Swimming",
      activities: ["Swim",],
    }
  ],
  activityDayMapping: "activityEnd",
  phases: [
    {
      id: "single",
      name: "Autumn 2024",
      timeframe: {from: "2024-09-01T00:00:00+02:00", till: "2024-10-31T23:59:59+02:00",},
      metrics: [
        {
          id: "pts",
          frequency: "cumulative", // from the beginning of phase
          inputs: [
            {
              id: "rideMileage",
              source: "API", dataProvider: "Strava", sportGroups: ["Ride",],
            },
            {
              id: "runMileage",
              source: "API", dataProvider: "Strava", sportGroups: ["Run",],
            },
            {
              id: "walkMileage",
              source: "API", dataProvider: "Strava", sportGroups: ["Walk",],
            },
            {
              id: "swimMileage",
              source: "API", dataProvider: "Strava", sportGroups: ["Swim",],
            },
          ],
          outputs: [
            {
              id: "ridePts",
              computationRules: [
                {op: "mult", params: [{source: "inputs", id: "rideMileage",}, 0.25,],},
                {op: "round", params: 2},
              ],
            },
            {
              id: "runPts",
              computationRules: [
                {op: "mult", params: [{source: "inputs", id: "runMileage",}, 0.25,],},
                {op: "round", params: 2},
              ],
            },
            {
              id: "walkPts",
              computationRules: [
                {op: "mult", params: [{source: "inputs", id: "walkMileage",}, 0.25,],},
                {op: "round", params: 2},
              ],
            },
            {
              id: "swimPts",
              computationRules: [
                {op: "mult", params: [{source: "inputs", id: "swimMileage",}, 0.25,],},
                {op: "round", params: 2},
              ],
            },
            {
              id: "pts",
              computationRules: [
                {
                  op: "sum",
                  params: [{source: "outputs", id: ["rideMileage", "runMileage", "walkMileage", "swimMileage",]},],
                },
                {op: "round", params: 1},
              ],
            },
          ],
        },
      ],
    }
  ],
}
