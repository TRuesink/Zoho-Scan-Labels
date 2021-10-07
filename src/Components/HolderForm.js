import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class HolderForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderInput({ input, meta, label, disabled }) {
    return (
      <input
        {...input}
        disabled={disabled}
        placeholder="Scan Vial Holder"
        onBlur={(e) => e.target.focus()}
        autoFocus
      />
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
          <div className=" field">
            <label className="fluid">Vial Holder</label>
            <Field
              name="holder"
              component={this.renderInput}
              disabled={this.props.holder.ID ? true : false}
            />
            {/* <button class="ui right floated blue button">Submit</button> */}
          </div>
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

HolderForm = reduxForm({
  form: "holderForm",
})(HolderForm);

export default connect(mapStateToProps)(HolderForm);
