export class TodoTemplate {

    createTodoHtml(todo) {
        return todo.map(todo => `
            <div>
                ${todo.title}
                ${todo.description}
                
                <input type="button" data-todo-id="${todo.id}">Edit</button>
            </div>`).join('');
    }
}

export const todoTemplate = new TodoTemplate();