import React from 'react';
import { observer } from 'mobx-react';
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

export default observer(TodoList);