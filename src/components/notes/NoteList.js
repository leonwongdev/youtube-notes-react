import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotes } from "../../actions";
import Modal from "../Modal";
import firebaseApp from "../../firebase/Firebase";
import { getAuth } from "firebase/auth";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showedTutorial: true };
    this.auth = getAuth(firebaseApp);
  }

  componentDidMount() {
    this.props.fetchNotes();
  }

  renderAdmin(note) {
    if (note.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/notes/${note.id}`} className="ui button primary">
            View
          </Link>
          <Link to={`/notes/delete/${note.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    } else {
      return (
        <div className="right floated content">
          <div style={{ fontSize: "0.8rem" }}>
            {" "}
            Read-only note created by other user
          </div>
        </div>
      );
    }
  }

  renderList() {
    if (!this.props.notes || !this.props.notes.length) {
      return (
        <div className="ui segment" style={{ height: "200px" }}>
          <p></p>
          <div className="ui active dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      );
    }
    return this.props.notes.map((note) => {
      const content =
        note.description.length > 100
          ? note.description.substring(0, 100) + " ... Read More"
          : note.description;
      return (
        <div className="item" key={note.id}>
          {this.renderAdmin(note)}
          <i className="large middle aligned icon video" />

          <div className="content">
            <Link to={`/notes/${note.id}`} className="header">
              {note.title}
            </Link>
            <div className="description">{content}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn && this.props.notes) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/notes/new" className="ui button primary">
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
          Tutorial & Source Code
        </button>
      </div>
    );
  }

  renderTutorialContent = () => {
    return (
      <div>
        <p>
          <strong>
            This is a demo app for react CRUD application. React.js frontend and
            .Net 8 for backend.
          </strong>
        </p>
        <p>
          You can add your favorite CS youtube video to the list or view other
          users' favorite videos. You can also add your own reviews/notes to the
          video item.
        </p>
        <p>
          Sign in to add/edit/delete your own video notes. You can sign in by
          entering a valid email address.
        </p>
        <p>
          <strong style={{ color: "orangered" }}>
            Test account is provided in sign in page.
          </strong>
        </p>
        <p>
          Your account will only be used to create an unique user id for
          identifying your video notes. No personal data is collected.
        </p>
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
            <button className="ui button" onClick={this.onDismissModal}>
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
        <div>
          {" "}
          <a
            href="https://github.com/leonwongdev/youtube-notes-react"
            target={"_blank"}
            rel="noreferrer"
          >
            React Frontend<i className="github icon"></i>
          </a>
        </div>

        <div>
          <a
            href="https://github.com/leonwongdev/youtube-notes-api"
            target={"_blank"}
            rel="noreferrer"
          >
            .NET 8 Web API<i className="github icon"></i>
          </a>
        </div>

        <h2>Notes</h2>
        <strong style={{ color: "orangered" }}>
          This is a web app for taking notes while watching youtube tutorials.
          There should be at least one note item for demo purpose and a test
          account is prepared on sign in page. Click the sign in button on the
          top right corner to start note-taking!
        </strong>
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
    notes: Object.values(state.notes),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchNotes })(NoteList);
