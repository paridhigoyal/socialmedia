/** Follow component is for follow other users profile */

import React, { Component } from 'react'
import { follow } from '../actions/index'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';

export class Follow extends Component {

  render() {
    return (
      <div>
        {this.props.followStatus === 'Follow' && <Button
          variant="contained" color="primary"
          onClick={() => this.props.follow(this.props.id)}>
          Follow
        </Button>
        }
        {this.props.followStatus === "Following" && <Button
          variant="contained" color="primary"
          onClick={() => this.props.follow(this.props.id)}>
          UnFollow
        </Button>
        }
      </div>
    )
  }
}

export default connect(null, { follow })(Follow);
