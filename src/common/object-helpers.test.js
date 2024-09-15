import {squashArrays, squashObjects} from "./object-helpers.js"

const squashObjectsTestCases = [
  [
    {
      target: {
        str1: 'abc',
        str2: 'def',
        arr1: ['a'],
        arr2: ['AA'],
        arr4: [{id: 'i1', v: 'xyzi1'}, {id: 'i2', v: 'xyzi2'},],
        arr5: [{id: 'i1', v: 'xyzi1'}, {id: 'i2', v: 'xyzi2'},],
      },
      source: {
        str1: 'ABC',
        str3: 'GHI',
        arr1: ['A'],
        arr2: ['BB'],
        arr3: ['CCC'],
        arr4: [{id: 'i1', v: 'XYZi1'}, {id: 'i3', v: 'XYZi3'},],
        arr5: [{id: 'i1', v: 'XYZi1'}, {id: 'i3', v: 'XYZi3'},],
      },
      propRules: {
        arr2: 'append',
        arr3: 'append',
        arr4: (targetArray, sourceArray) => [...targetArray, ...sourceArray],
        arr5: (targetArray, sourceArray) => squashArrays(targetArray, sourceArray, 'id'),
      }
    },
    {
      str1: 'ABC',
      str2: 'def',
      str3: 'GHI',
      arr1: ['A'],
      arr2: ['AA', 'BB'],
      arr3: ['CCC'],
      arr4: [{id: 'i1', v: 'xyzi1'}, {id: 'i2', v: 'xyzi2'}, {id: 'i1', v: 'XYZi1'}, {id: 'i3', v: 'XYZi3'},],
      arr5: [{id: 'i1', v: 'XYZi1'}, {id: 'i2', v: 'xyzi2'}, {id: 'i3', v: 'XYZi3'},],
    }
  ],
]

const squashArraysTestCases = [
  [
    {
      target: [
        {id: 'i1', v1: 'xyzi1', v2: 'i1a', v3: 'i2v3a', v4: 5, v5: 7, xa1: ['xa1a'], xa2: ['xa2a']},
        {id: 'i2', v1: 'XYZi2', v2: 'i2a'},
      ],
      source: [
        {id: 'i1', v1: 'XYZi1', v2: 'i1b', v3: 'i2v3b', v4: 6, v5: 9, xa1: ['xa1b'], xa2: ['xa2b'], xa3: ['xa3b'],},
        {id: 'i3', v1: 'XYZi3', v2: 'i3b'},
      ],
      idProp: 'id',
      propRules: {
        v2: (target, source) => target + source, // equivalent to 'append' rule
        v3: 'sum',
        v4: 'sum',
        v5: 'append',
        xa2: 'append',
        xa3: 'append',
      }
    },
    [
      {
        id: 'i1',
        v1: 'XYZi1',
        v2: 'i1ai1b',
        v3: 'i2v3ai2v3b',
        v4: 11,
        v5: '79',
        xa1: ['xa1b'],
        xa2: ['xa2a', 'xa2b'],
        xa3: ['xa3b'],
      },
      {id: 'i2', v1: 'XYZi2', v2: 'i2a'},
      {id: 'i3', v1: 'XYZi3', v2: 'i3b'},
    ],
  ],
]

describe('squashArray: Positive scenarios', () => {
  test.each(squashArraysTestCases)(
    'squashes %p into array %p',
    (input, expectedOutputArray) => {
      expect(squashArrays(input.target, input.source, input.idProp, input.propRules)).toEqual(expectedOutputArray)
    }
  )
})

describe('squashObjects: Positive scenarios', () => {
  test.each(squashObjectsTestCases)(
    'squashes objects %p into object %p',
    (input, expectedOutputObject) => {
      expect(squashObjects(input.target, input.source, input.propRules)).toEqual(expectedOutputObject)
    }
  )
})
