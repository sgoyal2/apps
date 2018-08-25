import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";

import TextFieldGroup from "../common/TextFieldGroup";
import { Link } from "react-router-dom";
import styled from "styled-components";
import home from "../../img/home.png";

const Wrapper = styled.div`
  height: 90vh;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Wrapper>
        <img src={home} alt="register" />
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-10 m-auto">
                <h1 className="display-10 text-center">Instafake</h1>
                <p className="text-secondary text-center">
                  Sign up to see photos and videos from your friends.
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextFieldGroup
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    errors={errors.password}
                  />

                  <TextFieldGroup
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    errors={errors.password2}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
                <p className="text-center">
                  Have an account? <Link to="/Login">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));