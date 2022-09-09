import { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState({});

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

  const getTodos = async () => {
    const key = 'f848307b-9a0a-4ae9-b915-d57dd75458a7';
    const resp = await axios.get(`http://localhost:5000/api/todolist/${key}`);
    setTodos(resp.data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <p>{todos?.name}</p>
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