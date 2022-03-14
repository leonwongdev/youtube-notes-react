import React from "react";
import {connect} from "react-redux";
import {createStream} from "../../actions";
import StreamForm from "./NoteForm";

class NoteCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <div>
                <h3>Create a note</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null, {createStream})(NoteCreate);