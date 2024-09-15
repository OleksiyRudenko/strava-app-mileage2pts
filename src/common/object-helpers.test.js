const squashObjectsTestCases = [
  [
    {
      target: {
        str1: 'abc',
        str2: 'def',
        arr1: ['a'],
        arr2: ['AA'],
        arr4: [{id: 'i1', v: 'xyzi1'}, {id: 'i2', v: 'XYZi2'},],
      },
      source: {
        str1: 'ABC',
        str3: 'GHI',
        arr1: ['A'],
        arr2: ['BB'],
        arr3: ['CCC'],
        arr4: [{id: 'i1', v: 'XYZi1'}, {id: 'i3', v: 'XYZi3'},],
      },
      propRules: {
        arr2: 'append',
        arr3: 'append',
        arr4: function (targetArray, sourceArray) {
          // add/overwite strategy

        }
      }
    },
    {
      str1: 'ABC',
      str2: 'def',
      str3: 'GHI',
      arr1: ['A'],
      arr2: ['AA', 'BB'],
      arr3: ['CCC'],
      arr4: [{id: 'i1', v: 'XYZi1'}, {id: 'i2', v: 'XYZi2'}, {id: 'i3', v: 'XYZi3'},],
    }
  ],
]

const squashArrayTestCases = [
  [
    {
      target: [
        {id: 'i1', v1: 'xyzi1', v2: 'i1a'},
        {id: 'i2', v1: 'XYZi2', v2: 'i2a'},
      ],
      source: [
        {id: 'i1', v1: 'XYZi1', v2: 'i1b'},
        {id: 'i3', v1: 'XYZi3', v2: 'i3b'},
      ],
      idProp: 'id',
      propRules: {
        v2: (target, source) => target + source,
      }
    },
    [
      {id: 'i1', v1: 'XYZi1', v2: 'i1ai1b'},
      {id: 'i2', v1: 'XYZi2', v2: 'i2a'},
      {id: 'i3', v1: 'XYZi3', v2: 'i3b'},
    ],
  ],
]
