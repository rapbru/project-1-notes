import { TodoStorage } from './data/todo-storage.js';
import { Todo } from './todo.js';
import { DataService } from './data/data-service.js';

export class TodoService {
    constructor(storage) {
        this.storage = storage || new TodoStorage();
        this.storage2 = new DataService();
        this.todos = [ ];
        this.filter = false;
        this.currentSortOrder = { column: null, desc: false };
    }

    async getTodos() {
        if (this.todos.length === 0) this.todos = await this.storage2.getAll();
        return this.todos;
    }

    async loadData() {
        const allTodos = await this.storage2.getAll();  // Warten auf die Auflösung des Promises
        this.todos = allTodos.map(todo => new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description, todo.createdate));
        // this.todos = this.storage.getAll().map(todo => new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description, todo.createdate));

        if (this.todos.length === 0) { // initial data seed
            console.log('init data');
            this.todos.push(new Todo(0, 'Geburtstag Mami', 5, '2024-09-01', false, 'Nicht vergessen!', new Date('2023-09-01')));
            this.todos.push(new Todo(1, 'Ferien', 1, null, false, '🏖️', new Date('2024-06-01')));
            this.todos.push(new Todo(2, 'Einkaufen', 3, '2024-05-10', true, 'Milch, Brot, Käse und vieles mehr.', new Date('2024-02-01')));
            this.todos.push(new Todo(3, 'Coiffeur Termin', 4, '2024-06-12', false, '', new Date('2024-06-02')));
            // this.storage2.createTodo(this.todos[0]);
            // this.storage2.createTodo(this.todos[1]);
            // this.storage2.createTodo(this.todos[2]);
            // this.storage2.createTodo(this.todos[3]);
            this.save();
        }

        console.log(this.todos);
    }

    save() {
        this.storage.update(this.todos);
    }

    todoSorted(orderBy) {
        const desc = this.currentSortOrder.column === orderBy ? !this.currentSortOrder.desc : false;
        this.currentSortOrder = { column: orderBy, desc };
        
        console.log(this.todos);
        this.todos.sort((a, b) => {

            if (a[orderBy] === null) return desc? -1:1;
            if (b[orderBy] === null) return desc? 1:-1;

            if (a[orderBy] < b[orderBy]) return desc? 1:-1;
            if (a[orderBy] > b[orderBy]) return desc? -1:1;
            return 0;
        });
    }

    async toggleFilter() {
        if (!this.filter) {
            this.todos = this.todos.filter(todo => !todo.isDone);
        } else {
            await this.loadData();
            const col = this.currentSortOrder.column || null;
            const desc = !this.currentSortOrder.desc || false;
            this.currentSortOrder = { column: col , desc};
            this.todoSorted(this.currentSortOrder.column);
        }
        this.filter = !this.filter;
    }

    addTodo(title , importance, duedate, isDone, description) {
        const todo = new Todo(this.todos.length, title, importance, duedate, isDone, description, new Date());
        this.todos.push(todo);
        this.save();
        this.storage2.createTodo(todo);
        return todo;
    }

    updateTodo(todo) {
        console.log(todo);
        const id = todo.id;
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos[index] = todo;
        }
        this.storage.update(this.todos);
        this.storage2.update(todo);
    }

    removeTodo(todo) {
        const id = todo.id;
        const title = todo.title;
        const index = this.todos.findIndex(todo => todo.id === id && todo.title === title);
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.storage.update(this.todos);
        }
    }
}

export const todoService = new TodoService();