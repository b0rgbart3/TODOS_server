import { Router } from 'express';
import {createTodo, deleteTodo, getTodo, getTodos, updateTodos } from '../controllers/todos';

const router = Router();

router.post('/', createTodo);

router.get('/:id', getTodo);

router.get('/', getTodos);

router.patch('/:id', updateTodos);

router.delete('/:id', deleteTodo);

export default router;

