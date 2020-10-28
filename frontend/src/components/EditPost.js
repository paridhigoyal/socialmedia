import React, { Component } from 'react'
export class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                id: this.props.value.id,
                post_belongs_to_authenticated_user: this.props.value.post_belongs_to_authenticated_user,
                post_by: {
                    id: this.props.value.post_by.id,
                    username: this.props.value.post_by.username
                },
                caption: this.props.value.caption,
                image: this.props.value.image,
                likes_count: this.props.value.likes_count,
                dislikes_count: this.props.value.dislikes_count,
                comments_count: this.props.value.comments_count,
                posted_at: this.props.value.posted_at,
                comments: [],
                likes: []
            }
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange = (event) => {
        switch (event.target.name) {
            case 'image':
                this.setState({
                    postData: {
                        ...this.state.postData,
                        image: event.target.value
                    }
                })
                break;
            case 'caption':
                this.setState({
                    postData: {
                        ...this.state.postData,
                        caption: event.target.value
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
        this.props.editPost(this.props.value.id, this.state.postData)
    }
    showForm = () => {

        return (<div>
            <form onSubmit={this.handleSubmit} >
                <label>Upload Image:</label>
                <input type='file'
                    name='image'
                // value={this.state.postData.image}
                // onChange={this.onInputChange}
                /><br />
                <label>Caption</label>
                <input type='text'
                    name='caption'
                    value={this.state.postData.caption}
                    onChange={this.onInputChange}
                    placeholder="caption for the image" /><br />
                <button>Update Post</button>
            </form>
        </div>
        );
    }

    render() {
        return (
            <div>
                <button type="button" onClick={() => this.setState({ showForm: true })}>Edit Post</button>
                {this.state.showForm ? this.showForm() : null}
            </div>
        )
    }
}

export default EditPost
