// https://blog.logrocket.com/using-mobx-for-large-scale-enterprise-state-management/
// https://app.pluralsight.com/guides/real-time-chat-app-with-onsenui-and-horizon
//https://github.com/brandiqa/mobx-crud-example/blob/master/src/stores/store.js
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
// @ts-ignore
import { getTodos, createTodo, deleteTodo } from '../api/api.js';

export class TodoStore {
    @observable todos: {
        id: number; name: string, status: string
    }[]

    constructor() {
        makeAutoObservable(this);
    }
    async loadTodos() {
        const data = await getTodos();
        runInAction(() => {
            this.todos = data;
        })
    }

    @action
    createTodo = async (name: string) => {
        const response = await createTodo(name);

        runInAction(() => {
            this.todos = [...this.todos, ...[{ name: response.data.todo.name, status: response.data.todo.status, id: response.data.todo.id }]];
        })
    }

    @action
    deleteTodo = async (id: string) => {
        const response = await deleteTodo(id);

        runInAction(() => {
            // @ts-ignore
            const index = this.todos.findIndex(todo => todo.id === response.data);
            const partOne = this.todos.slice(0, index);
            const partTwo = this.todos.splice(index + 1)
            this.todos = [...partOne, ...partTwo];
        })

    }
}
