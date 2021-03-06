import React from 'react';
import './Task.scss';


import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

class Task extends React.Component {
    render() {
        return (
            <Paper className={'Task ' + this.props.className} zDepth={2}>
                <Checkbox className="Task__complete-icon" checked={this.props.className ? true : false} onCheck={this.props.onComplete}/>
                <span className='Task__del-icon' onClick={this.props.onDelete}> × </span>
                <div className='Task__text'>{this.props.children}</div>
            </Paper>
        );
    }
}

export default Task;