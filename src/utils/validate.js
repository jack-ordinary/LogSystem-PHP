export function validURL(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['ss100Admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0

  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (reg.test(str)) {
    return true
  }
  return false
}
