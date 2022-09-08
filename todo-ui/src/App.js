import { useState } from 'react';

const TodoList = () => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Todo:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button type="button" onClick={()=>console.log(name)}>Add Todo</button>
    </form>
  )
}

export default TodoList