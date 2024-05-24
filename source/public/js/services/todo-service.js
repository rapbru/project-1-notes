import { TodoStorage } from './data/todo-storage.js';
import { Todo } from './todo.js';

export class TodoService {
    constructor(storage) {
        this.storage = storage || new TodoStorage();
        this.todo = [ ];
    }

    loadData() {
        this.todo = this.storage.getAll().map(todo => new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description));

        if (this.todo.length === 0) { // initial data seed
            this.todo.push(new Todo(0, 'Geburtstag Mami', 5, '2024-09-01', false, 'Nicht vergessen!'));
            this.todo.push(new Todo(1, 'Ferien', 1, null, false, '🏖️'));
            this.todo.push(new Todo(2, 'Einkaufen', 3, '2024-05-10', true, 'Milch, Brot, Käse und vieles mehr.'));
            this.todo.push(new Todo(3, 'Coiffeur Termin', 4, '2024-06-12', false, ''));
            this.save();
        }
        console.log(this.todo);
    }

    save() {
        this.storage.update(this.todo.map(todo => todo.toJSON()));
    }

    todoSorted(orderBy, desc) {
        this.todo.sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return desc? 1:-1;
            if (a[orderBy] > b[orderBy]) return desc? -1:1;
            return 0;
        });
    }

    addTodo(title , importance, duedate, isDone, description) {
        console.log('todo length: '+this.todo.length);
        const todo = new Todo(this.todo.length, title, importance, duedate, isDone, description);
        this.todo.push(todo);
        this.save();
        return todo;
    }

    updateTodo(todo) {
        this.storage.update(todo);
    }
}

export const todoService = new TodoService();