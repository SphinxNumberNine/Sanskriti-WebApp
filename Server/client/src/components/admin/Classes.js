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
        return(<div>ERROR</div>)
      case false:
        return(<div>ERROR</div>);
      default:
        console.log(this.props.auth.admin);
        switch(this.props.auth.admin) {
          case true:
            return(this.renderClasses());
          default:
            return(this.renderPermissionsError());
        }
    }   
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Classes);
