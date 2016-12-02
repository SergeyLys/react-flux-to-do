import AppDispatcher from '../dispatcher/AppDispatcher';
import axios from 'axios';
import actions from './constants';


const api = {
    taskList() {
        return axios.get(`http://localhost:8080/models`);
    },

    completeTask(taskId) {
        return axios.put(`http://localhost:8080/models/${taskId}`);
    },

    createTask(data) {
        return axios.post(`http://localhost:8080/models`, data);
    },

    deleteTask(taskId) {
        return axios.delete(`http://localhost:8080/models/${taskId}`);
    }
};


const ListActions = {
    loadList() {
        AppDispatcher.dispatch({
            type: actions.LOAD_TASK_REQUEST
        });

        api.taskList()
            .then(( {data} ) =>

                AppDispatcher.dispatch({
                    type: actions.LOAD_TASK_SUCCESS,
                    models: data
                })

            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: actions.LOAD_TASK_FAIL,
                    error: err
                })
            );
    },

    completeTask(taskId) {
        api.completeTask(taskId)
            .then(() =>
                this.loadList()
            )
            .catch(err =>
                console.error(err)
            );
    },

    createTask(list) {
        api.createTask(list)
            .then(() =>
                this.loadList()
            )
            .catch(err =>
                console.error(err)
            );
    },

    deleteTask(taskId) {
        api.deleteTask(taskId)
            .then(() =>
                this.loadList()
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default ListActions;
