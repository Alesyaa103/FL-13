const $list = $(".list");
$(document).ready(() => $list.todolist());

$.fn.todolist = function() {
  const $input = $("#add-input");
  const $add = $("#add-submit");
  const $search = $("#search");

  const readTasksFromStorage = () => {
    let tasks = [];
    for(let key in localStorage) {
      if (key.indexOf('_') + 1) {
        let item = JSON.parse(localStorage.getItem(key));
        tasks.push(item);
      }
    }
    return tasks;
  }

  const saveToLocalStorage = (task) => {
    localStorage.setItem(task.id, JSON.stringify(task));
  }

  const createTask = ({id, text, done}) => {
    const task = $('<li>').addClass('item');
    const taskText = $('<span>').text(text).addClass('item-text');
    if (done) {
      taskText.addClass('done')
    }
    taskText.appendTo(task);
    const buttonRemove = $('<button>').addClass('item-remove').text('Remove').appendTo(task);
    $list.prepend(task);
    buttonRemove.click((e) => {
      $(e.target).parent().remove();
      localStorage.removeItem(id);
    });
    taskText.click((e) => {
      $(e.target).toggleClass("done");
      let item = JSON.parse(localStorage.getItem(id));
      item.done = !item.done
      saveToLocalStorage(item);
    })
  }

  const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const addNewTask = (e) => {
    e.preventDefault();
    if($input.val() !== ""){
      const task = {
        id: generateId(),
        text: $input.val(),
        done: false
      };
      createTask(task);
      saveToLocalStorage(task);
    }else {
      $input.attr("placeholder", "add new task");
    }
    $input.val("");
  }
  const findTask = () => {
    const tasks = $('.item-text');
    for (let task of tasks) {
      if (task.innerText.toLowerCase().indexOf($search.val()) + 1) {
        task.parentNode.style.display = ""
      } else {
        task.parentNode.style.display = "none"
      }
    }
  }

  $add.click((e) => addNewTask(e));
  let tasks = readTasksFromStorage();
  tasks.map(task => createTask(task));
  $search.keyup(()=> findTask())
};