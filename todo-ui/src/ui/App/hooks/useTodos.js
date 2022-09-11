import React, { useState, useMemo } from 'react';
import { createTodo, deleteTodo } from '../../../api/api';
import { useTodoStore } from '../../../store/contextProvider/todoContext';
import { useObserver } from 'mobx-react';

const useTodos = () => {
    const [name, setName] = useState("");
    const { todoStore } = useTodoStore();

    const todosListMap = useObserver(
        () => {
            console.log(todoStore.todos);
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
        }
    )

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
