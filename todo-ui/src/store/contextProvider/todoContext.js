import { createContext, useContext } from "react";

import { TodoStore } from '../store';

const TodoContext = createContext();
const todoStore = new TodoStore();

export const TodoStateProvider = ({ children }) => {
    return (
        <TodoContext.Provider value={{ todoStore }}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodoStore = () => useContext(TodoContext)