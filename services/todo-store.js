import DataStore from 'nedb-promises';
import { Todo } from '../Model/todo.js';

export class TodoStorage {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/todos.db', autoload: true} : {}
        this.db = db || new DataStore(options);


    }

    async add(todo) {
        const aTodo = new Todo(todo.id, todo.title, todo.importance, todo.duedate, todo.isDone, todo.description, new Date());
        return this.db.insert(aTodo);
    }

    async delete(aId) {
        this.db.remove({_id: aId});
        return this.get(aId);
    }

    async update(aId, todo) {
        this.db.update({_id: aId}, 
                        {$set: {
                            "title": todo.title,
                            "importance": todo.importance,
                            "duedate": todo.duedate,
                            "isDone": todo.isDone,
                            "description": todo.description
        }});
        return this.get(todo.dbid);
    }

    async get(aId) {
        return this.db.findOne({_id: aId});
    }

    async all() {
        return this.db.find({});
    }
}

export const todoStorage = new TodoStorage();