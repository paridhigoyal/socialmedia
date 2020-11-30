/** SearchUserPost is for searching user posts */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { FormControl, InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import InputBase from '@material-ui/core/InputBase';
import { searchUserPost } from '../actions/index'

const Styles = styled.div`

  .form-center {
    position: absolute !important;
    left: 5%;
    right: 40%;
  }
`;

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
    this.props.searchUserPost(this.state.username)
    this.setState({ username: '' })
  }

  render() {
    return (
      <Styles>
        <Form onSubmit={this.onFormSubmit} className="form-center">
          <FormControl type="text" placeholder="Search">
            <InputBase style={{ color: 'white' }}
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
        </Form>
      </Styles>
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