import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
       
          <div className="col-2">
          {isEmpty(profile.user) ? null : (
            <img src={profile.user.avatar} alt="" />
          )}
          </div>
        
          <div className="col-lg-6 col-md-4 col-8">
          {isEmpty(profile.user) ? null : ( <h3>{profile.user.fullName}</h3>)}
            <p>
             {isEmpty(profile.bio) ? null : (
                <span> {profile.bio}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.gender) ? null : (
                <span>{profile.gender}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;