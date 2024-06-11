import { todoStorage } from '../services/todo-store.js'

export class TodosController {

    getTodos = async (req, res) => {
        res.json((await todoStorage.all() || []))
    };

    createTodo = async (req, res) => {
        res.json(await todoStorage.add(req.body));
    };

    updateTodo = async (req, res) => {
        res.json(await todoStorage.update(req.params.id, req.body));
    };

    deleteTodo = async (req, res) => {
        res.json(await todoStorage.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const todosController = new TodosController();