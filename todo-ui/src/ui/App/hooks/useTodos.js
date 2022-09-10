import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { createTodo, deleteTodo } from '../../../api/api';

const useTodos = () => {

    const [name, setName] = useState("");
    const [todos, setTodos] = useState([]);

    // const createTodo = async (name) => {
    //     const body = {
    //         name
    //     }
    //     try {
    //         const todo = await axios.post('http://localhost:5000/api/todolist/todo', body);
    //         console.log(todo);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // const deleteTodo = async (id) => {
    //     try {
    //         const todo = await axios.delete(`http://localhost:5000/api/todolist/${id}`);
    //         console.log(todo);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const getTodos = async () => {
        const resp = await axios.get(`http://localhost:5000/api/todolist`);
        setTodos(resp.data);
    };

    useEffect(() => {
        getTodos();
    }, []);

    const todosListMap = useMemo((
        () => (
            todos?.map(t =>
                <>
                    <p>{t.name}</p>
                    <button type="button" onClick={() => deleteTodo(t.id)}>Delete</button>
                </>
            )
        )
    ), [todos])

    const todoForm = useMemo((
        () => (
            <>
                <label>Todo:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </label>
                <button type="button" onClick={() => createTodo(name)}>Add Todo</button>
            </>
        )), [name]);

    return {
        todosListMap,
        todoForm,
        createTodo
    }
}

export default useTodos;
