import React from "react";
import { connect } from "react-redux";
import { getBatchVials } from "../Actions";

class BatchVialList extends React.Component {
  componentDidMount() {
    if (this.props.batch.id !== "no batch") {
      this.props.getBatchVials(this.props.batchId);
    }
  }

  renderVials() {
    const vials = Object.values(this.props.vials.data);
    const filteredVials = vials.filter((v) => {
      return v.Vial_Holder === "" && v.Batch.ID === this.props.batch.id;
    });
    return filteredVials.map((vial) => {
      return (
        <div className="item">
          <div className="middle aligned content">
            {vial.Vial_Serial_Number}
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div
        style={{ height: "35rem", overflow: "scroll" }}
        className={`ui segment ${this.props.vials.pending ? "loading" : ""}`}
      >
        {this.props.batch.id !== "no batch" && this.props.batch.id !== null ? (
          <>
            <h3 className="ui header dividing">Batch Vials To Scan</h3>
            <div className="ui middle aligned divided list">
              {this.renderVials()}
            </div>
          </>
        ) : (
          <div>Scan a Vial Holder Barcode</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    batch: state.batch,
    vials: state.vials,
    holder: state.holder,
  };
};

export default connect(mapStateToProps, { getBatchVials })(BatchVialList);
