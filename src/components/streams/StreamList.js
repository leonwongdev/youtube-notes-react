import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";
import Modal from "../Modal";
import firebaseApp from "../../firebase/Firebase";
import { getAuth } from "firebase/auth";

class StreamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showedTutorial: true };
        this.auth = getAuth(firebaseApp);
    }

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link
                        to={`/streams/${stream.id}`}
                        className="ui button primary"
                    >
                        View
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative"
                    >
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        if (!this.props.streams) {
            return (
                <div className="ui segment">
                    <p></p>
                    <div className="ui active dimmer">
                        <div className="ui loader"></div>
                    </div>
                </div>
            );
        }
        return this.props.streams.map((stream) => {
            const content =
                stream.description.length > 100
                    ? stream.description.substring(0, 100) + " ... Read More"
                    : stream.description;
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon video" />
                    {/* <img
            className="ui mini image"
            src="https://www.youtube.com/img/desktop/yt_1200.png"
          /> */}
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{content}</div>
                    </div>
                </div>
            );
        });
    }

    renderCreate() {
        if (this.props.isSignedIn && this.props.streams) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to="/streams/new" className="ui button primary">
                        Add Your Favorite CS Video
                    </Link>
                </div>
            );
        }
    }

    renderTutorialButton() {
        return (
            <div style={{ textAlign: "left" }}>
                <button
                    className="ui button green"
                    onClick={() => {
                        this.setState(() => {
                            return {
                                showedTutorial: false,
                            };
                        });
                    }}
                >
                    Tutorial
                </button>
            </div>
        );
    }

    renderTutorialContent = () => {
        return (
            <div>
                <p>
                    <strong>
                        This is a demo app for react CRUD application. React.js
                        frontend and Spring boot for backend.
                    </strong>
                </p>
                <p>
                    You can add your favorite CS youtube video to the list or
                    view other users' favorite videos. You can also add your own
                    reviews/notes to the video item.
                </p>
                <p>
                    Sign in to add/edit/delete your own video notes. You can
                    sign up by entering a valid email address.
                </p>
                <p>
                    Your account will only be used to create an unique user id
                    for identifying your video notes. No personal data is
                    collected.
                </p>
                <i className="github icon"></i>
                <a href="https://github.com/leonwongprsn/react-crud-videonote-app">
                    Github repo
                </a>
            </div>
        );
    };

    onDismissModal = () => {
        this.setState(() => {
            console.log(this.state.showedTutorial);
            return {
                showedTutorial: true,
            };
        });
    };

    renderTutorialModal = () => {
        if (this.state.showedTutorial) {
            return;
        }
        return (
            <Modal
                title="How to use this app?"
                content={this.renderTutorialContent()}
                actions={
                    <React.Fragment>
                        <button
                            className="ui button"
                            onClick={this.onDismissModal}
                        >
                            Dismiss
                        </button>
                    </React.Fragment>
                }
                onDismiss={this.onDismissModal}
            />
        );
    };

    render() {
        return (
            <div>
                {this.props.isSignedIn && (
                    <h1>Welcome {this.auth.currentUser.email}</h1>
                )}
                <h2>Notes</h2>
                {this.renderTutorialButton()}
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
                {this.renderTutorialModal()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
