import {isNumber} from "./type-helpers.js";

/**
 * Merges two objects.
 * Warning! Only objects that compatible with JSON methods are supported.
 * @param {Object} target object
 * @param {Object} source object
 * @param {Object|String} propRules - properties handling rules. Default behaviour is overwriting.
 * @returns {Object} squashed object
 */
export const squashObjects = (target, source, propRules = 'overwrite') => {
  target = JSON.parse(JSON.stringify(target))

  // squash in source properties using propRules
  const targetProps = Object.keys(target)
  const sourceProps = Object.keys(source)
  sourceProps.forEach(prop => {
    if (targetProps.some(tProp => tProp === prop)) {
      // squash property using propRules
      const rule = typeof propRules === 'string' || propRules[prop] === undefined
        ? 'overwrite'
        : propRules[prop]

      switch (rule) {
        case 'overwrite':
          target[prop] = source[prop]
          break
        case 'sum': // distinguish between scalars and arrays; throw on Object
          if (Array.isArray(target[prop]) || Array.isArray(source[prop])) {
            target[prop] = [...target[prop], ...source[prop]]
          } else {
            target[prop] = (target[prop] ?? (isNumber(source[prop]) ? 0 : '')) + source[prop]
          }
          break
        case 'append': // distinguish between scalars (numbers are treated as strings) and arrays; throw on Object;
          if (Array.isArray(target[prop]) || Array.isArray(source[prop])) {
            target[prop] = [...target[prop], ...source[prop]]
          } else {
            target[prop] = (target[prop] ?? '') + ('' + source[prop])
          }
          break
        default: // function
          target[prop] = rule(target[prop], source[prop], target, source)
      }
    } else {
      target[prop] = source[prop]
    }
  })

  return target
}

/**
 * Merges two arrays of objects.
 * Warning! Only objects that compatible with JSON methods are supported.
 * @param {Array} target array
 * @param {Array} source array
 * @param {String} idProp - property that identifies mergeable elements by its value equality
 * @param {Object|String} propRules - properties handling rules.
 *        Default rule is overwrite.
 *        Rules: 'append', 'sum', function
 *        if rule is a function than it receives:
 *        - targeted object property value,
 *        - object to squash in property value,
 *        - targeted object,
 *        - object to squash in
 * @returns {Array} squashed arrays
 */
export const squashArrays = (target, source, idProp = 'id', propRules = 'overwrite') => {
  target = JSON.parse(JSON.stringify(target))
  return source.reduce((targetArray, sourceElement) => {
    const targetElement = targetArray.find(targetElement => targetElement[idProp] === sourceElement[idProp])
    if (targetElement === undefined) {
      targetArray.push(sourceElement)
    } else {
      // squash in source properties using propRules
      const targetProps = Object.keys(targetElement)
      const sourceProps = Object.keys(sourceElement)
      sourceProps.forEach(prop => {
        if (targetProps.some(tProp => tProp === prop)) {
          // squash property using propRules
          const rule = typeof propRules === 'string' || propRules[prop] === undefined
            ? 'overwrite'
            : propRules[prop]

          switch (rule) {
            case 'overwrite':
              targetElement[prop] = sourceElement[prop]
              break
            case 'sum': // distinguish between scalars and arrays; throw on Object
              if (Array.isArray(targetElement[prop]) || Array.isArray(sourceElement[prop])) {
                targetElement[prop] = [...targetElement[prop], ...sourceElement[prop]]
              } else {
                targetElement[prop] = (targetElement[prop] ?? (isNumber(sourceElement[prop]) ? 0 : '')) + sourceElement[prop]
              }
              break
            case 'append': // distinguish between scalars (numbers are treated as strings) and arrays; throw on Object;
              if (Array.isArray(targetElement[prop]) || Array.isArray(sourceElement[prop])) {
                targetElement[prop] = [...targetElement[prop], ...sourceElement[prop]]
              } else {
                targetElement[prop] = (targetElement[prop] ?? '') + ('' + sourceElement[prop])
              }
              break
            default: // function
              targetElement[prop] = rule(targetElement[prop], sourceElement[prop], targetElement, sourceElement)
          }
        } else {
          targetElement[prop] = sourceElement[prop]
        }
      })
    }
    return targetArray
  }, target)
}
