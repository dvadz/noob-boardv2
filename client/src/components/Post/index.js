import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import CommentForm from "../CommentForm";
import CommentBox from "../CommentBox";

class Post extends Component {
  state = {
    post: "",
    user: ""
  };

  componentDidMount() {
    this.loadPost();
  }

  loadPost = () => {
    let id = this.props.match.params.id;
    axios.get("/api/post/" + id).then(res => {
      this.setState({
        post: res.data
      });

      axios.get("/api/user/" + this.state.post.author._id).then(res => {
        this.setState({
          user: res.data
        });
      });
    });
  };

  render() {
    const { _id: id, title, body, comments, createdAt } = this.state.post;
    const { loggedIn, userId, history } = this.props;
    const { userName } = this.state.user;
    return (
      <div className="row">
        <div className="col-12 col-md-8 mx-auto">
          <h4>{title}</h4>
          <br />
          <h5>{body}</h5>
          <br />
          <h6>{userName}</h6>
          <br />
          <Moment format="dddd, MMMM Do YYYY, h:mm a">{createdAt}</Moment>
          <br />
          <button onClick={history.goBack}>Back</button>
          <hr />
          {loggedIn ? <CommentForm postId={id} userId={userId} refresh={this.loadPost} /> : <div />}
          {comments ? <CommentBox comments={comments} /> : <div />}
        </div>
      </div>
    );
  }
}

export default Post;
