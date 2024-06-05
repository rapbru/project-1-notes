import { TodoStorage } from './data/todo-storage.js';
import { Todo } from './todo.js';

export class TodoService {
    constructor(storage) {
        this.storage = storage || new TodoStorage();
        this.todo = [ ];
        this.filter = false;
        this.currentSortOrder = { column: null, desc: false };
    }

    loadData() {
        this.todo = this.storage.getAll().map(todo => new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description, todo.createdate));

        if (this.todo.length === 0) { // initial data seed
            console.log('init data');
            this.todo.push(new Todo(0, 'Geburtstag Mami', 5, '2024-09-01', false, 'Nicht vergessen!', new Date('2023-09-01')));
            this.todo.push(new Todo(1, 'Ferien', 1, null, false, '🏖️', new Date('2024-06-01')));
            this.todo.push(new Todo(2, 'Einkaufen', 3, '2024-05-10', true, 'Milch, Brot, Käse und vieles mehr.', new Date('2024-02-01')));
            this.todo.push(new Todo(3, 'Coiffeur Termin', 4, '2024-06-12', false, '', new Date('2024-06-02')));
            this.save();
        }

        console.log(this.todo);
    }

    save() {
        this.storage.update(this.todo);
    }

    todoSorted(orderBy) {
        const desc = this.currentSortOrder.column === orderBy ? !this.currentSortOrder.desc : false;
        this.currentSortOrder = { column: orderBy, desc };
        
        console.log(this.todo);
        this.todo.sort((a, b) => {

            if (a[orderBy] === null) return desc? -1:1;
            if (b[orderBy] === null) return desc? 1:-1;

            if (a[orderBy] < b[orderBy]) return desc? 1:-1;
            if (a[orderBy] > b[orderBy]) return desc? -1:1;
            return 0;
        });
    }

    toggleFilter() {
        if (!this.filter) {
            this.todo = this.todo.filter(todo => !todo.isDone);
        } else {
            this.loadData();
            const col = this.currentSortOrder.column || null;
            const desc = !this.currentSortOrder.desc || false;
            this.currentSortOrder = { column: col , desc};
            this.todoSorted(this.currentSortOrder.column);
        }
        this.filter = !this.filter;
    }

    addTodo(title , importance, duedate, isDone, description) {
        console.log('todo length: '+this.todo.length);
        const todo = new Todo(this.todo.length, title, importance, duedate, isDone, description, new Date());
        this.todo.push(todo);
        this.save();
        return todo;
    }

    updateTodo(todo) {
        const id = todo.id;
        const index = this.todo.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todo[index] = todo;
        }
        this.storage.update(this.todo);
    }

    removeTodo(todo) {
        const id = todo.id;
        const title = todo.title;
        const index = this.todo.findIndex(todo => todo.id === id && todo.title === title);
        if (index !== -1) {
            this.todo.splice(index, 1);
            this.storage.update(this.todo);
        }
    }
}

export const todoService = new TodoService();