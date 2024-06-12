export class Todo {
    constructor(id, title, importance, duedate, done, description, createdate, dbid) {
        this.id = id;
        this.title = title;
        this.importance = importance;
        this.duedate = duedate;
        this.isDone = done || false;
        this.description = description;
        this.createdate = createdate;
        this.dbid = dbid;
    }
}