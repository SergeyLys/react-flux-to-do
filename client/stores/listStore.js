import {EventEmitter} from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import actions from '../actions/constants';
import ListActions from '../actions/actions';

const CHANGE_EVENT = 'change';

let _tasks = [];
let _loadingError = null;
let _isLoading = true;

function formatTask(task) {
    //console.log(task.complete);
    return {
        id: task._id,
        text: task.text,
        complete: task.complete
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getTasks() {
        return _tasks;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case actions.LOAD_TASK_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case actions.LOAD_TASK_SUCCESS: {
            _isLoading = false;
            _tasks = action.models.map( formatTask );
            console.log(_tasks);
            _loadingError = null;
            TasksStore.emitChange();

            break;
        }

        case actions.LOAD_TASK_FAIL: {
            _loadingError = action.error;
            console.error(_loadingError);
            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;