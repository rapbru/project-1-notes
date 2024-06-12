import { Todo } from './todo.js';
import { DataService } from './data/data-service.js';

export class TodoService {
    constructor() {
        this.storage = new DataService();
        this.todos = [ ];
        this.filter = false;
        this.currentSortOrder = { column: null, desc: false };
    }

    async getTodos() {
        return this.todos;
    }

    async loadData() {
        const allTodos = await this.storage.getAll();  // Warten auf die Auflösung des Promises
        this.todos = allTodos.map(todo => new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description, todo.createdate, todo._id));

        if (this.todos.length === 0) { // initial data seed
            this.todos.push(new Todo(0, 'Geburtstag Mami', 5, '2024-09-01', false, 'Nicht vergessen!', new Date('2023-09-01')));
            this.todos.push(new Todo(1, 'Ferien', 1, null, false, '🏖️', new Date('2024-06-01')));
            this.todos.push(new Todo(2, 'Einkaufen', 3, '2024-05-10', true, 'Milch, Brot, Käse und vieles mehr.', new Date('2024-02-01')));
            this.todos.push(new Todo(3, 'Coiffeur Termin', 4, '2024-06-12', false, '', new Date('2024-06-02')));

            this.todos.forEach(todo => this.storage.createTodo(todo));
        }

    }

    todoSorted(orderBy) {
        const desc = this.currentSortOrder.column === orderBy ? !this.currentSortOrder.desc : false;
        this.currentSortOrder = { column: orderBy, desc };
        
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

    async addTodo(title , importance, duedate, isDone, description) {
        let todo = new Todo(this.todos.length, title, importance, duedate, isDone, description, new Date());
        todo = await this.storage.createTodo(todo);
        todo.dbid = todo._id;
        this.todos.push(todo);

        return todo;
    }

    async updateTodo(todo) {
        const id = todo.id;
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todo.dbid = this.todos[index].dbid;
            this.todos[index] = todo;
        }
        await this.storage.update(todo);
    }


    async removeTodo(todo) {
        const id = todo.id;
        const title = todo.title;
        const index = this.todos.findIndex(todo => todo.id === id && todo.title === title);
        if (index !== -1) {
            todo.dbid = this.todos[index].dbid;
            await this.storage.deleteTodo(todo.dbid);
            this.todos.splice(index, 1);
        }        
    }
}

export const todoService = new TodoService();