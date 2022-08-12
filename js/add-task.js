'use strict';

document.forms['add-task-form'].elements.title.addEventListener('input', function() {    
    if (this.validity.valueMissing) {
        this.nextElementSibling.innerText = `Required field`;
    } else {
        this.nextElementSibling.innerText = ``;
    }
});

document.forms['add-task-form'].elements.date.addEventListener('input', function() {    
    let currentDate = Math.floor(Date.now() / 100000);
    let userDate = Math.floor(Date.parse(document.getElementById('userdate').value) / 100000);
    
    if (userDate < currentDate) {
        this.nextElementSibling.innerText = `Due date cannot be in the past`;
    } else {
        this.nextElementSibling.innerText = ``;
    }
});

function addTask(event) {
    event.preventDefault();
    let title = this.elements.title;         
    if (title.validity.valueMissing) {
        title.nextElementSibling.innerText = `Required field`;
        return;
    }
    title = title.value;
    
    let description = this.elements.description.value;

    let currentDate = Math.floor(Date.now() / 100000);
    let userDate = Math.floor(Date.parse(document.getElementById('userdate').value) / 100000);
    if (userDate < currentDate) {
        this.nextElementSibling.innerText = `Due date cannot be in the past`;
        return;
    } 
    let date = new Date(this.elements.date.value).toLocaleDateString('ru');

    let id = `${title} ${date}`;

    let taskInfo = {title, description, date, id};
    let tasks = localStorage.getItem('tasks');
            
    if (tasks) tasks = JSON.parse(tasks);
    else tasks = [];
        
    tasks.push(taskInfo);    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.querySelector('.complete').style.display = 'flex';
} 

document.forms['add-task-form'].addEventListener('submit', addTask);

