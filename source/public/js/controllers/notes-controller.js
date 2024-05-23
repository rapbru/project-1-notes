import { todoService } from "../services/todo-service.js";
import { todoTemplate } from "../templates/todo-template.js"

export class NotesController {
    constructor() {
        this.btnContainer = document.querySelector('#btn-container');
        this.todoContainer = document.querySelector('#todo-container');
        this.formContainer = document.querySelector('#form-container');
        this.form = document.querySelector('#form');

        this.todo = [ ];
    }

    showNotes() {
        console.log('showTodos');
        this.todoContainer.innerHTML = todoTemplate.createTodoHtml(todoService.todo);
    }

    hideTodoForm() {
        this.btnContainer.classList.remove('invisible');
        this.todoContainer.classList.remove('invisible');
        this.formContainer.classList.add('invisible');
    }

    showTodoForm() {
        this.btnContainer.classList.add('invisible');
        this.todoContainer.classList.add('invisible');
        this.formContainer.classList.remove('invisible');
    }

    editTodo(todo) {
        this.form['title'].value = todo.title;
        this.form['importance'].value = todo.importance;
        // this.form['title'].value = todo.title;
        // this.form['title'].value = todo.title;
        // this.form['title'].value = todo.title;

        this.showTodoForm();
    }

    showTodo(todo) {
        // window.location.href = `pages/todo.html?id=${todo.id}&title=${todo.title}`;
    }

    initEventHandlers() {
        this.todoContainer.addEventListener('click', (event) => {
            const id = Number(event.target.dataset.todoId);

            if (!isNaN(id)) {
                this.editTodo(todoService.todo[id]);
            }
        });

        this.formContainer.addEventListener('click', (event) => {
            this.hideTodoForm();
        });
    }

    renderNotesView() {
        this.showNotes();
    }

    initialize() {
        console.log('init');
        this.initEventHandlers();
        todoService.loadData();
        this.renderNotesView();
    }
}

// create one-and-only instance
new NotesController().initialize();