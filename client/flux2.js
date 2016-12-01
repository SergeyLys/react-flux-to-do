import React from 'react';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events';

const AppDispatcher = new Dispatcher();

const buttonActions = {
    PLUS_ACTION: 'PLUS_ACTION',
    MINUS_ACTION: 'MINUS_ACTION'
};

const handleClick = (action) => {
    AppDispatcher.dispatch(action);
};

let initialState = {count: 0};

const counterStore = Object.assign({}, EventEmitter.prototype, {
    getState: () => {
        return initialState
    },

    setState: (newState) => {
        initialState = newState;
        counterStore.emit('change');
    },

    addChangeListener: (callback) => {
        counterStore.on('change', callback);
    },

    removeChangeListener: (callback) => {
        counterStore.removeListener('change', callback);
    }
});

AppDispatcher.register(action => {
    const value = action.value;
    const state = counterStore.getState();
    switch (action.type) {
        case buttonActions.PLUS_ACTION: counterStore.setState({count: state.count + value}); break;
        case buttonActions.MINUS_ACTION: counterStore.setState({count: state.count - value}); break;
        default: return null; break;
    }
});

class PlusButton extends React.Component {
    onButtonClick() {
        handleClick({
            type: buttonActions.PLUS_ACTION,
            value: 1
        })
    }

    render() {
        return (
            <button onClick={this.onButtonClick.bind(this)}>Plus 1</button>
        )
    }
}

class MinusButton extends React.Component {
    onButtonClick() {
        handleClick({
            type: buttonActions.MINUS_ACTION,
            value: 1
        })
    }
    render() {
        return (
            <button onClick={this.onButtonClick.bind(this)}>Minus 1</button>
        )
    }
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = counterStore.getState();
    }

    componentDidMount() {
        counterStore.addChangeListener(this.updateState.bind(this));
    }

    componentWillUnmount() {
        counterStore.removeChangeListener(this.updateState.bind(this));
    }

    updateState() {
        this.setState(counterStore.getState());
    }

    render() {
        return (
            <p>{this.state.count}</p>
        )
    }
}

class FluxApp extends React.Component {
    render() {
        return (
            <div>
                <PlusButton></PlusButton>
                <Counter></Counter>
                <MinusButton></MinusButton>
            </div>
        )
    }
}

export default FluxApp;