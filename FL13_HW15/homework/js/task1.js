function assign(obj, ...arr) {
  arr.forEach((addObj) => {
    for (let key of Object.keys(addObj)) {
      obj[key] = addObj[key];
    }
  })
  return obj
}

window.assign = assign