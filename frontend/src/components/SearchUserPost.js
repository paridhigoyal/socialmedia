import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchuserpost } from '../actions'

export class SearchUserPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
  }
  onInputChange = event => this.setState({ username: event.target.value })

  onFormSubmit = event => {
    event.preventDefault();
    this.props.searchuserpost(this.state.username)
    this.setState({ username: '' })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} >
          <input
            type='text'
            value={this.state.username}
            onChange={this.onInputChange}
          />
          <button> search </button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = ({ authReducer, postreducer }) => {
  return {
    authReducer,
    postreducer
  }
}
export default connect(mapStateToProps, { searchuserpost })(SearchUserPost)