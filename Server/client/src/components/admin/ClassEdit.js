import React, { Component } from "react";
import { connect } from "react-redux";

class ClassEdit extends Component {
  renderForm() {
    if (this.props.danceClass) {
      return (
        <form>
          <h6>Class Name:</h6>
          <input
            type="text"
            name="classname"
            id="classname_id"
            placeholder={this.props.danceClass.name}
          />
        </form>
      );
    }
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    danceClass: state.requestedFetch
  };
}

export default connect(mapStateToProps)(ClassEdit);
