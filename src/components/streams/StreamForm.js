import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
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
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
          autoComplete="off"
          placeholder={
            label === 'Enter Youtube Link'
              ? 'https://www.youtube.com/watch?v=chqsS0C9Nng'
              : ''
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
    //         "form": "streamForm",
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
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <textarea
          {...input}
          placeholder="Type your notes here"
          rows="10"
          cols="40"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
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
        <button className="ui button primary">Save & Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  console.log('console.log: ~ validate ~ formValues', formValues);
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  if (
    !formValues.url ||
    !formValues.url.includes('https://www.youtube.com/watch?v=')
  ) {
    errors.url =
      'You must enter a valid youtube link format. E.g. https://www.youtube.com/watch?v=chqsS0C9Nng';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
