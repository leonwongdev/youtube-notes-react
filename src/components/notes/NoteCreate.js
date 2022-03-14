import React from "react";
import {connect} from "react-redux";
import {createNote} from "../../actions";
import NoteForm from "./NoteForm";

class NoteCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createNote(formValues);
    };

    render() {
        return (
            <div>
                <h3>Create a note</h3>
                <NoteForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null, {createNote})(NoteCreate);
