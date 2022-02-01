import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import flv from 'flv.js';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.state = { editMode: false };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    // this.buildPlayer(id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  renderEditForm() {
    if (!this.state.editMode) {
      return null;
    }
    return (
      <StreamForm
        initialValues={_.pick(this.props.stream, 'title', 'description', 'url')}
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
        {this.state.editMode ? 'Close' : 'Edit'}
      </button>
    );
  }

  renderContent(title, description) {
    if (this.state.editMode) {
      return null;
    }
    return (
      <>
        <h4>{title}</h4>
        <p
          style={{
            whiteSpace: 'pre-line',
          }}
        >
          {description}
        </p>
      </>
    );
  }

  render() {
    if (!this.props.stream) {
      //this will cause trouble for the this.player.attachMediaElement(this.videoRef.current);
      // because when it first render we dun have stream in redux store untill fetchStreams complete
      return <div>Loading...</div>;
    }

    const { title, description, url } = this.props.stream;
    console.log('console.log: ~ StreamShow ~ render ~ url', url);
    const embededUrl = url.replace(
      'https://www.youtube.com/watch?v=',
      'https://www.youtube.com/embed/'
    );
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          className="ui embed"
          style={{
            flex: '1',
            margin: '5px',
          }}
        >
          <iframe title="video player" src={embededUrl} />
        </div>
        <div
          className="ui segment"
          style={{
            flex: '1',
            margin: '0px',
          }}
        >
          {this.renderEditButton()}
          {this.renderContent(title, description)}
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
