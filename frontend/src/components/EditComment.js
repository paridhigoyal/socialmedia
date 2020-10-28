import React, { Component } from 'react'

export class EditComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentData: {
                id: this.props.data.id,
                content: this.props.data.content,
                user: this.props.data.user,
                commented_post:this.props.data.commented_post ,
                commented_at: this.props.data.commented_at
            }
        }
        this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange = (event) => {
        switch (event.target.name) {
            case 'content':
                this.setState({
                    commentData: {
                        ...this.state.commentData,
                        content: event.target.value
                    }
                })
                break;
            default:
                break;
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.props.value)
        // this.props.editComment(this.props.value.id, this.state.commentData)
    }
    showForm = () => {

        return (<div>
            <form onSubmit={this.handleSubmit} >
                <label>Comment</label>
                <input type='text'
                    name='content'
                    value={this.state.commentData.content}
                    onChange={this.onInputChange}
                    placeholder="comment......." /><br />
                <button>Update Comment</button>
            </form>
        </div>
        );
    }


    render() { 
        return (
            <div>
                <button type="button" onClick={() => this.setState({ showForm: true })}>Edit Comment</button>
                {this.state.showForm ? this.showForm() : null}
            </div>
        )
    }
}

export default EditComment
