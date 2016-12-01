// FLUX
import React from 'react';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events';

const buttonActions = {
    PLUS_ACTION: 'PLUS_ACTION',
    MINUS_ACTION: 'MINUS_ACTION'
};

const appDispatcher = new Dispatcher();

var initialState = {count: 0};

const dashBoardStore = Object.assign({}, EventEmitter.prototype, {

    setState: (newState) => {
        initialState = newState;
        dashBoardStore.emit('change');
    },

    getState: () => {
        return initialState;
    },

    addChangeListener: (callback) => {
        dashBoardStore.on('change', callback)
    },

    removeChangeListener: (callback) => {
        dashBoardStore.removeListener('change', callback)
    }
});

appDispatcher.register(action => {
    const dashBoardState = dashBoardStore.getState();
    const value = action.value;

    switch (action.type) {
        case buttonActions.PLUS_ACTION: {
            dashBoardStore.setState({
                count: dashBoardState.count + value
            });
            break;
        }
        case buttonActions.MINUS_ACTION: {
            dashBoardStore.setState({
                count: dashBoardState.count - value
            });
            break;
        }
        default:
            return null;
    }

});

class PlusButton extends React.Component {
    onButtonClick() {
        appDispatcher.dispatch({
            type: buttonActions.PLUS_ACTION,
            value: 1
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.onButtonClick.bind(this)}>plus one</button>
            </div>
        )
    }
}

class MinusButton extends React.Component {
    onButtonClick() {
        appDispatcher.dispatch({
            type: buttonActions.MINUS_ACTION,
            value: 1
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.onButtonClick.bind(this)}>minus one</button>
            </div>
        )
    }
}

class DashBoard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = dashBoardStore.getState();
    }

    componentDidMount() {
        dashBoardStore.addChangeListener(this.updateState.bind(this));
    }

    componentWillUnmount() {
        dashBoardStore.removeChangeListener(this.updateState.bind(this));
    }

    updateState() {
        this.setState(dashBoardStore.getState());
    }

    render() {
        var {count} = this.state;
        return (
            <div>
                <h2>Counter: {count}</h2>
            </div>
        )
    }
}

class Flux extends React.Component {
    render() {
        return (
            <div>
                <MinusButton/>
                <DashBoard/>
                <PlusButton/>
            </div>
        )
    }
}

export default Flux;