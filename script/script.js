'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

const pushToLocalStorage = function(){
    localStorage.setItem('todoData', JSON.stringify(todoData));

 }

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';



    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' +item.value+'</span>' +
        '<div class="todo-buttons">' + '<button class="todo-remove"></button>' + '<button class="todo-complete"></button>' + '</div>';

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);  
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        const btnRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            
            render();
            pushToLocalStorage();
        });
        btnRemove.addEventListener('click', function(){
            for(let i = 0; i < todoData.length; i++){
                if(todoData[i] === item){
                    todoData.splice(i, 1);
                    
                    render();
                    pushToLocalStorage();
                }
            };
           
        });

   
    })
}

const showContent = function(){
    if(localStorage.getItem('todoData') == null){
        localStorage.setItem('todoData', JSON.stringify(todoData));
    } else{
        todoData = JSON.parse(localStorage.getItem('todoData'));
    }
 }



todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value:headerInput.value,
        completed: false,
    }
    if(headerInput.value !==''){
        todoData.push(newTodo);
        
        render();
        pushToLocalStorage();
    }
    if(headerInput.value = ''){
        render();
    }
    

});

 
showContent();
render();