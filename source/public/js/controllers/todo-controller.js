// import { todoService } from "../services/todo-service.js";

// class TodoController {
//     constructor() {
//         this.todoForm = document.querySelector('#form');
//     }

//     // showTodo() {
//     //     console.log('showTodo');
//     // }

//     setTodo(todo) {
//         this.todo = todo;
//     }

//     initEventHandlers() {
//         document.addEventListener('DOMContentLoaded', function() {
//             window.addEventListener('load', function() {
//                 initForm
//                 const params = new URLSearchParams(window.location.search);
//                 // this.todoForm = document.querySelector('#form');
//                 console.log(this.todoForm);
//                 // this.todoForm['title'].value = params.get('title');
//             });
//         });
//     }

//     renderTodoView() {
//         this.showTodo();
//     }

//     initialize() {
//         console.log("init");
//         this.initEventHandlers();
//     }

// }

// create one-and-only instance
// new TodoController().initialize();

// function initToDo() {
//     // DOM Refs
//     const btnCreate = document.querySelector("#btnCreate");
//     const btnOverview = document.querySelector("#btnOverview"); 
//     const btnCreateAndOverview = document.querySelector('#btnCreateAndOverview');

//     function checkFormValues() {
//         const form = document.querySelector("#form"); 
//         form.reportValidity();
//         if (form.title.value.length === 0) {
//             return false;
//         } 
//         if (form.importance.value.length === 0 || form.importance.value > 5) {
//             return false;
//         } 
//         return true;
//     }

//     function createToDo(event, navigate) {
//         console.log("click");
//         if (checkFormValues()) {
//             if (event.target.tagName === 'BUTTON') {
//                 const clickedButton = event.target;
//                 console.log(clickedButton);
//                 if (clickedButton.id === "btnCreate") {
//                     clickedButton.textContent = "Update";
//                 }                
//             }
//         } else {
//             event.stopImmediatePropagation();
//         }
//         //if navigate gotooverview
//     }

//     function goToOverview() {
//         console.log("click");
//         window.location.href='index.html';
//     }

//     //event bubbling implementieren
//     btnCreate.addEventListener("click", createToDo);
//     btnCreateAndOverview.addEventListener("click", event => createToDo(event, true));
//     btnCreateAndOverview.addEventListener("click", goToOverview);
//     btnOverview.addEventListener("click", goToOverview);    
    
// }

// initToDo();