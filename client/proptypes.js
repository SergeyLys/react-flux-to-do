import React from 'react';

class Blog extends React.Component {
    render() {
        const {title, description, comments} = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
                <ul>
                    {comments.map((comment) => {
                        console.log(comment)
                    })}
                </ul>
                <Tag>
                    lal
                </Tag>
            </div>
        )
    }
}

const comments = [
    {author: 'Someone', comment: 'Text text text'},
    {author: 'Someone2', comment: 'Text text text2'},
    {author: 'Someone3', comment: 'Text text text3'}
];

class Comment extends React.Component {
    render() {
        const {author, comment} = this.props;
        return (
            <li>
                <p>{author}</p>
                <p>{comment}</p>
            </li>
        )
    }
}

class Tag extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Blog;
export default Comment;
export default comments;