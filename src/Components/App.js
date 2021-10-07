import React from "react";
import { connect } from "react-redux";
import { getBatch } from "../Actions";
import BatchVialList from "./BatchVialList";
import Forms from "./Forms";
import HolderVialList from "./HolderVialList";

class App extends React.Component {
  componentDidMount() {
    this.props.getBatch();
  }

  renderBatchVialList() {
    const batchData = this.props.batch;
    if (batchData.success && batchData.id !== "no batch") {
      return (
        <div className="five wide column">
          <BatchVialList batchId={batchData.id} />
        </div>
      );
    } else if (!batchData.success) {
      return (
        <div className="five wide column">
          <div class="ui segment">
            <div class="ui active inverted dimmer">
              <div class="ui text loader">Loading</div>
            </div>
            <p></p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderHolderVialList() {
    const batchData = this.props.batch;
    if (batchData.success && batchData.id === "no batch") {
      return (
        <div className="ten wide column">
          <HolderVialList />
        </div>
      );
    } else {
      return (
        <div className="five wide column">
          <HolderVialList />
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ padding: "25px" }}>
        <div className="ui stackable grid">
          <div className="six wide column">
            <Forms />
          </div>
          {this.renderBatchVialList()}
          {this.renderHolderVialList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    batch: state.batch,
  };
};

export default connect(mapStateToProps, { getBatch })(App);
