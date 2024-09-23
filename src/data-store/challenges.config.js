export const challengesConfig = [
  {
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
  },
  {
    isRaw: true,
    id: "GraRowerowaGdansk2024",
    name: "grarowerowa 2024 Gdansk",
    description: "",
    docs: {
      regulations: "",
      computations: "https://contests.v3.activy.pl/pages/pl/30b42c7a-7df5-46fa-9a67-c3883f896a6f/rules",
      rankBoard: "",
    },
    area: {
      url: {
        interactive: null,
        static: "https://5488344.fs1.hubspotusercontent-na1.net/hubfs/5488344/obszar-punktowany.png",
      },
      boundaries: null,
    },
    sports: [
      {
        groupName: "wheels",
        activities: ["Ride", "Inline Skate", "Mountain Bike Ride", "Road bike", "E-Bike Ride", "E-Mountain Bike Ride",
          "Gravel Ride", "Handcycle", "Skateboard"],
      },
    ],
    activityDayMapping: "activityEnd",
    phases: [
      {
        id: "default",
        timeframe: {from: "2024-09-01T00:00:00+02:00", till: "2024-11-30T23:59:59+02:00",},
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
      {
        id: "x1",
        name: "September",
        description: "In September pts are equivalent to kilometers rounded down to integer",
        timeframe: {from: "2024-09-01T00:00:00+02:00", till: "2024-09-30T23:59:59+02:00",},
      },
      {
        id: "x2",
        name: "October x2",
        description: "In October pts are x2!",
        timeframe: {from: "2024-10-01T00:00:00+02:00", till: "2024-10-31T23:59:59+02:00",},
        metrics: [
          {
            id: "pts", // amends metric from defaults entry
            outputs: [
              {
                id: "pts",
                computationRulesAmendmentMode: "append", // as opposed to overwrite
                computationRules: [
                  {op: "mult", params: [2],},
                ],
              }
            ],
          },
        ],
      },
      {
        id: "x3",
        name: "November x3",
        description: "In November pts are x3!",
        timeframe: {from: "2024-11-01T00:00:00+02:00", till: "2024-11-30T23:59:59+02:00",},
        metrics: [
          {
            id: "pts", // amends metric from defaults entry
            outputs: [
              {
                id: "pts",
                computationRulesAmendmentMode: "append", // as opposed to rewrite
                computationRules: [
                  {op: "mult", params: [3],},
                ],
              }
            ],
          },
        ],
      },
    ],
  },
  {
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
  },
]
