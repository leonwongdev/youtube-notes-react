import React, {useEffect, useRef} from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebaseApp from "../../firebase/Firebase";
import {getAuth, EmailAuthProvider} from "firebase/auth";
import history from "../../history";

import {connect} from "react-redux";
import {signIn, signOut} from "../../actions";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false,
            disableSignUp: {
                status: false,
            },
        },
    ],
    callbacks: {
        signInFailure: (error) => {
            console.error("signInFailure: ", error);
        },
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return false;
        },
    },
};

const SignIn = (props) => {
    // console.log("Firebase object: ", firebaseApp);

    const auth = getAuth(firebaseApp);
    const handleAuthChange = useRef(() => {
    });

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
            handleAuthChange.current(!!user, user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, [auth]);

    handleAuthChange.current = (isSignedIn, user) => {
        if (isSignedIn) {
            props.signIn(user.uid);
            // go back home page after sign in
            history.push("/");
        } else {
            props.signOut();
        }
    };
    
    if (!props.isSignedIn) {
        if (props.isSignedIn === null) {
            return <></>;
        }
        return (
            <>
                <h1>Sign-in</h1>
                <p>
                    Sign-in with your email or input a new email to create
                    account to create, edit, delete your own notes.
                </p>
                <p>Test account email: admin@test.com</p>
                <p>Test account password: password</p>
                {/* <h2>{JSON.stringify(auth.currentUser)}</h2> */}
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
            </>
        );
    }

    return (
        <>
            <h1>Welcome {auth.currentUser.email}</h1>
        </>
    );
};

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {signIn, signOut})(SignIn);
