import _ from "lodash";
import React from "react";
import {connect} from "react-redux";
import {fetchNote, editNote} from "../../actions";
import NoteForm from "./NoteForm";

class NoteEdit extends React.Component {
    componentDidMount() {
        this.props.fetchNote(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        console.log("NoteEdit onSubmit:", formValues);
        this.props.editNote(this.props.match.params.id, formValues);
    };

    render() {
        if (!this.props.note) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>Edit a note</h3>
                <NoteForm
                    initialValues={_.pick(
                        this.props.note,
                        "title",
                        "description",
                        "url",
                        "content"
                    )}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {note: state.notes[ownProps.match.params.id]};
};

export default connect(mapStateToProps, {fetchNote, editNote})(
    NoteEdit
);
