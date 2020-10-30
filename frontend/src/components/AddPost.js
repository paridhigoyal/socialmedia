import React, { Component } from 'react';
import { addPost } from '../actions/index';
import { connect } from 'react-redux';

export class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: "",
            image: null,
            //     postData: {
            //         id: '',
            //         post_belongs_to_authenticated_user: '',
            //         post_by: {
            //             id:this.props.authReducer.user.pk,
            //             username: this.props.authReducer.user.username
            //         },
            //         caption: "",
            //         image: null,
            //         likes_count: '',
            //         dislikes_count: '',
            //         comments_count: '',
            //         posted_at: "",
            //         comments: [
            //             {
            //                 id: '',
            //                 content: "",
            //                 user: '',
            //                 commented_post: '',
            //                 commented_at: ""
            //             }
            //         ],
            //         likes: [
            //             {
            //                 id: '',
            //                 liked: '',
            //                 rated_post: '',
            //                 rated_by: ''
            //             }
            //         ]

            //         // imgarray :[]
            //     }
            // }
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    // onPostimgChange = (event) =>{
    //      this.setState({imgarray: event.target.files[0]})
    //       console.log(this.state.imgarray)
    //     }
    // 

    onInputChange = (event) => {
        switch (event.target.name) {
            case 'image':
                this.setState({

                    image: event.target.files[0]

                })
                break;
            case 'caption':
                this.setState({

                    caption: event.target.value

                })
                break;
            default:
                break;
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // const {values}=this.state
        console.log(this.state.image.name, this.state.caption, this.state.image)
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('caption', this.state.caption);

        this.props.addPost(form_data)
    }

    render() {
        return (<div className="container">
            <form onSubmit={this.handleSubmit}>
                <label>Upload Image:</label>
                <input type='file'
                    name='image'
                    accept="image/png, image/jpeg"
                    // value={this.state.postData.image}
                    onChange={this.onInputChange} required
                /><br />
                <label>Caption</label>
                <input type='text'
                    name='caption'
                    value={this.state.caption}
                    onChange={this.onInputChange}
                    placeholder="caption for the image" />

                <button type="submit"  >Post</button>

            </form>

        </div>
        )
    }
}
const mapStateToProps = ({ authReducer }) => {
    return {
        authReducer,

    }
}
export default connect(mapStateToProps, { addPost })(AddPost)
