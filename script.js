const itemKey = 'todoListData'
// let todoData = JSON.parse(localStorage.getItem(itemKey)) || [];
let todoData = [];

//新增新的待辦事項
const inputText = document.querySelector('#inputText input')
const addButton = document.querySelector('#inputText button')
const todoListElement = document.querySelector('#list')
const workNumElement = document.querySelector('.todoList_statistics p');
let currentStatus = 'all';
todoListElement.addEventListener('click', handleListClick);

//api CRUD
function fetchTodos() { 
    return fetch('http://localhost:3000/todos') .then((response) => { return response.json(); })
    .then((data) => { 
    todoData = data.map(item => {
      return {
        id: item.id,
        content: item.content,
        completed: item.completed,
        checked: item.completed
      };
    });
    render();
  }); 
}

fetchTodos().catch((error) => {
    console.error('API 發生錯誤', error);
  });

  //api addItem
  function createTodo(todo) {
    return fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  .then(res => res.json());
}




function addItem(e){
  e.preventDefault();

  if (inputText.value.trim() ==='') {
    alert('不能輸入空的待辦事項');
    return;
  }

  const todo = {
    content: inputText.value,
    completed :false
  }
  createTodo(todo)
  .then((newTodo) => {
    console.log(newTodo);
    inputText.value = '';
    fetchTodos();
    });
  }
  // const item = {
  //   content: inputText.value,
  //   checked: false
  // }

//     todoData.push(item)
    
//     saveData(todoData);
//     render();
    
//     inputText.value = '';


addButton.addEventListener('click',addItem)

//新增刪除功能

function handleListClick(e) {
    const deleteIcon = e.target.closest('.fa-times[data-index]');
    const checkbox = e.target.closest('.todoList_input[data-index]');
    const deleteBtn = e.target.closest('button[data-index]');

    if (deleteIcon) {
    const index = Number(deleteIcon.dataset.index);

    if (!todoData[index].checked) {
      alert('請先勾選完成，才能刪除該事項！');
      return;
    }

    todoData.splice(index, 1);
    saveData(todoData);
    render();
    return;
    }
    
    if (checkbox) {
    const index = Number(checkbox.dataset.index);
    todoData[index].checked = checkbox.checked;
    saveData(todoData);
    render(); 
    }
}

//新增切換完成已完成標籤

const tabs = document.querySelectorAll('#todoListTab a')

tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        const targetTab = e.target.closest('a');
        
        if (!targetTab) return;

        e.preventDefault(); 

        tabs.forEach(item => item.classList.remove('active'));
        targetTab.classList.add('active');

        currentStatus = targetTab.getAttribute('data-status');
        render();
    });
});

//新增localstorage

function saveData(arr) {
    const dataStr = JSON.stringify(arr)
    localStorage.setItem(itemKey, dataStr )
}

//render 渲染 localstorage
    function render(){
        let template='';
        let pendingCount = 0;
        todoData.forEach((item , index )=> {
            if (!item.checked) {
            pendingCount++;
        }

            if (currentStatus === 'pending' && item.checked) return;
            if (currentStatus === 'completed' && !item.checked) return;

            const isChecked = item.checked ? 'checked' : '';
            
            template += `<li>
                            <label class="todoList_label">
                                <input class="todoList_input" type="checkbox" ${isChecked} data-index="${index}">
                                <span>${item.content}</span>
                            </label>
                        <button type="button" data-index="${index}">
                            <i class="fa-solid fa-times" data-index="${index}"></i>
                        </button>
                        </li>`
        });
        todoListElement.innerHTML = template;

        if (workNumElement) {
        workNumElement.textContent = `${pendingCount} 個待完成項目`;
    }
    }