export const challengeGraRowerowaGdansk2024Config = {
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
}
