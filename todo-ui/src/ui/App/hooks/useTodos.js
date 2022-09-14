import React, { useState, useMemo, useEffect } from 'react';
import { deleteTodo } from '../../../api/api';
import { useTodoStore } from '../../../store/contextProvider/todoContext';

const useTodos = () => {
    const [name, setName] = useState("");
    const { todoStore } = useTodoStore();
    const { createTodo } = todoStore;

    useEffect(() => {
        todoStore.loadTodos();
    }, []);

    const todosListMap = useMemo(() => {
        return (
            <ul>
                {todoStore.todos?.length > 0 && todoStore.todos?.map(t =>
                    <li key={t.id}>
                        <p>{t.name}</p>
                        <button type="button" onClick={() => deleteTodo(t.id)}>Delete</button>
                    </li>
                )}
            </ul>
        )
    }, [todoStore.todos])


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
        )), [createTodo, name]);

    return {
        todosListMap,
        todoForm,
        createTodo
    }
}

export default useTodos;
