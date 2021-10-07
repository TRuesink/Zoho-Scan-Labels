import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { connect } from "react-redux";

class VialForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.reset();
  };

  renderInput({ input, meta, label, disabled }) {
    return (
      <div className="field">
        <label className="fluid">Vial Serial Number</label>
        <input
          {...input}
          disabled={disabled}
          autoFocus
          placeholder="Vial Serial Number"
          autoFocus
          onBlur={(e) => e.target.focus()}
        />
      </div>
    );
  }
  render() {
    return (
      <div
        style={{ minHeight: "15rem" }}
        className={`ui clearing placeholder blue inverted segment`}
      >
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui huge form"
        >
          <Field
            name="vial"
            component={this.renderInput}
            disabled={this.props.holder.ID ? false : true}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    holder: state.holder.data,
  };
};

VialForm = reduxForm({
  form: "vialForm",
})(VialForm);

export default connect(mapStateToProps, { focus })(VialForm);
