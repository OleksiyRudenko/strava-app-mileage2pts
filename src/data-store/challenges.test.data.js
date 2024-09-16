export const challengeRingSportClub = {
  isRaw: false,
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
  currentPhase: {
    id: "single",
    name: "Autumn 2024",
    timeframe: {from: "2024-08-31T22:00:00.000Z", till: "2024-10-31T21:59:59.000Z",},
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
  },
}

export const challengeGraRowerowa = {
  'Sep': {
    isRaw: false,
    name: "grarowerowa 2024 Gdansk",
    description: "",
    docs: {
      regulations: "",
      computations: "https://contests.v3.activy.pl/pages/pl/30b42c7a-7df5-46fa-9a67-c3883f896a6f/rules",
      rankBoard: "",
    },
    sports: [
      {
        groupName: "wheels",
        activities: ["Ride", "Inline Skate", "Mountain Bike Ride", "Road bike", "E-Bike Ride", "E-Mountain Bike Ride",
          "Gravel Ride", "Handcycle", "Skateboard"],
      },
    ],
    activityDayMapping: "activityEnd",
    currentPhase:
      {
        id: "x1",
        name: "September",
        description: "In September pts are equivalent to kilometers rounded down to integer",
        timeframe: {from: "2024-08-31T22:00:00.000Z", till: "2024-09-30T21:59:59.000Z",},
        metrics: [
          {
            id: "pts",
            frequency: "onActivityEnd",
            inputs: [
              {
                id: "mileage",
                source: "API",
                dataProvider: "Strava",
                sportGroups: ["wheels",],
              },
            ],
            outputs: [
              {
                id: "pts",
                name: "pts per activity",
                description: "Pts per activity",
                computationRules: [
                  {
                    op: "floor",
                    params: [{source: "inputs", id: "mileage",}],
                  },
                ],
              }
            ],
          },
          {
            name: "globalRank",
            frequency: "cumulative",
            inputs: [
              {
                id: "rank", // .name = .id if not specified
                source: "user",
              },
              {
                id: "totalParticipants",
                name: "total participants count",
                source: "user",
              },
            ],
            outputs: [
              {
                id: "topX",
                name: "better than X%",
                description: "Track your ranking progress among entire participants population. Fixed at the end of each day.",
                computationRules: [
                  {
                    op: "div",
                    params: [
                      {source: "inputs", id: "rank",},
                      {source: "inputs", id: "totalParticipants",},
                    ],
                  },
                ],
              },
            ],
          }
        ]
      },
  },
  'Oct': {
    isRaw: false,
    name: "grarowerowa 2024 Gdansk",
    description: "",
    docs: {
      regulations: "",
      computations: "https://contests.v3.activy.pl/pages/pl/30b42c7a-7df5-46fa-9a67-c3883f896a6f/rules",
      rankBoard: "",
    },
    sports: [
      {
        groupName: "wheels",
        activities: ["Ride", "Inline Skate", "Mountain Bike Ride", "Road bike", "E-Bike Ride", "E-Mountain Bike Ride",
          "Gravel Ride", "Handcycle", "Skateboard"],
      },
    ],
    activityDayMapping: "activityEnd",
    currentPhase: {
      id: "x2",
      name: "October x2",
      description: "In October pts are x2!",
      timeframe: {from: "2024-09-30T22:00:00.000Z", till: "2024-10-31T21:59:59.000Z",},
      metrics: [
        {
          id: "pts",
          frequency: "onActivityEnd",
          inputs: [
            {
              id: "mileage",
              source: "API",
              dataProvider: "Strava",
              sportGroups: ["wheels",],
            },
          ],
          outputs: [
            {
              id: "pts",
              name: "pts per activity",
              description: "Pts per activity",
              computationRulesAmendmentMode: "append",
              computationRules: [
                {
                  op: "floor",
                  params: [{source: "inputs", id: "mileage",}],
                },
                {op: "mult", params: [2],},
              ],
            }
          ],
        },
        {
          name: "globalRank",
          frequency: "cumulative",
          inputs: [
            {
              id: "rank", // .name = .id if not specified
              source: "user",
            },
            {
              id: "totalParticipants",
              name: "total participants count",
              source: "user",
            },
          ],
          outputs: [
            {
              id: "topX",
              name: "better than X%",
              description: "Track your ranking progress among entire participants population. Fixed at the end of each day.",
              computationRules: [
                {
                  op: "div",
                  params: [
                    {source: "inputs", id: "rank",},
                    {source: "inputs", id: "totalParticipants",},
                  ],
                },
              ],
            },
          ],
        }
      ]
    },
  },
  'Nov': {
    isRaw: false,
    name: "grarowerowa 2024 Gdansk",
    description: "",
    docs: {
      regulations: "",
      computations: "https://contests.v3.activy.pl/pages/pl/30b42c7a-7df5-46fa-9a67-c3883f896a6f/rules",
      rankBoard: "",
    },
    sports: [
      {
        groupName: "wheels",
        activities: ["Ride", "Inline Skate", "Mountain Bike Ride", "Road bike", "E-Bike Ride", "E-Mountain Bike Ride",
          "Gravel Ride", "Handcycle", "Skateboard"],
      },
    ],
    activityDayMapping: "activityEnd",
    currentPhase: {
      id: "x3",
      name: "November x3",
      description: "In November pts are x3!",
      timeframe: {from: "2024-10-31T22:00:00.000Z", till: "2024-11-30T21:59:59.000Z",},
      metrics: [
        {
          id: "pts",
          frequency: "onActivityEnd",
          inputs: [
            {
              id: "mileage",
              source: "API",
              dataProvider: "Strava",
              sportGroups: ["wheels",],
            },
          ],
          outputs: [
            {
              id: "pts",
              name: "pts per activity",
              description: "Pts per activity",
              computationRulesAmendmentMode: "append",
              computationRules: [
                {
                  op: "floor",
                  params: [{source: "inputs", id: "mileage",}],
                },
                {op: "mult", params: [3],},
              ],
            }
          ],
        },
        {
          name: "globalRank",
          frequency: "cumulative",
          inputs: [
            {
              id: "rank", // .name = .id if not specified
              source: "user",
            },
            {
              id: "totalParticipants",
              name: "total participants count",
              source: "user",
            },
          ],
          outputs: [
            {
              id: "topX",
              name: "better than X%",
              description: "Track your ranking progress among entire participants population. Fixed at the end of each day.",
              computationRules: [
                {
                  op: "div",
                  params: [
                    {source: "inputs", id: "rank",},
                    {source: "inputs", id: "totalParticipants",},
                  ],
                },
              ],
            },
          ],
        }
      ]
    },
  },
}
