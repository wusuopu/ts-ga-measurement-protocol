export function assign (...arg: object[]): object {
  let obj1 = arg[0]
  for (let i=0; i < arg.length; i++) {
    let obj2 = arg[i]
    for (let key in obj2) {
      obj1[key] = obj2[key]
    }
  }
  return obj1
}

