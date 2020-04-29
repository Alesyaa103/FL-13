function letterCount(str, s) {
  let count = 0;
  for(let i in str) {
    if(s === str[i]) {
      count++
    }
  }
  return count
}
letterCount("Maggy","g")