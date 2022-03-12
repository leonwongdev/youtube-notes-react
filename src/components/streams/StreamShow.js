import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.state = { editMode: false };
    }

    componentDidMount() {
        // console.log("StreamShow componentDidMount called");
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues, () => {
            this.setState({ editMode: false });
        });
    };

    renderEditForm() {
        if (!this.state.editMode) {
            return null;
        }
        return (
            <StreamForm
                initialValues={_.pick(
                    this.props.stream,
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
        if (this.props.stream.userId !== this.props.currentUserId) {
            return null;
        }
        return (
            <button
                className="ui button primary"
                onClick={() => {
                    this.setState({ editMode: !this.state.editMode });
                }}
            >
                {this.state.editMode ? "Cancel" : "Edit"}
            </button>
        );
    }

    renderContent({ title, description, content }) {
        // console.log("StreamShow renderContent");
        if (this.state.editMode) {
            return null;
        }

        if (!content) {
            console.error("StreamShow: Error loading note data.");
            content = "<i>Something wrong in displaying notes</i>";
        }

        return (
            <>
                <h4>{title}</h4>
                <p
                    style={{
                        whiteSpace: "pre-line",
                    }}
                >
                    {description}
                </p>
                <h4>Note:</h4>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </>
        );
    }

    render() {
        if (!this.props.stream) {
            //this will cause trouble for the this.player.attachMediaElement(this.videoRef.current);
            // because when it first render we dun have stream in redux store untill fetchStreams complete
            return <div>Loading...</div>;
        }

        const { title, description, url, note } = this.props.stream;

        const embededUrl = url.replace(
            "https://www.youtube.com/watch?v=",
            "https://www.youtube.com/embed/"
        );
        return (
            <div className="stream-show-container">
                <div className="ui embed video">
                    <iframe title="video player" src={embededUrl} />
                </div>
                <div className="ui segment note">
                    {this.renderEditButton()}
                    {this.renderContent(this.props.stream)}
                    {this.renderEditForm()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId,
    };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamShow
);
