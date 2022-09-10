import React from 'react';
import useTodos from './hooks/useTodos';

const TodoList = () => {
  const { todosListMap, todoForm } = useTodos();
  return (
    <>
      {todosListMap}
      <hr />
      {todoForm}
    </>
  )
}

export default TodoList