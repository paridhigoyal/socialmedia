import React, { Component } from 'react'
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { Button, FormControl, InputAdornment } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { searchUserPost } from '../actions/index'

class SearchUserPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange = event => this.setState({ username: event.target.value })

  onFormSubmit = event => {
    event.preventDefault();

    console.log(this.props)
    this.props.searchUserPost(this.state.username)
    this.setState({ username: '' })
  }

  render() {
    return (
      <div >
        <form onSubmit={this.onFormSubmit} >
          <FormControl>
            <InputBase
              placeholder='.....search'
              type='text'
              value={this.state.username}
              onChange={this.onInputChange}
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" onClick={this.onFormSubmit}> search.... </Button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    searchUserPost: (username) => dispatch(searchUserPost(username))

  }
}
const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchUserPost)