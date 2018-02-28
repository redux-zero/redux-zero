import shallowEqual from "./shallowEqual";

function differs(a, b) {
  if (a !== b) {
    return true;
  } else if (a && typeof a === "object") {
    return !shallowEqual(a, b);
  }
  return false;
}

export default function getDiff(newData, oldData) {
  const diff = {};
  let changed = false;
  for (let key in newData) {
    const val = newData[key];
    if (differs(oldData[key], val)) {
      changed = true;
      if (typeof val === "object" && typeof val.getMonth !== "function") {
        diff[key] = val.constructor === Array ? val.slice(0) : { ...val };
      } else {
        diff[key] = val;
      }
    }
  }
  return { diff, changed };
}
