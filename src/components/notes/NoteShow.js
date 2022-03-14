import React from "react";
import {connect} from "react-redux";
import {fetchNote, editNote} from "../../actions";
import NoteForm from "./NoteForm";
import _ from "lodash";

class NoteShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.state = {editMode: false};
    }

    componentDidMount() {
        // console.log("NoteShow componentDidMount called");
        const {id} = this.props.match.params;
        this.props.fetchNote(id);
    }

    onSubmit = (formValues) => {
        this.props.editNote(this.props.match.params.id, formValues, () => {
            this.setState({editMode: false});
        });
    };

    renderEditForm() {
        if (!this.state.editMode) {
            return null;
        }
        return (
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
        );
    }

    renderEditButton() {
        if (this.props.note.userId !== this.props.currentUserId) {
            return null;
        }
        return (
            <button
                className="ui button primary"
                onClick={() => {
                    this.setState({editMode: !this.state.editMode});
                }}
            >
                {this.state.editMode ? "Cancel" : "Edit"}
            </button>
        );
    }

    renderContent({title, description, content}) {
        // console.log("NoteShow renderContent");
        if (this.state.editMode) {
            return null;
        }

        if (!content) {
            console.error("NoteShow: Error loading note data.");
            content = "<i>Something wrong in displaying notes</i>";
        }

        return (
            <>
                <h4>{"Title: " + title}</h4>
                <h5>Description:</h5>
                <p
                    style={{
                        whiteSpace: "pre-line",
                    }}
                >
                    {description}
                </p>
                <h4>Note:</h4>
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            </>
        );
    }

    render() {
        if (!this.props.note) {
            //this will cause trouble for the this.player.attachMediaElement(this.videoRef.current);
            // because when it first render we dun have note in redux store untill fetchNotes complete
            return <div>Loading...</div>;
        }

        const {url} = this.props.note;

        const embededUrl = url.replace(
            "https://www.youtube.com/watch?v=",
            "https://www.youtube.com/embed/"
        );
        return (
            <div className="note-show-container">
                <div className="ui embed video">
                    <iframe title="video player" src={embededUrl}/>
                </div>
                <div className="ui segment note">
                    {this.renderEditButton()}
                    {this.renderContent(this.props.note)}
                    {this.renderEditForm()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        note: state.notes[ownProps.match.params.id],
        currentUserId: state.auth.userId,
    };
};

export default connect(mapStateToProps, {fetchNote, editNote})(
    NoteShow
);
