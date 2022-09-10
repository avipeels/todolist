import React, { useEffect, useState, useMemo } from 'react';
import { getTodos, createTodo, deleteTodo } from '../../../api/api';

const useTodos = () => {
    const [name, setName] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const cb = async () => {
            const todoList = await getTodos();
            setTodos(todoList);
        }
        cb();
    }, []);

    const todosListMap = useMemo((
        () => {
            return (
                <ul>
                    {todos?.map(t =>
                        <li key={t.id}>
                            <p>{t.name}</p>
                            <button type="button" onClick={() => deleteTodo(t.id)}>Delete</button>
                        </li>
                    )}
                </ul>
            )
        }
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
