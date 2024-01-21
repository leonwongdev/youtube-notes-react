import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SignOut from "./auth/SignOut";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import firebaseApp from "../firebase/Firebase";
import { getAuth } from "firebase/auth";

const Header = (props) => {
  const auth = getAuth(firebaseApp);
  const handleAuthChange = useRef(() => {});

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      handleAuthChange.current(!!user, user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [auth]);

  handleAuthChange.current = (isSignedIn, user) => {
    if (isSignedIn) {
      props.signIn(user.uid);
    } else {
      props.signOut();
    }
  };

  const renderSignInButton = () => {
    if (!props.isSignedIn) {
      return (
        <Link
          to="/signIn"
          className="tiny ui blue button"
          style={{ margin: "5px" }}
        >
          Sign In
        </Link>
      );
    }
  };

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        CS Video Vault
      </Link>
      <div className="right menu">
        <Link to="/" className="item">
          All Video
        </Link>
        {/* <GoogleAuth /> */}
        {renderSignInButton()}
        <SignOut />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
