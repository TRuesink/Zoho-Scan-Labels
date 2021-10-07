import React from "react";
import { connect } from "react-redux";
import { updateVial, clearHolder } from "../Actions";

class BatchVialList extends React.Component {
  renderVials() {
    if (this.props.holder.success && this.props.vials.success) {
      const vials = Object.values(this.props.vials.data);
      const filteredVials = vials
        .filter((v) => {
          return v.Vial_Holder.ID;
        })
        .filter((v) => {
          return v.Vial_Holder.ID === this.props.holder.data.ID;
        });

      if (filteredVials.length === 0) {
        return (
          <div>No Vials in Holder. Scan a Vial to add it to this holder</div>
        );
      }
      return filteredVials.map((vial) => {
        return (
          <div class="item">
            <div class="right floated content">
              <button
                onClick={() => this.props.updateVial(vial.ID, "")}
                class="ui tiny button"
              >
                Remove
              </button>
            </div>
            <div class="middle alignedcontent">{vial.Vial_Serial_Number}</div>
          </div>
        );
      });
    } else {
      return null;
    }
  }
  render() {
    return (
      <div
        style={{ height: "35rem", overflow: "scroll" }}
        className={`ui segment ${this.props.vials.pending ? "loading" : ""}`}
      >
        {this.props.holder.success ? (
          <>
            <div>
              <h3 className="ui header dividing">
                {this.props.holder.data.Vial_Holder_Serial_Number}
              </h3>
              <button
                onClick={() => this.props.clearHolder()}
                class="ui red fluid button"
              >
                Change Holder
              </button>
            </div>

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
    vials: state.vials,
    holder: state.holder,
  };
};

export default connect(mapStateToProps, { updateVial, clearHolder })(
  BatchVialList
);
