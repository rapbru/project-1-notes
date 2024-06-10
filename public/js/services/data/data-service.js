import { httpService } from './http-service.js'

export class DataService {
    constructor() {
    }

    async createTodo(todo) {
        console.log(todo);
        return httpService.ajax("POST", "/todos/", todo);    
    }

    async getAll() {
        return httpService.ajax("GET", "/todos/", undefined);
    }

    async update(todo) {
        console.log('put todo');
        console.log(todo);
        return httpService.ajax("POST", "/todos/", todo);
    }

    async deleteTodo(id) {
        return httpService.ajax("DELETE", `/todos/${id}`, undefined);    
    }
}