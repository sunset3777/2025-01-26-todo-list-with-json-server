const myDataKey = 'todoListdata'
let todoData = JSON.parse(localStorage.getItem(myDataKey)) || [];

//新增新的待辦事項
const inputText = document.querySelector('#inputtext input')
const addButton = document.querySelector('#inputtext a')
const ul = document.querySelector('#list')
let currentStatus = 'all';
ul.addEventListener('click', handleListClick);

render();


function addItem(e){
    e.preventDefault();

    if (inputText.value.trim() ==='') {
        alert('不能輸入空的待辦事項');
        return;
    }

    const item = {
        content: inputText.value,
        checked: false
    }

    todoData.push(item)
    
    saveData(todoData);
    render();
    
    inputText.value = '';

    console.log('資料已更新');
}

addButton.addEventListener('click',addItem)

//新增刪除功能

function handleListClick(e) {
    const index = e.target.getAttribute('data-index');
    
    if (index === null) return;

    if (e.target.classList.contains('fa-times')) {
        e.preventDefault();
        
        if (todoData[index].checked) {
            todoData.splice(index, 1);
            saveData(todoData);
            render();
        } else {
            alert('請先勾選完成，才能刪除該事項！');
        }
    } 
    
    else if (e.target.classList.contains('todoList_input')) {
        todoData[index].checked = e.target.checked;
        saveData(todoData);
    }
}

//新增切換完成已完成標籤

const tabs = document .querySelectorAll ('#todolistTab a')

tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();

        tabs.forEach(item => item.classList.remove('active'));
        e.target.classList.add('active');

        currentStatus = e.target.getAttribute('data-status');
        render();
    });
});

//新增localstorage

function saveData(arr) {
    const dataStr = JSON.stringify(arr)
    localStorage.setItem('todoListdata', dataStr )
    localStorage.getItem('todoListdata')
    
    console.log ("存入新資料到本地"+ dataStr)
}

//render 渲染 localstorage
    function render(){
        let str='';
        todoData.forEach((item , index )=> {

            if (currentStatus === 'pending' && item.checked) return;
            if (currentStatus === 'completed' && !item.checked) return;

            const isChecked = item.checked ? 'checked' : '';
            
            str += `<li>
            <label class="todoList_label">
            <input class="todoList_input" type="checkbox" ${isChecked} data-index="${index}">
            <span>${item.content}</span>
            </label>
            <a href="#">
            <i class="fa-solid fa-times" data-index="${index}"></i>
            </a>
            </li>`
        });
        ul.innerHTML = str;
    }