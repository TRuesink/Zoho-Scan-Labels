import React from "react";
import { connect } from "react-redux";
import { getVialHolder, getHolderVials, updateVial } from "../Actions";
import HolderForm from "./HolderForm";
import VialForm from "./VialForm";

class Forms extends React.Component {
  onHolderFormSubmit = (formValues) => {
    console.log(formValues);
    this.props.getVialHolder(formValues.holder);
    this.props.getHolderVials(formValues.holder);
  };

  onVialFormSubmit = (formValues) => {
    console.log(formValues);
    this.props.updateVial(formValues.vial, this.props.holder.data.ID);
  };
  render() {
    if (this.props.holder.data.ID) {
      return (
        <div className="ui segment">
          <div
            style={{ minHeight: "15rem" }}
            className="ui placeholder center aligned segment"
          >
            <h3>{this.props.holder.data.Vial_Holder_Serial_Number}</h3>
          </div>
          <VialForm onSubmit={this.onVialFormSubmit} />
        </div>
      );
    } else {
      return (
        <div className="ui segment">
          <HolderForm onSubmit={this.onHolderFormSubmit} />
          <div
            style={{ minHeight: "15rem" }}
            className="ui placeholder center aligned segment"
          >
            <h3>Scan Vial Holder</h3>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    holder: state.holder,
  };
};

export default connect(mapStateToProps, {
  getVialHolder,
  getHolderVials,
  updateVial,
})(Forms);
