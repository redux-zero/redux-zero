import shallowEqual from "./shallowEqual"

function differs(a, b) {
  if (a && typeof a === "object") {
    return !shallowEqual(a, b)
  }
  return a !== b
}

export default function getDiff(newData, oldData) {
  const diff = {}
  let changed = false
  for (let key in newData) {
    if (differs(oldData[key], newData[key])) {
      changed = true
      diff[key] = newData[key]
    }
  }
  return { diff, changed }
}
