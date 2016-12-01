import React from 'react';
import Task from './Task';

class List extends React.Component {
    render() {
        var list =  this.props.tasks.map((task) => {
            return (
                <Task key={task.id} onDelete={this.props.onListDelete.bind(null, task)} onComplete={this.props.onTaskComplete.bind(null, task)}>
                    {task.text}
                </Task>
            )
        });
        return (
            <div className="task-list">
                {list}
            </div>
        )
    }
}

export default List;

