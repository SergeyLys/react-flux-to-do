import React from 'react';
import ReactDOM from 'react-dom';
//import FluxApp from './flux2';
//import Blog from './proptypes';
//import Comment from './proptypes';
//import comments from './proptypes';

//Flux
import TasksStore from './stores/listStore';
import ListActions from './actions/actions';


// Application components
import Login from './components/Login';
import Task from './components/Task';
import ListEditor from './components/ListEditor';
import List from './components/List';
import './main.scss';


// Material components
import BaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


function getStateFromFlux() {
    return {
        isLoading: TasksStore.isLoading(),
        tasks: TasksStore.getTasks()
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromFlux();
    }

    componentWillMount() {
        ListActions.loadList();
    }

    componentDidMount() {
        TasksStore.addChangeListener(this.onChange.bind(this));
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this.onChange.bind(this))
    }

    handleListAdd(data) {
        ListActions.createTask(data);
    }

    handleListDelete(task) {
        ListActions.deleteTask(task.id);
    }

    handleTaskComplete(task) {
        ListActions.completeTask(task.id)
    }

    onChange() {
        this.setState(getStateFromFlux());
    }

    render() {
        return (
            <div>
                <ListEditor onListAdd={this.handleListAdd.bind(this)} />
                <List id="id" tasks={this.state.tasks} onTaskComplete={this.handleTaskComplete.bind(this)} onListDelete={this.handleListDelete.bind(this)} />
            </div>
        )
    }
}

// Login form component <Login />

class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(BaseTheme)}>
                <App />
            </MuiThemeProvider>
        )
    }
}


ReactDOM.render(
    //<App />,
    <Main />,
    //<FluxApp />,
    //<Blog title="Example title" description="Some text like lorem ipsum" comments={comments}/>,
    document.getElementById('app')
);