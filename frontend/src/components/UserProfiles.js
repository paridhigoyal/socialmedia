import React, { Component } from 'react'
import { getProfiles } from '../actions/index'
import { connect } from 'react-redux';
import EditProfile from './EditProfile';
import Follow from './Follow'

class Profiles extends Component {

    componentDidMount() {
        const { isAuthenticated } = this.props.authReducer
        console.log(isAuthenticated)
        if (isAuthenticated) {
            this.props.getProfiles()
        }
    }


    render() {
        const { profiles } = this.props.profilereducer
        console.log(profiles)

        return (
            <div>

                <ul>


                    {profiles.map((value, index) => (

                        <li key={index}>
                            username: {value.username}<br />
                            {value.first_name} {value.last_name}<br />
                            {value.location}<br />

                            <div>
                                following: <a href={`/following/${value.user_id}`} id="following">
                                    {value.following_count}</a>
                                followers: <a href={`/followers/${value.user_id}`} id="followers">
                                    {value.followers_count}</a>
                            </div>
                            <div>
                                {(value.profile_belongs_to_authenticated_user) ?
                                    <EditProfile value={value} /> :
                                    <p>...</p>
                                }
                            </div>

                            <div >
                                {
                                    (!value.profile_belongs_to_authenticated_user)
                                        ? <Follow followStatus={value.follow_status} id={value.user_id} />
                                        : <b> Can't follow yourself </b>
                                }
                            </div>

                        </li>
                    ))
                    }
                </ul>
            </div>
        )
    }
}


const mapStateToProps = ({ authReducer, profilereducer }) => {
    return {
        authReducer,
        profilereducer
    }
}

export default connect(mapStateToProps, { getProfiles })(Profiles);
