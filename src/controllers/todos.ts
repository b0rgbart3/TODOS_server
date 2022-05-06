//import {Request, Response, NextFunction } from 'express';

import { json } from "body-parser";
import { RequestHandler } from "express";
import { Todo } from "../models/todo";


const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req,res,next) => {
    const text = (req.body as {text: string}).text;
    const newTodo: Todo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);
    res.status(201).json({message: 'created the todo.', createdTodo: newTodo});
};

export const getTodo: RequestHandler = (req,res,next) => {
    const todoId = req.params.id;
    const foundTodo = TODOS.find((el) => el.id === todoId);
    if (foundTodo ) {
    res.status(200).json({todo: foundTodo});
    }
    else {
        res.status(500).json({message: 'unable to find todo'});
    }
}

export const getTodos: RequestHandler = (req,res,next) => {
    res.status(200).json({todos: TODOS});
}

export const updateTodos: RequestHandler<{id:string}>=(req,res,next) => {
    const todoId = req.params.id;
    const updatedText = (req.body as {text: string} ).text;

    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('can not find todo');
    }
//    const existingTodo = TODOS[todoIndex].text = updatedText;
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    res.json({message: 'Updated!', updatedTodo: TODOS[todoIndex]});
}

export const deleteTodo: RequestHandler = (req,res,nex) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('can not find todo');
    }
    TODOS.splice(todoIndex, 1);
    res.json({message: 'Todo deleted.'});
    
}