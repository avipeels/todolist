// https://blog.logrocket.com/using-mobx-for-large-scale-enterprise-state-management/
// https://app.pluralsight.com/guides/real-time-chat-app-with-onsenui-and-horizon
import { action, observable, makeAutoObservable } from 'mobx';
// @ts-ignore
import { getTodos } from '../api/api.js';

export class TodoStore {
    @observable todos: { name: string, status: string }[]

    constructor() {
        makeAutoObservable(this);
        this.callTodo();
    }

    async callTodo() {
        this.todos = await getTodos();
    }
}

// export default new TodoStore();