// https://blog.logrocket.com/using-mobx-for-large-scale-enterprise-state-management/
// https://app.pluralsight.com/guides/real-time-chat-app-with-onsenui-and-horizon
//https://github.com/brandiqa/mobx-crud-example/blob/master/src/stores/store.js
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
// @ts-ignore
import { getTodos, createTodo } from '../api/api.js';

export class TodoStore {
    @observable todos: { name: string, status: string }[]

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
        console.log('From Mobx: ')
        console.log(response);
        runInAction(() => {
            this.todos = [...this.todos, ...[{name, status: 'new' }]];
        })
    }
}
