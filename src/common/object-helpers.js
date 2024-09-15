/**
 * Merges two objects.
 * Warning! Only objects that compatible with JSON methods are supported.
 * @param {Object} target object
 * @param {Object} source object
 * @param {Object|String} propsRules - properties handling rules. Default behaviour is overwriting.
 */
export const squashObjects = (target, source, propsRules = 'overwrite') => {
  target = JSON.parse(JSON.stringify(target))

  return target
}

/**
 * Merges two arrays of objects.
 * Warning! Only objects that compatible with JSON methods are supported.
 * @param {Array} target array
 * @param {Array} source array
 * @param {String} idProp - property that identifies mergeable elements by its value equality
 * @param {Object|String} propsRules - properties handling rules. Default behaviour is overwriting.
 */
export const squashArrays = (target, source, idProp = 'id', propsRules= 'overwrite') => {
  target = JSON.parse(JSON.stringify(target))
  return source.reduce((targetArray, sourceElement) => {
    const targetElement = targetArray.find(targetElement => targetElement[idProp] === sourceElement[idProp])
    if (targetElement === undefined) {
      targetArray.append(sourceElement)
    } else {
      // squash in source properties using propRules

    }
    return targetArray
  }, target)
}
