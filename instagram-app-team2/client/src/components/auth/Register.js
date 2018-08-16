import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import home from "../../img/home.png";
import axios from "axios";
import classnames from "classnames";

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
    axios
      .post("api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.fullName
                      })}
                      placeholder="Full Name"
                      name="fullName"
                      value={this.state.name}
                      onChange={this.onChange.bind(this)}
                      required
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange.bind(this)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange.bind(this)}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange.bind(this)}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                    value="Sign up"
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
export default Register;
