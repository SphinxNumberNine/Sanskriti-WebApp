import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class StudentRegistration extends Component {

  componentDidMount() {
    this.setState({ auth: this.props.auth });
  }

  submit(e) 
  { 
      console.log("Submitted");
  }

  getClasses() {
    // TODO: Get classes from database, and return an array of checkbox inputs for renderForm() to display
  }

  renderForm() {
    this.submit = this.submit.bind(this);  
    return (
      <form>
        <h6>Name: </h6>
        <input type="text" name="name" id="name_id"/>
        <br />
        <h6>Email: </h6>
        <input type="text" name="email" id="email_id"/>
        <br />
        <h6>Phone: </h6>
        <input type="text" name="phone" id="phone_id"/>
        <br />
        <h6>Classes: </h6>
        <ul>
          {/* TODO: display the list of checkbox inputs from getClasses() */}
        </ul>
        <div style={{ textAlign: "right" }}>
          <input
            type="button"
            name="submit"
            onClick={this.submit}
            value="Submit"
          />
          <br />
        </div>
      </form>
    );
  }

  render() {
    console.log(this.state);
    return <div style={{ textAlign: "left", anchor: "bottom" }}>{this.renderForm()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(StudentRegistration);
