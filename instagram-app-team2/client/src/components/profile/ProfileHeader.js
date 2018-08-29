import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body bg-info text-white mb-3">
          {isEmpty(profile.user) ? null: (
               <img
                  className="center"
                  src={profile.user.avatar}
                  alt=""
                /> 
          )}
            </div>
           </div>
            <div className="col-md-8">
               <div >
            
                  <div className="left-center">
                      {isEmpty(profile.user) ? null :(
                          <h1 className="lead text-muted">{profile.user.fullName}</h1>
                      )}
                      <p>
                        {profile.handle}{' '}
                        {isEmpty(profile.bio) ? null : (
                          <span> {profile.bio}</span>
                        )}
                      </p>
                      {isEmpty(profile.phoneNumber) ? null : <p>{profile.phoneNumber}</p>}
                      {isEmpty(profile.gender) ? null : <p>{profile.gender}</p>}
                      <p>
                        {isEmpty(profile.website) ? null : (
                          <a
                            href={profile.website}
                            target="_blank"
                          >
                            <i className="fas fa-globe fa-2x" />
                           {' '} {profile.website}
                          </a>
                        )}

                      </p>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default ProfileHeader;