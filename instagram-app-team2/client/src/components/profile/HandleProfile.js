import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import ProfileHeader from './ProfileHeader';


class HandleProfile extends Component {
    componentDidMount() {
        if (this.props.match.params.handle) {
          this.props.getProfileByHandle(this.props.match.params.handle);
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
          this.props.history.push('/not-found');
        }
      }
    
  render() {
    //const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {

       // Check if logged in user has profile data
      if (!isEmpty(Object.keys(profile)) &&  Object.keys(profile).length > 0) {
        profileContent = (
            <div className="container"> 
              <Link to="/profiles" >
                Back To Profiles
              </Link>
            <p/>
            <p/>
            <ProfileHeader profile={profile} />
         </div>  
        );
      } else {
            profileContent = (
            <div>
                <Link to="/profiles" >
                  Back To Profiles
                </Link>
                <p/>
                <p/>
                <p className="lead text-muted"> profile not found for {this.props.match.params.handle}   handle</p>
                <p>User have not yet setup a profile, please try later</p>
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

HandleProfile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
 });

export default connect(mapStateToProps, { getProfileByHandle})(HandleProfile);