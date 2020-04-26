let user = {
  login: 'User',
  password: 'UserPass'
}
let admin = {
  login: 'Admin',
  password: 'RootPass'
}

let current = {};
let lenghtPass = 4;
let minHours = 8
let maxHours = 20;

let login = prompt('Please, enter your login');
if (login === admin.login) {
  current = admin;
} else if (login === user.login) {
  current = user;
}

if (!login) {
  alert('Canceled');
} else if (login.length < lenghtPass) {
  alert("I don't know any users having name length less than 4 symbols");
} else if (current.login) {
  let password = prompt('Please, enter you password');
  if (!password) {
    alert('Canceled');
  } else if (password === current.password) {
    let hours = new Date().getHours();
    if (hours <= maxHours && hours >= minHours) {
      alert(`Good day, dear ${current.login}!`);
    } else {
      alert(`Good evening, dear ${current.login}`);
    }
  } else {
    alert('Wrong password');
  }
} else {
  alert('I don’t know you');
}