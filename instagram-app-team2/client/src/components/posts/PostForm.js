import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { addPost } from "../../actions/postAction";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      image: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      caption: this.state.caption,
      image: this.state.image,
      handle: user.handle,
      avatar: user.avatar
    };
    this.props.addPost(newPost);
    this.setState({ caption: '', image:'' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Post an image</div>

          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="Write a caption"
                  name="caption"
                  value={this.state.caption}
                  onChange={this.onChange}
                  error={errors.caption}
                />
                <TextFieldGroup
                  placeholder="Insert URL link"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);