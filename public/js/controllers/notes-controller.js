import { todoService } from "../services/todo-service.js";
import { todoTemplate } from "../templates/todo-template.js"

export class NotesController {
    constructor() {
        this.btnContainer = document.querySelector('#btn-container');
        this.todoContainer = document.querySelector('#todo-container');
        this.formContainer = document.querySelector('#form-container');
        this.form = document.querySelector('#form');

        this.btnCreate = document.querySelector('#btnCreate');
        this.btnCreateAndOverview = document.querySelector('#btnCreateAndOverview');

        this.todo = [ ];
    }

    async showNotes() {
        this.todoContainer.innerHTML = todoTemplate.createTodoHtml(await todoService.getTodos());
    }

    hideTodoForm() {
        this.btnContainer.classList.remove('invisible');
        this.todoContainer.classList.remove('invisible');
        this.formContainer.classList.add('invisible');

        this.showNotes();
    }

    showTodoForm() {
        this.btnContainer.classList.add('invisible');
        this.todoContainer.classList.add('invisible');
        this.formContainer.classList.remove('invisible');
    }

    editTodo(todo) {
        this.todo = todo;
        this.form['title'].value = this.todo.title;
        this.form['importance'].value = this.todo.importance;
        this.form['duedate'].value = this.todo.duedate;
        this.form['done'].checked = this.todo.isDone;
        this.form['description'].value = this.todo.description;

        this.btnCreate.dataset.action = "updateTodo";
        this.btnCreate.innerHTML = "Update";
        this.btnCreateAndOverview.dataset.action = "updateTodo";
        this.btnCreateAndOverview.innerHTML = "Update & Overview";

        this.showTodoForm();
    }

    async createTodo(navigate) {
        if (this.checkFormValues()) {
            this.todo = await todoService.addTodo(this.form['title'].value, this.form['importance'].value, this.form['duedate'].value, this.form['done'].checked, this.form['description'].value);
            if (navigate) {
                this.hideTodoForm();
            } else {
                this.btnCreate.dataset.action = "updateTodo";
                this.btnCreate.innerHTML = "Update";
                this.btnCreateAndOverview.dataset.action = "updateTodo";
                this.btnCreateAndOverview.innerHTML = "Update & Overview";
            }
        }
    }

    async updateTodo(navigate) {
        if (this.checkFormValues()) {
            this.todo.title = this.form['title'].value;
            this.todo.importance = this.form['importance'].value;
            this.todo.duedate = this.form['duedate'].value;
            this.todo.isDone = this.form['done'].checked;
            this.todo.description = this.form['description'].value;
            await todoService.updateTodo(this.todo);
            if (navigate) {
                this.hideTodoForm();
            }
        }
    }

    async deleteTodo(navigate) {
        await todoService.removeTodo(this.todo);
        if (navigate) {
            this.hideTodoForm();
        }
    }

    resetForm() {
        this.form.reset();
        this.btnCreate.dataset.action = "addTodo";
        this.btnCreate.innerHTML = "Create";
        this.btnCreateAndOverview.dataset.action = "addTodo";
        this.btnCreateAndOverview.innerHTML = "Create & Overview";
    }

    checkFormValues() {
        this.form.reportValidity();
        if (form.title.value.length === 0) {
            return false;
        } 
        if (form.importance.value.length === 0 || form.importance.value > 5) {
            return false;
        } 
        return true;
    }

    updateSortSymbols(orderBy) {
        document.querySelectorAll('.sortSymbol').forEach(el => el.className = 'sortSymbol');
        const btn = orderBy.charAt(0).toUpperCase() + orderBy.slice(1);
        const sortSymbol = document.getElementById(`btn${btn}`);
        sortSymbol.className = `sortSymbol ${todoService.currentSortOrder.desc ? 'desc' : 'asc'}`;
    }

    initEventHandlers() {
        this.btnContainer.addEventListener('click', async (event) => {
            if (event.target.id === 'newTodo') {
                this.resetForm();
                this.showTodoForm();
            } else if (event.target.id === 'toggleFilter') {
                await todoService.toggleFilter();
                this.showNotes();
            } else if (event.target.id ==='toggleStyle') {
                document.body.classList.toggle('dark-theme');
            } else if (event.target.dataset.orderBy !== undefined && event.target.dataset.orderBy.length > 0) {
                todoService.todoSorted(event.target.dataset.orderBy);
                this.updateSortSymbols(event.target.dataset.orderBy);
                this.showNotes();
            }

        });

        this.todoContainer.addEventListener('click', (event) => {
            const id = Number(event.target.dataset.todoId);
            if (!isNaN(id)) {
                this.editTodo(todoService.todos.find(todo => todo.id === id));
            }
        });

        this.formContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                if (event.target === this.btnCreate) {
                    if (event.target.dataset.action === 'addTodo') {
                        this.createTodo(false);
                    } else {
                        this.updateTodo(false);
                    }
                } else if (event.target === this.btnCreateAndOverview) {
                    if (event.target.dataset.action === 'addTodo') {
                        this.createTodo(true);
                    } else {
                        this.updateTodo(true);
                    }
                } else if (event.target.id === 'btnDelete') {
                    this.deleteTodo(true);
                } else {
                    this.hideTodoForm();
                }
            }            
        });
    }

    renderNotesView() {
        this.showNotes();
    }

    async initialize() {
        this.initEventHandlers();
        await todoService.loadData();
        this.renderNotesView();
    }
}

// create one-and-only instance
new NotesController().initialize();