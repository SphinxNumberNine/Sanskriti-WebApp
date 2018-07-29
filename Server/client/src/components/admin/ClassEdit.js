import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";

class ClassEdit extends Component {
  render() {
      return JSON.stringify(this.props.class);
  }
}

function mapStateToProps(state) {
  return {
    class: state.requestedFetch
  };
};

export default connect(mapStateToProps)(ClassEdit);
