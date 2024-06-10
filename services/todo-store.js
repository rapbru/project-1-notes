import DataStore from 'nedb-promises';
import { Todo } from '../Model/todo.js';

export class TodoStorage {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/todos.db', autoload: true} : {}
        this.db = db || new DataStore(options);


    }

    async add(todo) {
        const aTodo = new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description, new Date());
        return await this.db.insert(aTodo);
    }

    async delete(aId) {
        await this.db.update({id: aId}, {$set: {"state": "DELETED"}});
        return this.get(id);
    }

    async update(todo) {
        await this.db.update({id: todo.id}, {$set: {"duedate": todo.duedate}});
        return this.get(todo.id);
    }

    async get(aId) {
        return this.db.findOne({id: aId});
    }

    async all() {
        return this.db.find({});
    }
}

export const todoStorage = new TodoStorage();