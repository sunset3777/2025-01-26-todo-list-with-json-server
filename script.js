//新增新的待辦事項
const inputText = document.querySelector('#inputtext input')
const addButton = document.querySelector('#inputtext a')

const ul = document.querySelector('#list')

function addItem(e){
    e.preventDefault();

    if (inputText.value ==='') {
        alert('不能輸入空的待辦事項');
        return;
    }

    const li = document.createElement('li')

    li .innerHTML =
    `<label class="todoList_label">
    <input class="todoList_input" type="checkbox" value="true">
    <span>${inputText.value}</span>
    </label>
    <a href="#">
    <i class="fa-solid fa-times"></i>
    </a>`

    ul .appendChild(li);

    inputText.value ='';

    console.log('成功加入新待辦事項!');
}

addButton.addEventListener('click',addItem)

//新增刪除功能
ul.addEventListener('click', deleteItem);

function deleteItem(e) {
    

    if (e.target.classList.contains('fa-times')) {
        e.preventDefault();
        
        const targetLi = e.target.closest('li');
        const checkbox = targetLi.querySelector('.todoList_input');
        
        if (checkbox.checked) {
            targetLi.remove();
            console.log('項目已刪除');
        } else {
            alert('請先勾選完成，才能刪除該事項！');
            console.log('刪除失敗：事項未完成');
        }
        console.log('項目已刪除');
    }
}