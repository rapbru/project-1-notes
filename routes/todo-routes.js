import express from 'express';

const router = express.Router();
import { todosController } from '../controller/todos-controller.js'

router.get("/", todosController.getTodos);
router.post("/", todosController.createTodo);
router.put("/", todosController.updateTodo);
router.delete("/:id/", todosController.deleteTodo);

export const todoRoutes = router;