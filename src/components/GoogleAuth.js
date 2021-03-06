import React from "react";
import { connect } from "react-redux";

import { googleSignIn, googleSignOut } from "../actions";
import logo from "../images/google-icon-small.png";
import history from "../history";
import showScroll from "./sub-components/showScroll";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: `1025972697585-ic4decmrr955d2q41ir910g551o1037v.apps.googleusercontent.com`,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const profile = this.auth.currentUser.get();
      this.props.googleSignIn(
        profile.getId(),
        profile.getBasicProfile().getImageUrl()
      );
    } else {
      this.props.googleSignOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
    this.props.hideModal();

    showScroll();
  };

  onSignOutClick = () => {
    this.auth.signOut();
    this.props.hideModal();

    history.push("/");
    window.location.reload();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === false) {
      return (
        <button
          onClick={this.onSignInClick}
          className="btn header-nav-btn google-btn"
        >
          <img src={logo} alt="Google Login" className="modal-img" />
          <span>Tiếp tục với Google</span>
        </button>
      );
    }
    if (this.props.isSignedIn) {
      return (
        <button className="logout-btn" onClick={this.onSignOutClick}>
          Đăng xuất
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProp = function (state) {
  return {
    isSignedIn: state.googleAuth.isSignedIn,
  };
};

export default connect(mapStateToProp, {
  googleSignIn,
  googleSignOut,
})(GoogleAuth);
