'use strict';

let taskSection = document.getElementById('tasks');
let tasks = localStorage.getItem('tasks');
console.log(tasks.length)

if (tasks.length <= 2) {
	document.getElementById('button').style.cssText = `display: none`;
	taskSection.innerText = 'There are not any tasks in the list';
	taskSection.style.cssText =
			`
			display: flex;
			justify-content: center;
			color: #0f1427;
			margin: 5%;
			`;
} else {
	tasks = JSON.parse(tasks);
	for (let task of tasks){
		let div = document.createElement('div');
		let h3 = document.createElement('h3');
		h3.innerText = task.title;

		let p = document.createElement('p');
		p.innerText = task.description;
		let date = `Complete by: ${task.date}`;
		
		div.append(h3, p, date);
		div.setAttribute('id', task.id)

		div.style.cssText =
			`
			display: block;
			padding: 3%;
			background-color: #adb9c9;
			margin: 1% 10%;
			color: #0f1427;
			`;
		taskSection.append(div);
	}
}

let eachTask = document.querySelectorAll('div');

function selectTask ({target}) {
	let clickElem = target;
	for (let task of eachTask) {
		if (clickElem === task) {
			if (!clickElem.hasAttribute('class')) {
				task.style.cssText =
					`
					display: block;
					padding: 3%;
					background-color: #0f1427;
					margin: 1% 10%;
					color: white;
					`;
				task.setAttribute('class', 'selected');
			} else {
				task.style.cssText =
					`
					display: block;
					padding: 3%;
					background-color: #adb9c9;
					margin: 1% 10%;
					color: rgb(27, 13, 41);
					`;
				task.removeAttribute('class');
			}
		}
	}
}
taskSection.addEventListener('click', selectTask);

function deleteTask () {
	let selectedTasks = document.querySelectorAll('.selected')
	for (let i = 0; i < selectedTasks.length; i++) {
		for (let n = 0; n < tasks.length; n++) {
			if (selectedTasks[i].id === tasks[n].id) {
				selectedTasks[i].remove();
				tasks.splice(n, 1);
				localStorage.clear();
				localStorage.setItem('tasks', JSON.stringify(tasks));	
			}
		}
	}
}
document.getElementById('button').addEventListener('click', deleteTask);