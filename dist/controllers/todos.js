"use strict";
//import {Request, Response, NextFunction } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodos = exports.getTodos = exports.getTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'created the todo.', createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodo = (req, res, next) => {
    const todoId = req.params.id;
    const foundTodo = TODOS.find((el) => el.id === todoId);
    if (foundTodo) {
        res.status(200).json({ todo: foundTodo });
    }
    else {
        res.status(500).json({ message: 'unable to find todo' });
    }
};
exports.getTodo = getTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodos = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('can not find todo');
    }
    //    const existingTodo = TODOS[todoIndex].text = updatedText;
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated!', updatedTodo: TODOS[todoIndex] });
};
exports.updateTodos = updateTodos;
const deleteTodo = (req, res, nex) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('can not find todo');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted.' });
};
exports.deleteTodo = deleteTodo;
