import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";
import {fetchNote, deleteNote} from "../../actions";

class NoteDelete extends React.Component {
    componentDidMount() {
        this.props.fetchNote(this.props.match.params.id);
    }

    renderActions() {
        const {id} = this.props.match.params;

        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deleteNote(id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.note) {
            return "Are you sure you want to delete this note?";
        }

        return `Are you sure you want to delete the note with title: ${this.props.note.title}`;
    }

    render() {
        return (
            <Modal
                title="Delete Note"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push("/")}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {note: state.notes[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchNote, deleteNote})(
    NoteDelete
);
