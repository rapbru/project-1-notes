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
            this.todo.push(new Todo(0, 'Test', 1, '23.02.2024', false, 'this is a test'));
            this.save();
        }
    }

    save() {
        this.storage.update(this.todo.map(todo => todo.toJSON()));
    }

    todoSorted(orderBy) {
        return [...todo].sort(orderBy);
    }

    addTodo(id, title , importance, duedate, isDone, description) {
        const todo = new Todo(id, title, importance, duedate, isDone, description);
        this.todo.push(todo);
        this.save;
        return todo;
    }
}

export const todoService = new TodoService();