import React from "react";
import { Field, reduxForm } from "redux-form";
import EditorConvertToHTML from "../EditorConvertToHTML";

class NoteForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          placeholder={
            label === "Enter Youtube Link"
              ? "https://www.youtube.com/watch?v=chqsS0C9Nng"
              : ""
          }
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderDescription = (theObjectFromField) => {
    // Sample object we get from the <Field> as props
    //   {
    //     "input": {
    //         "name": "description",
    //         "value": ""
    //     },
    //     "meta": {
    //         "active": false,
    //         "asyncValidating": false,
    //         "autofilled": false,
    //         "dirty": false,
    //         "error": "You must enter a description",
    //         "form": "noteForm",
    //         "invalid": true,
    //         "pristine": true,
    //         "submitting": false,
    //         "submitFailed": false,
    //         "touched": false,
    //         "valid": false,
    //         "visited": false
    //     },
    //     "label": "Enter Description"
    // }

    const { input, label, meta } = theObjectFromField;
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    // console.log("renderDescription: ", input.value); // ReduxForm has props: initialValues -> input.value
    return (
      <div className={className}>
        <label>{label}</label>
        <textarea
          {...input}
          placeholder="Type your notes here"
          rows="2"
          cols="40"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderNotes = (theObjectFromFieldComponent) => {
    const { input, label, meta } = theObjectFromFieldComponent;
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    // console.log("renderNotes: ", input.value);
    return (
      <div className={className}>
        <label>{label}</label>
        <EditorConvertToHTML
          initialNote={input.value}
          inputOnChange={input.onChange}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    // this.props.handleSubmit(callback): provided by redux form. callback will receive formValues.
    // it will do e.preventDefault
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="url"
          component={this.renderInput}
          label="Enter Youtube Link"
        />
        <Field
          name="description"
          component={this.renderDescription}
          label="Enter Description"
        />
        <Field
          name="content"
          component={this.renderNotes}
          label="Type your notes"
        />
        <button className="ui button primary">Save & Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  // console.log("console.log: ~ validate ~ formValues", formValues);
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  if (
    !formValues.url ||
    !validateVideoId(extractVideoId(formValues.url))
  ) {
    errors.url =
      "You must enter a valid youtube link format. E.g. https://www.youtube.com/watch?v={videoId} or https://youtu.be/{videoId}";
  }

  return errors;
};

export function extractVideoId(url) {
  // Regular expressions to extract the video ID from YouTube URL
  var regexStandard = /[?&]v=([^?&]+)/;
  var regexShortened = /youtu\.be\/([^?&]+)/;
  var matchStandard = url.match(regexStandard);
  var matchShortened = url.match(regexShortened);

  if (matchStandard && matchStandard[1]) {
      return matchStandard[1];
  } else if (matchShortened && matchShortened[1]) {
      return matchShortened[1];
  } else {
    return false;
  }
}

function validateVideoId(videoId) {
  // Check if the video ID is a valid string (non-empty)
  return typeof videoId === 'string' && videoId.trim() !== '';
}

export default reduxForm({
  form: "noteForm",
  validate,
})(NoteForm);
