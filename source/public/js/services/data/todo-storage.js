/**
 * Todo storage facilities which persists and loads DTOs/POJOs (data transfer objects).
 * This logic represents the data layer/driver for the Todo application.
 */
export class TodoStorage {
    constructor() {
        localStorage.clear();
        const todo = JSON.parse(localStorage.getItem('TodoStorage_v1') || "[ ]");
        this.todo = todo;
        localStorage.setItem('TodoStorage_v1', JSON.stringify(todo));
    }

    getAll() {
        console.log(this.todo);
        const todo = JSON.parse(localStorage.getItem('TodoStorage_v1') || "[ ]");
        this.todo = todo;
        return this.todo;
    }

    update(todo) {
        localStorage.setItem('TodoStorage_v1', JSON.stringify(todo));
        return this.todo;
    }
}