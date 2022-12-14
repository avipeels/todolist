import axios from 'axios';

const getTodos = async () => {
    const resp = await axios.get(`http://localhost:5000/api/todolist`);
    return resp.data;
};

const createTodo = async (name) => {
    const body = {
        name
    }
    try {
        const todo = await axios.post('http://localhost:5000/api/todolist/todo', body);
        return todo;
    } catch (err) {
        console.log(err);
    }
};

const deleteTodo = async (id) => {
    try {
        const todo = await axios.delete(`http://localhost:5000/api/todolist/${id}`);
        return todo;
    } catch (error) {
        console.log(error);
    }
}

export {
    getTodos,
    createTodo,
    deleteTodo
}