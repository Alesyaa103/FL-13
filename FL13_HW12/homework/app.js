const root = document.getElementById('root');
const books = window.items;

document.addEventListener('DOMContentLoaded', () => {
  router();
  let header = createElem('header', root);
  let container = createElem('div', root, {
    'id': 'container'
  })
  hashChangeListener()
  mainPage(header)

  function createElem(tag, root, prop) {
    const name = document.createElement(tag);
    if (typeof prop !== 'undefined' && prop) {
      for (let key in prop) {
        if (key) {
          name.setAttribute(key, prop[key])
        }
      }
    }
    root.appendChild(name);
    return name
  }

  function router() {
    window.addEventListener('hashchange', hashChangeListener)
    this.push = route => {
      if (route && route.length > 0) {
        window.location.hash = route;
      }
    }
    return this;
  }

  function hashChangeListener() {
    container = recreateElem(container)
    const hash = window.location.hash;
    switch (hash) {
      case '#add':
        addNewBook(container);
        break;
      case String(hash.match(/#modify/)):
        modifyBook(container);
        break;
      case String(hash.match(/#preview/)):
        previewBook(container);
        break;
      default:
    }
  }

  function recreateElem(elem) {
    if (elem) {
      const name = elem.tagName;
      const newElem = document.createElement(name);
      newElem.setAttribute('id', 'container')
      elem.insertAdjacentElement('beforebegin', newElem);
      elem.remove();
      return newElem;
    }
  }

  function mainPage(root) {
    for (let book in books) {
      if (book) {
        let fullName = books[book].information.name;
        let set = showSet(root, book, fullName, false, false);
        createEditButton(set, books[book].id)
      }
    }
    for (let key in localStorage) {
      if (key) {
        let fullName = key.split('item:');
        if (fullName.length > 1) {
          let set = showSet(root, key, fullName[1], false, false);
          createEditButton(set, key)
        }
      }
    }
    const addNewBook = createElem('a', root, {
      'href': '#add',
      'id': 'addNewSet'
    });
    addNewBook.innerText = 'Add new';
  }

  function createEditButton(set, id) {
    let edit = createElem('a', set, {
      'href': `?id=${id}#modify`,
      'id': 'modify'
    });
    edit.innerText = 'Edit';
  }

  function showSet(root, key, fullName) {
    if (key.split('item:').length > 1) {
      key = key.split('item:')[1]
    }
    const set = createElem('div', root, {
      'class': 'book',
      'id': `${key}`
    });
    let name = createElem('a', set, {
      'href': `?id=${key}#preview`
    });
    name.innerText = `${fullName}`
    return set;
  }

  function showBook(root, isPreview, terms) {
    for (let key in terms) {
      if (key === 'url' && isPreview) {
        createElem('img', root, {
          'src': `${terms[key]}`,
          'alt': 'book'
        })
      } else if (key === 'plot') {
        let term = createElem('textarea', root, {
          'type': 'text',
          'name': `${key}`
        });
        term.innerText = `${terms[key]}`;
        if (isPreview) {
          term.setAttribute('disabled', '')
        }
      } else {
        let term = createElem('input', root, {
          'type': 'text',
          'value': `${terms[key]}`,
          'name': `${key}`
        });
        if (isPreview) {
          term.setAttribute('disabled', '')
        }
      }
    }
  }

  function addNewBook(root) {
    const form = createElem('form', root, {
      'id': 'formSubmit'
    })
    let name = createElem('input', form, {
      'type': 'text',
      'placeholder': 'Add name',
      'name': 'name'
    });

    createElem('input', form, {
      'type': 'text',
      'placeholder': 'Add author',
      'name': 'author'
    });
    createElem('input', form, {
      'type': 'text',
      'placeholder': 'Add image url',
      'name': 'url'
    });
    createElem('textarea', form, {
      'type': 'text',
      'placeholder': 'Add main plot',
      'name': 'plot'
    });
    createElem('input', form, {
      'type': 'submit',
      'value': 'Save changes'
    });
    form.addEventListener('submit', saveNewBook.bind(event, name))
    cancelButton(form)
  }

  function saveNewBook(name, event) {
    event.preventDefault()
    const set = {};
    const formSubmit = document.getElementById('formSubmit')
    const terms = formSubmit.elements;
    for (let i = 0; i < 4; i++) {
      set[`${terms[i].name}`] = terms[i].value
    }
    localStorage.setItem(`item:${name.value}`, JSON.stringify(set));
    window.location.replace(`/?id=${name.value}#preview`)
  }

  function cancelButton(root) {
    const cancel = createElem('input', root, {
      'type': 'button',
      'value': 'Cancel'
    });
    cancel.addEventListener('click', () => {
      let confirmClose = confirm('Discard changes')
      if (confirmClose) {
        window.location.replace('/')
      }
    })
  }

  function modifyBook(root) {
    const form = createElem('form', root, {
      'id': 'formSubmit'
    })
    let id = window.location.href.split('id=')[1].split('#modify')[0];
    if (id.split('%20').length > 1) {
      id = id.split('%20').join(' ')
    }
    for (let key in localStorage) {
      if (key === id) {
        showBook(form, false, JSON.parse(localStorage[key]))
      }
    }
    for (let book in books) {
      if (books[book].id === id) {
        showBook(form, false, books[book].information)
      }
    }
    createElem('input', form, {
      'type': 'submit',
      'value': 'Save changes'
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      for (let key in localStorage) {
        if (key === id) {
          localStorage.removeItem(id);
          let newName = form.name
          saveNewBook(newName, event);
        } else {
          let newName = form.name
          saveNewBook(newName, event);
        }
      }
    })
    cancelButton(form)
  }

  function previewBook(root) {
    let id = window.location.href.split('id=')[1].split('#preview')[0];
    if (id.split('%20').length > 1) {
      id = id.split('%20').join(' ')
    }
    for (let book in books) {
      if (books[book].id === id) {
        showBook(root, true, books[book].information)
      }
    }
    id = 'item:' + id;
    for (let key in localStorage) {
      if (key === id) {
        showBook(root, true, JSON.parse(localStorage[key]))
      }
    }
    cancelButton(root)
  }
})