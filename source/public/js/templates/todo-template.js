export class TodoTemplate {

    createTodoHtml(todo) {
        function insertSymbols(amount) {
            const symbol = '🔥';
            return symbol.repeat(amount);
        }

        function calculateDaysUntil(dueDate) {
            if (!dueDate) return 'someday';
        
            const today = new Date();
            const dueDateObj = new Date(dueDate);
            const timeDiff = dueDateObj - today;
            const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));  // Konvertieren in Tage
        
            if (dayDiff > 0) {
                return `in ${dayDiff} days`;
            } else if (dayDiff === 0) {
                return 'today';
            } else {
                return `${Math.abs(dayDiff)} days ago`;
            }
        }

        if (todo.length === 0) {
            return `<div class="no-todo">Kein Todo gefunden</div>`;
        }

        return todo.map(todo => `
            <div class="todo-entry">
                <div class="duedate">${calculateDaysUntil(todo.duedate)}</div>
                <div class="title">${todo.title}</div>
                <div class="importance">${insertSymbols(todo.importance)}</div>
                <div class="done"><input type="checkbox" disabled ${todo.isDone ? 'checked' : ''}>${todo.isDone ? 'Completed' : 'Open'}</div>
                <div class="description">${todo.description}</div>                
                <button class="edit" type="button" data-todo-id="${todo.id}">Edit</button>
            </div>`).join('');
    }
}

export const todoTemplate = new TodoTemplate();