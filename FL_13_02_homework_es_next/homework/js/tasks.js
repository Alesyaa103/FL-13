const maxElement = arr => Math.max(...arr);

console.log(maxElement([1,2,3,897642,5286,125,5776,2,2,53432]));

const copyArray = arr => new Array(...arr);

const array = [1,2,3,42,86,25,76,2,2,52];
const copiedArray = copyArray(array);
console.log(array, copiedArray);
console.log(array === copiedArray);

const addUniqueId = obj => ({
  id: Symbol('id'),
  ...obj
});

console.log(addUniqueId({name: 123}))

const regroupObject = ({name, details: {university, ...rest}}) => ({
  university,
  user: {
    name,
    ...rest
  }
});

console.log(regroupObject({name: 'Katya', details: {id: 1, age: 21, university: 'KNU'}}));

const hideNumber = str => str.substr(-4, 4).padStart(str.length, '*');

console.log(hideNumber('0123456789'));

const missingProp = () => {
  throw new Error("Missimg properry");
};

const add = (x = missingProp(), y = missingProp()) => x + y;

console.log(add(1,2));
// console.log(add(2))

const getNames = (url) => fetch(url)
  .then(res => res.json())
  .then(data => data.map(item => item['name']).sort())
  .catch(err => console.log(err));

getNames('https://jsonplaceholder.typicode.com/users').then(data => console.log(data));

const getRepoNames = async url => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Requested-With'
      },
      mode: 'cors',
      cache: 'default',
    });
    console.log(res)
    const data = await res.json()
    return data.map(item => item['name'])
    // .reduce((x, y) => x[0] > y[0] ? 1 : -1)
  } catch (error) {
    console.log(error)
  }
};

getRepoNames('https://api.github.com/users/Alesyaa103/repos').then(data => console.log(data));