import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions";
import firebaseApp from "../../firebase/Firebase";
import { getAuth } from "firebase/auth";

const SignOut = (props) => {
    const auth = getAuth(firebaseApp);

    const onSignOutClick = () => {
        auth.signOut();
        props.signOut();
    };

    const renderAuthButton = () => {
        if (props.isSignedIn === null) {
            return null;
        } else if (props.isSignedIn) {
            return (
                <button
                    onClick={onSignOutClick}
                    className="tiny ui red button"
                    style={{ margin: "5px" }}
                >
                    Sign Out
                </button>
            );
        }
    };

    return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(SignOut);
