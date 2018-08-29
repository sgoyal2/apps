import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import ProfileHeader from './ProfileHeader';


class Profile extends Component {
  componentDidMount() {
     this.props.getCurrentProfile();
   }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (!isEmpty(Object.keys(profile)) &&  Object.keys(profile).length > 0) {
        profileContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.fullName}</Link>
            </p>
             <ProfileHeader profile={profile} />
              
            <div style={{ marginBottom: '60px' }} />
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        profileContent = (
          <div>
            <p className="lead text-muted">Welcome {user.fullName}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Profile);