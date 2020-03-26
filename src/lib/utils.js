
function toUpperKebab(str) {
  return str.split(/(?=[A-Z])/).join('_').toUpperCase()
}


export {toUpperKebab}