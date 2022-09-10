import axios from 'axios';

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
        console.log(todo);
    } catch (error) {
        console.log(error);
    }
}

export {
    createTodo,
    deleteTodo
}