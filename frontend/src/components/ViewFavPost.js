import React, { Component } from 'react';
import { getFavPostDetail } from '../actions/index';
import { connect } from 'react-redux'
export class ViewFavPost extends Component {

  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.getFavPostDetail(params.id)
  }
  render() {
    // const { post } = this.props.postDetailReducer
    console.log(this.props.postDetailReducer)
    return (
      <div className="Div">
        <ul>
          <h2>Post...</h2><hr/>
          {/* {followers.map((value, index) => (
            <li key={index} className="Div>">
              <b> <h4>{value.user.username}</h4></b>
            </li>
          ))
          } */}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ postDetailReducer, authReducer}) => {
  return ({
    postDetailReducer,
    authReducer
  })
}

export default connect(mapStateToProps, { getFavPostDetail})(ViewFavPost);
