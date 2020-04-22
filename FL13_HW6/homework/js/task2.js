let str = prompt('enter string', '');
let odd = 2;

str = str.replace(/\s+/g, '');
console.log('ytct', str)
if (str === '') {
  alert('Invalid input data')
} else if (str.length % odd === 0) {
  alert(`${str.substr(str.length/odd - 1,odd)}`);
} else {
  alert(`${str.substr(Math.floor(str.length/odd),1)}`)
}