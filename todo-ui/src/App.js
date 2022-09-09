import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const createTodo = async (name) => {
    const body = {
      name
    }
    try {
      const todo = await axios.post('http://localhost:5000/api/todolist/todo', body);
      console.log(todo);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todo = await axios.delete(`http://localhost:5000/api/todolist/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const getTodos = async () => {
    const resp = await axios.get(`http://localhost:5000/api/todolist`);
    setTodos(resp.data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {todos && todos?.map(t =>
        <>
          <p>{t.todolist.name}</p>
          <button type="button" onClick={() => deleteTodo(t.id)}>Delete</button>
        </>
      )}
      <hr />
      <form onSubmit={handleSubmit}>
        <label>Todo:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </label>

        <button type="button" onClick={() => createTodo(name)}>Add Todo</button>
      </form>
    </>
  )
}

export default TodoList