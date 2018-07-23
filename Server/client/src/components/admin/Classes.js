import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Classes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  renderClasses() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Classes admin page</h1>
      </div>
    );
  }

  renderPermissionsError() {
    return (
      <div style={{ textAlign: "center" }}>
        <h6>Sorry, you do not have the permissions to see this page.</h6>
      </div>
    );
  }

  render() {
    switch (this.props.auth) {
      case null:
        return(<div>YEET</div>)
      case false:
        return(this.renderPermissionsError());
      default:
        return(this.renderClasses());
    }

    console.log(this.props);

    
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Classes);
