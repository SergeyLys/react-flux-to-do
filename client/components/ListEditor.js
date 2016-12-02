import React from 'react';

import './TaskEditor.scss';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ListEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        })
    }

    handleListAdd() {
        const newText = {
            text: this.state.text
        };

        this.props.onListAdd(newText);
        this.setState({text: ''});
    }

    render() {
        return (
            <div className="task-editor">
                <TextField
                    hintText="Enter text"
                    fullWidth={true}
                    floatingLabelText="This task will add"
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                />
                <RaisedButton
                    onClick={this.handleListAdd.bind(this)}
                    label="Add task"
                    fullWidth={true}
                    primary={true}
                />
            </div>
        )
    }
}

export default ListEditor;