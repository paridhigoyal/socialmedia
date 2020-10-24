import React, { Component } from 'react'

export class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                id: '',
                content: '',
                user: '',
                commented_post: '',
                commented_at: ''

            }
        }
        this.onInputChange = this.onInputChange.bind(this);
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Comment
