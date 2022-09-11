import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TodoList from './ui/App/App';
import { TodoStateProvider } from './store/contextProvider/todoContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoStateProvider>
    <TodoList />
  </TodoStateProvider>
);

