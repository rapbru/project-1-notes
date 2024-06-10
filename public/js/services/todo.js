export class Todo {
    constructor(id, title, importance, duedate, done, description, createdate) {
        this.id = id;
        this.title = title;
        this.importance = importance;
        this.duedate = duedate;
        this.isDone = done || false;
        this.description = description;
        this.createdate = createdate;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            importance: this.importance,
            duedate: this.duedate,
            isDone: this.isDone,
            description: this.description,
            createdate: this.createdate
        };
    }
}