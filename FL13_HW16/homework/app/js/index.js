const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

document.addEventListener('DOMContentLoaded', () => {
  getUsers();
  document.formSubmit.addEventListener('submit', postUser)

  function postUser(e) {
    e.preventDefault()
    const submit = document.getElementById('submit');
    submit.setAttribute('disabled','')
    const xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl + '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let user = {
      name: document.formSubmit.fullname.value,
      username: document.formSubmit.name.value
    }
    xhr.send(JSON.stringify(user));
    xhr.onload = function () {
      submit.removeAttribute('disabled')
      if (xhr.status !== 201) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`)
      } else {
        getUsers();
      }
    };
    xhr.onerror = function () {
      alert('Request failed');
    };
  }

  function getUsers() {
    let loader = createElement(appContainer,'h2');
    loader.innerText = 'Loading...'
    const xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl + '/users');
    xhr.send();
    xhr.onload = function () {
      loader.remove()
      if (xhr.status !== 200) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        displayUsers(JSON.parse(xhr.response))
      }
    };
    xhr.onerror = function () {
      alert('Request failed');
    };
  }

  function displayUsers(users) {
    let userList = document.getElementById('user-container');
    if(userList) {
      userList.remove();
    }
    userList = createElement(appContainer,'ul',{
      id: 'user-container'
    })
    users.forEach(user => drowUser(user, userList));
  }

  function drowUser(user, parent) {
    let li = document.createElement('li');
    parent.prepend(li);
    let id = createElement(li, 'span');
    id.innerText = user.id;
    let form = createElement(li, 'form', {
      id: user.id
    });
    createElement(form, 'input', {
      type: 'text',
      name: 'name',
      value: user.username
    });
    createElement(form, 'input', {
      type: 'text',
      name: 'fullname',
      value: user.name
    });
    let updateButton = createElement(form, 'input', {
      type: 'button',
      value: 'Update'
    })
    let deleteButton = createElement(form, 'input', {
      type: 'button',
      value: 'Delete'
    })
    updateButton.addEventListener('click', updateUser);
    deleteButton.addEventListener('click', deleteUser)
  }

  function createElement(parent, tagName, attributes = {}) {
    const element = document.createElement(tagName);
    Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
    parent.appendChild(element)
    return element;
  }

  function updateUser(e) {
    let form = e.target.parentNode;
    e.target.setAttribute('disabled','');
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', baseUrl + '/users/' + form.id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      name: form.fullname.value,
      username: form.name.value
    }));
    xhr.onload = function () {
      e.target.removeAttribute('disabled')
      if (xhr.status !== 204) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`)
      }
    };
    xhr.onerror = function () {
      alert('Request failed');
    };
  }

  function deleteUser(e) {
    let form = e.target.parentNode;
    e.target.setAttribute('disabled','')
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', baseUrl + '/users/' + form.id);
    xhr.setRequestHeader('Authorization', 'admin');
    xhr.send();
    xhr.onload = function () {
      if (xhr.status !== 204) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`)
      } else {
        getUsers()
      }
    };
    xhr.onerror = function () {
      alert('Request failed');
    };
  }
})