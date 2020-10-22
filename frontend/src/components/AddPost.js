import React, { Component } from 'react';
import { addPost } from '../actions/index';
import { connect } from 'react-redux';

export class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: {
                caption: '',
                image: ''
                // imgarray :[]
            }
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
        // const {values}=this.state
        // console.log(this.state.postData)
        this.props.addPost(this.state.postData)
    }

    render() {
        return (<div className="container">
            <form onSubmit={this.handleSubmit}>
                <label>Upload Image:</label>
                <input type='file'
                    name='image'
                    value={this.state.postData.image}
                    //  onChange = {(event) => this.onPostimgChange(file)}
                    onChange={this.onInputChange}
                /><br />
                <label>Caption</label>
                <input type='text'
                    name='caption'
                    value={this.state.postData.caption}
                    onChange={this.onInputChange}
                    placeholder="caption for the image" />

                <button type="submit"  >Post</button>

            </form>

        </div>
        )
    }
}
export default connect(null, { addPost })(AddPost)
