import React from 'react';
import Task from './Task';
import Masonry from 'react-masonry-layout';

class List extends React.Component {
    render() {
        const masonryOptions = [ {
                columns: 2,
                gutter: 20
            },
            {
                mq: '768px',
                columns: 3,
                gutter: 20
            },
            {
                mq: '1024px',
                columns: 6,
                gutter: 20
            }];

        var list =  this.props.tasks.map((task) => {
            return (
                <Task key={task.id}
                      className={task.complete ? 'checked' : ''}
                      onDelete={this.props.onListDelete.bind(null, task)}
                      onComplete={this.props.onTaskComplete.bind(null, task)}>
                    {task.text}
                </Task>
            )
        });
        return (
            <div className="task-list"
                     //id="items"
                     //infiniteScrollDisabled
                     //size={masonryOptions}
            >
                {list}
            </div>
        )
    }
}

export default List;

